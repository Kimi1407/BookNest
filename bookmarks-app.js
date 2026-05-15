function BookmarksApp() {
  try {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [bookmarks, setBookmarks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
        loadBookmarks(user.id);
      } else {
        window.location.href = 'signup.html';
      }
    }, []);

    const loadBookmarks = async (userId) => {
      try {
        const data = await BookService.getBookmarks(userId);
        setBookmarks(data);
      } catch (error) {
        console.error('Load bookmarks error:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleLogout = () => {
      AuthService.logout();
      window.location.href = 'index.html';
    };

    return (
      <div className="min-h-screen">
        <Header 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isLoggedIn={isLoggedIn}
        />
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="mb-8">My Bookmarks</h1>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-[var(--text-light)]">No bookmarks yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bookmarks.map(bookmark => (
                <div key={bookmark.objectId} className="bg-white rounded-xl shadow-md p-6">
                  <img 
                    src={bookmark.objectData.BookCover} 
                    alt={bookmark.objectData.BookTitle}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{bookmark.objectData.BookTitle}</h3>
                  <p className="text-[var(--text-light)]">{bookmark.objectData.BookAuthor}</p>
                </div>
              ))}
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('BookmarksApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BookmarksApp />);