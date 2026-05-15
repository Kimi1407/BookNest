function BookDetail({ book, onClose, isLoggedIn, currentUser }) {
  try {
    const [userRating, setUserRating] = React.useState(0);
    const [isBookmarked, setIsBookmarked] = React.useState(false);

    const handleAddBookmark = async () => {
      if (!isLoggedIn) {
        window.location.href = 'signup.html';
      } else {
        try {
          await BookService.addBookmark(currentUser.id, book);
          setIsBookmarked(true);
          alert('Book added to bookmarks!');
        } catch (error) {
          alert('Failed to add bookmark. Please try again.');
        }
      }
    };

    const handleRating = async (rating) => {
      if (!isLoggedIn) {
        window.location.href = 'signup.html';
        return;
      }
      
      try {
        await BookService.rateBook(currentUser.id, book.id, rating);
        setUserRating(rating);
        alert('Rating submitted successfully!');
      } catch (error) {
        alert('Failed to submit rating. Please try again.');
      }
    };

    return (
      <>
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
          data-name="book-detail-overlay"
          data-file="components/BookDetail.js"
        ></div>
        
        <div 
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl z-50 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          data-name="book-detail"
          data-file="components/BookDetail.js"
        >
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-[var(--text-dark)]">{book.title}</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <div className="icon-x text-xl text-[var(--text-dark)]"></div>
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <img 
                src={book.cover} 
                alt={book.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-light)] mb-1">Author</h3>
                  <p className="text-lg text-[var(--text-dark)]">{book.author}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-light)] mb-1">ISBN</h3>
                  <p className="text-lg text-[var(--text-dark)]">{book.isbn}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-light)] mb-1">Year Published</h3>
                  <p className="text-lg text-[var(--text-dark)]">{book.year}</p>
                </div>
                
                {book.rating > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-light)] mb-1">Rating</h3>
                    <div className="flex items-center space-x-1">
                      <div className="icon-star text-lg text-yellow-500"></div>
                      <span className="text-lg font-medium">{book.rating.toFixed(1)}</span>
                    </div>
                  </div>
                )}
                
                {book.genres && book.genres.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-light)] mb-1">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {book.genres.map((genre, index) => (
                        <span key={index} className="px-3 py-1 bg-[var(--secondary-color)] text-[var(--text-dark)] rounded-full text-sm">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-3">Summary</h3>
              <div 
                className="text-[var(--text-light)] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: book.summary }}
              />
            </div>
            
            {isLoggedIn && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-3">Rate this book</h3>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => handleRating(star)}
                      className="p-2 hover:scale-110 transition-transform"
                    >
                      <div className={`icon-star text-2xl ${star <= userRating ? 'text-yellow-500' : 'text-gray-300'}`}></div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <button 
              onClick={handleAddBookmark} 
              className="btn-primary w-full"
              disabled={isBookmarked}
            >
              {isBookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
            </button>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('BookDetail component error:', error);
    return null;
  }
}
