function HistoryApp() {
  try {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [history, setHistory] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
        loadHistory(user.id);
      } else {
        window.location.href = 'signup.html';
      }
    }, []);

    const loadHistory = async (userId) => {
      try {
        const data = await BookService.getHistory(userId);
        setHistory(data);
      } catch (error) {
        console.error('Load history error:', error);
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
          <h1 className="mb-8">Reading History</h1>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-[var(--text-light)]">No reading history yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map(item => (
                <div key={item.objectId} className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-6">
                  <img 
                    src={item.objectData.BookCover} 
                    alt={item.objectData.BookTitle}
                    className="w-24 h-32 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.objectData.BookTitle}</h3>
                    <p className="text-[var(--text-light)] mb-2">{item.objectData.BookAuthor}</p>
                    <p className="text-sm text-gray-500">Viewed on {new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('HistoryApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HistoryApp />);