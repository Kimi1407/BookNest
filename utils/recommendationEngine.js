const RecommendationEngine = {
  booksCache: null,
  cacheTimestamp: null,
  CACHE_DURATION: 5 * 60 * 1000,

  async fetchAllBooks() {
    const now = Date.now();
    if (this.booksCache && this.cacheTimestamp && (now - this.cacheTimestamp < this.CACHE_DURATION)) {
      return this.booksCache;
    }

    try {
      const result = await trickleListObjects('book', 100, true);
      const books = result.items.map(item => ({
        id: item.objectId,
        title: item.objectData.Title,
        author: item.objectData.Author,
        isbn: item.objectData.ISBN,
        year: item.objectData.Year,
        rating: item.objectData.Rating,
        cover: item.objectData.Cover,
        summary: item.objectData.Summary,
        genres: Array.isArray(item.objectData.Genres) ? item.objectData.Genres : []
      }));
      
      this.booksCache = books;
      this.cacheTimestamp = now;
      return books;
    } catch (error) {
      console.error('Fetch books error:', error);
      return [];
    }
  },

  async getUserRatings(userId) {
    if (!userId) return [];
    
    try {
      const result = await trickleListObjects('rating', 100, true);
      return result.items.filter(item => item.objectData.UserId === userId);
    } catch (error) {
      console.error('Get user ratings error:', error);
      return [];
    }
  },

  async getAllUserRatings() {
    try {
      const result = await trickleListObjects('rating', 500, true);
      return result.items;
    } catch (error) {
      console.error('Get all ratings error:', error);
      return [];
    }
  },

  calculateCosineSimilarity(userRatings, otherUserRatings) {
    const commonBooks = new Set();
    const userRatingsMap = {};
    const otherRatingsMap = {};
    
    userRatings.forEach(r => {
      userRatingsMap[r.objectData.BookId] = r.objectData.Rating;
    });
    
    otherUserRatings.forEach(r => {
      otherRatingsMap[r.objectData.BookId] = r.objectData.Rating;
      if (userRatingsMap[r.objectData.BookId]) {
        commonBooks.add(r.objectData.BookId);
      }
    });
    
    if (commonBooks.size === 0) return 0;
    
    let dotProduct = 0;
    let userMagnitude = 0;
    let otherMagnitude = 0;
    
    commonBooks.forEach(bookId => {
      const userRating = userRatingsMap[bookId];
      const otherRating = otherRatingsMap[bookId];
      dotProduct += userRating * otherRating;
      userMagnitude += userRating * userRating;
      otherMagnitude += otherRating * otherRating;
    });
    
    userMagnitude = Math.sqrt(userMagnitude);
    otherMagnitude = Math.sqrt(otherMagnitude);
    
    if (userMagnitude === 0 || otherMagnitude === 0) return 0;
    
    return dotProduct / (userMagnitude * otherMagnitude);
  },

  async getRecommendations(userId, userProfile) {
    try {
      const allBooks = await this.fetchAllBooks();
      if (allBooks.length === 0) return [];
      
      const userRatings = userId ? await this.getUserRatings(userId) : [];
      const allRatings = await this.getAllUserRatings();
      
      const userRatingsMap = {};
      userRatings.forEach(r => {
        userRatingsMap[r.objectData.BookId] = r.objectData.Rating;
      });
      
      const usersByRating = {};
      allRatings.forEach(rating => {
        const uid = rating.objectData.UserId;
        if (!usersByRating[uid]) usersByRating[uid] = [];
        usersByRating[uid].push(rating);
      });
      
      const similarities = {};
      if (userId && userRatings.length > 0) {
        Object.keys(usersByRating).forEach(otherUserId => {
          if (otherUserId !== userId) {
            const similarity = this.calculateCosineSimilarity(userRatings, usersByRating[otherUserId]);
            if (similarity > 0) {
              similarities[otherUserId] = similarity;
            }
          }
        });
      }
      
      const recommendations = allBooks.map(book => {
        let score = book.rating;
        
        if (userProfile?.FavoriteGenre) {
          const favoriteGenre = userProfile.FavoriteGenre.toLowerCase();
          if (book.genres.some(g => g.toLowerCase() === favoriteGenre)) {
            score += 1.5;
          }
        }
        
        if (userProfile?.FavoriteAuthor) {
          if (book.author.toLowerCase().includes(userProfile.FavoriteAuthor.toLowerCase())) {
            score += 2.0;
          }
        }
        
        if (userId && Object.keys(similarities).length > 0 && !userRatingsMap[book.id]) {
          let weightedSum = 0;
          let similaritySum = 0;
          
          Object.keys(similarities).forEach(otherUserId => {
            const otherRatings = usersByRating[otherUserId];
            const bookRating = otherRatings.find(r => r.objectData.BookId === book.id);
            if (bookRating) {
              weightedSum += similarities[otherUserId] * bookRating.objectData.Rating;
              similaritySum += similarities[otherUserId];
            }
          });
          
          if (similaritySum > 0) {
            const collaborativeScore = weightedSum / similaritySum;
            score += (collaborativeScore - 3) * 0.3;
          }
        }
        
        if (userRatingsMap[book.id]) {
          score += (userRatingsMap[book.id] - 3) * 0.5;
        }
        
        return { ...book, recommendationScore: score };
      });
      
      return recommendations
        .sort((a, b) => b.recommendationScore - a.recommendationScore)
        .slice(0, 20);
    } catch (error) {
      console.error('Get recommendations error:', error);
      return [];
    }
  },

  async searchBooks(query) {
    const books = await this.fetchAllBooks();
    const lowerQuery = query.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery) ||
      book.genres.some(genre => genre.toLowerCase().includes(lowerQuery))
    );
  }
};
