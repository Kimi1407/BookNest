function Hero({ onBookClick, isLoggedIn, currentUser }) {
  try {
    const [recommendations, setRecommendations] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchType, setSearchType] = React.useState('all');
    const [searchResults, setSearchResults] = React.useState([]);
    const [isSearching, setIsSearching] = React.useState(false);

    React.useEffect(() => {
      loadRecommendations();
    }, []);

    const loadRecommendations = async () => {
      setLoading(true);
      try {
        const books = await GoogleBooksAPI.searchBooks('bestseller fiction', 12);
        setRecommendations(books);
      } catch (error) {
        console.error('Load recommendations error:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleSearch = async (e) => {
      e.preventDefault();
      if (!searchQuery.trim()) return;
      
      setIsSearching(true);
      setLoading(true);
      
      try {
        let results = [];
        if (searchType === 'title') {
          results = await GoogleBooksAPI.searchByTitle(searchQuery);
        } else if (searchType === 'author') {
          results = await GoogleBooksAPI.searchByAuthor(searchQuery);
        } else if (searchType === 'genre') {
          results = await GoogleBooksAPI.searchByGenre(searchQuery);
        } else {
          results = await GoogleBooksAPI.searchBooks(searchQuery);
        }
        setSearchResults(results);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    const handleClearSearch = () => {
      setSearchQuery('');
      setIsSearching(false);
      setSearchResults([]);
    };

    const displayBooks = isSearching ? searchResults : recommendations;

    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-name="hero" data-file="components/Hero.js">
        <div className="text-center mb-12">
          <h1 className="mb-4">Discover Your Next Favorite Book</h1>
          <p className="text-xl text-[var(--text-light)] mb-8">
            Search millions of books powered by Google Books API
          </p>
          
          <div className="max-w-3xl mx-auto mb-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-2">
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[var(--primary-color)] focus:outline-none"
                >
                  <option value="all">All</option>
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                  <option value="genre">Genre</option>
                </select>
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search by ${searchType}...`}
                    className="w-full px-6 py-3 pr-24 rounded-lg border-2 border-gray-300 focus:border-[var(--primary-color)] focus:outline-none text-lg"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:bg-[var(--accent-color)] transition-colors"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
            {isSearching && (
              <button
                onClick={handleClearSearch}
                className="mt-2 text-[var(--primary-color)] hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        <section className="mb-12">
          <h2 className="mb-6">
            {isSearching ? `Search Results (${displayBooks.length})` : 'Recommended For You'}
          </h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
            </div>
          ) : displayBooks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-[var(--text-light)]">No books found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayBooks.map(book => (
                <BookCard key={book.id} book={book} onClick={() => onBookClick(book)} />
              ))}
            </div>
          )}
        </section>
      </main>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}
