const GoogleBooksAPI = {
  BASE_URL: 'https://www.googleapis.com/books/v1/volumes',
  API_KEY: 'AIzaSyADIVd7hzguwTfrt-T02ueD2vCH1IiRrlg',

  async searchBooks(query, maxResults = 20) {
    try {
      const url = `${this.BASE_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}&printType=books&key=${this.API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (!data.items) return [];
      
      return data.items.map(item => this.formatBook(item));
    } catch (error) {
      console.error('Google Books API error:', error);
      return [];
    }
  },

  async searchByTitle(title, maxResults = 20) {
    try {
      const url = `${this.BASE_URL}?q=intitle:${encodeURIComponent(title)}&maxResults=${maxResults}&printType=books&key=${this.API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (!data.items) return [];
      return data.items.map(item => this.formatBook(item));
    } catch (error) {
      console.error('Search by title error:', error);
      return [];
    }
  },

  async searchByAuthor(author, maxResults = 20) {
    try {
      const url = `${this.BASE_URL}?q=inauthor:${encodeURIComponent(author)}&maxResults=${maxResults}&printType=books&key=${this.API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (!data.items) return [];
      return data.items.map(item => this.formatBook(item));
    } catch (error) {
      console.error('Search by author error:', error);
      return [];
    }
  },

  async searchByGenre(genre, maxResults = 20) {
    try {
      const url = `${this.BASE_URL}?q=subject:${encodeURIComponent(genre)}&maxResults=${maxResults}&printType=books&key=${this.API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (!data.items) return [];
      return data.items.map(item => this.formatBook(item));
    } catch (error) {
      console.error('Search by genre error:', error);
      return [];
    }
  },

  formatBook(item) {
    const volumeInfo = item.volumeInfo || {};
    const imageLinks = volumeInfo.imageLinks || {};
    
    return {
      id: item.id,
      title: volumeInfo.title || 'Unknown Title',
      author: (volumeInfo.authors || ['Unknown Author']).join(', '),
      isbn: this.getISBN(volumeInfo.industryIdentifiers),
      year: this.getYear(volumeInfo.publishedDate),
      rating: volumeInfo.averageRating || 0,
      cover: imageLinks.thumbnail || imageLinks.smallThumbnail || 'https://via.placeholder.com/128x192?text=No+Cover',
      summary: volumeInfo.description || 'No description available.',
      genres: volumeInfo.categories || ['General']
    };
  },

  getISBN(identifiers) {
    if (!identifiers || identifiers.length === 0) return 'N/A';
    const isbn13 = identifiers.find(id => id.type === 'ISBN_13');
    const isbn10 = identifiers.find(id => id.type === 'ISBN_10');
    return (isbn13 || isbn10 || identifiers[0]).identifier;
  },

  getYear(dateString) {
    if (!dateString) return 'N/A';
    return dateString.split('-')[0];
  }
};