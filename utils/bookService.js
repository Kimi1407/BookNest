const BookService = {
  async addBookmark(userId, book) {
    try {
      await trickleCreateObject('bookmark', {
        UserId: userId,
        BookId: book.id,
        BookTitle: book.title,
        BookAuthor: book.author,
        BookCover: book.cover,
        BookRating: book.rating
      });
    } catch (error) {
      console.error('Add bookmark error:', error);
      throw error;
    }
  },

  async getBookmarks(userId) {
    try {
      const result = await trickleListObjects('bookmark', 100, true);
      return result.items.filter(item => item.objectData.UserId === userId);
    } catch (error) {
      console.error('Get bookmarks error:', error);
      return [];
    }
  },

  async addHistory(userId, book) {
    try {
      await trickleCreateObject('history', {
        UserId: userId,
        BookId: book.id,
        BookTitle: book.title,
        BookAuthor: book.author,
        BookCover: book.cover
      });
    } catch (error) {
      console.error('Add history error:', error);
    }
  },

  async getHistory(userId) {
    try {
      const result = await trickleListObjects('history', 100, true);
      return result.items.filter(item => item.objectData.UserId === userId);
    } catch (error) {
      console.error('Get history error:', error);
      return [];
    }
  },

  async rateBook(userId, bookId, rating) {
    try {
      await trickleCreateObject('rating', {
        UserId: userId,
        BookId: bookId,
        Rating: rating
      });
    } catch (error) {
      console.error('Rate book error:', error);
      throw error;
    }
  }
};