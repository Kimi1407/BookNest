function BookCard({ book, onClick }) {
  try {
    return (
      <div className="card cursor-pointer" onClick={onClick} data-name="book-card" data-file="components/BookCard.js">
        <img 
          src={book.cover} 
          alt={book.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/128x192?text=No+Cover';
          }}
        />
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{book.title}</h3>
        <p className="text-[var(--text-light)] mb-3 line-clamp-1">{book.author}</p>
        {book.rating > 0 && (
          <div className="flex items-center space-x-1">
            <div className="icon-star text-lg text-yellow-500"></div>
            <span className="font-medium">{book.rating.toFixed(1)}</span>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('BookCard component error:', error);
    return null;
  }
}
