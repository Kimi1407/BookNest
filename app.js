class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [selectedBook, setSelectedBook] = React.useState(null);

    React.useEffect(() => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
      }
    }, []);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSignIn = () => {
      window.location.href = 'signup.html';
    };

    const handleBookClick = async (book) => {
      setSelectedBook(book);
      if (isLoggedIn && currentUser) {
        await BookService.addHistory(currentUser.id, book);
      }
    };

    const handleLogout = () => {
      AuthService.logout();
      setIsLoggedIn(false);
      setCurrentUser(null);
      window.location.reload();
    };

    return (
      <div className="min-h-screen" data-name="app" data-file="app.js">
        <Header 
          onMenuClick={toggleSidebar} 
          isLoggedIn={isLoggedIn}
          onSignIn={handleSignIn}
        />
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
        />
        <Hero onBookClick={handleBookClick} isLoggedIn={isLoggedIn} currentUser={currentUser} />
        {selectedBook && (
          <BookDetail 
            book={selectedBook} 
            onClose={() => setSelectedBook(null)} 
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
          />
        )}
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);