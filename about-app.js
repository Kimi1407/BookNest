function AboutApp() {
  try {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const handleSignIn = () => {
      window.location.href = 'signup.html';
    };

    return (
      <div className="min-h-screen" data-name="about-app" data-file="about-app.js">
        <Header 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isLoggedIn={isLoggedIn}
          onSignIn={handleSignIn}
        />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="mb-8">About BookNest</h1>
          <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
            <p className="text-lg text-[var(--text-light)]">
              BookNest is your personal book recommendation platform powered by advanced collaborative filtering technology.
            </p>
            <p className="text-lg text-[var(--text-light)]">
              Our mission is to help readers discover their next favorite book by analyzing reading patterns and preferences from our community of book lovers.
            </p>
            <p className="text-lg text-[var(--text-light)]">
              Whether you're looking for fiction, non-fiction, classics, or contemporary works, BookNest uses intelligent algorithms to match you with books you'll love.
            </p>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('AboutApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AboutApp />);