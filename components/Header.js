function Header({ onMenuClick, isLoggedIn, onSignIn }) {
  try {
    return (
      <header className="bg-white shadow-sm sticky top-0 z-40" data-name="header" data-file="components/Header.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="https://app.trickle.so/storage/public/images/usr_17a06c0760000001/cbf11076-a7bf-46d1-81b6-3c49f4088ee8.jpeg" 
                alt="BookNest Logo" 
                className="h-10 w-10 rounded-lg object-cover"
              />
              <span className="text-2xl font-bold text-[var(--primary-color)]">BookNest</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="index.html" className="text-[var(--text-dark)] hover:text-[var(--primary-color)] font-medium transition-colors">
                Home
              </a>
              <a href="about.html" className="text-[var(--text-dark)] hover:text-[var(--primary-color)] font-medium transition-colors">
                About
              </a>
              <a href="contact.html" className="text-[var(--text-dark)] hover:text-[var(--primary-color)] font-medium transition-colors">
                Contact
              </a>
            </nav>
            
            <div className="flex items-center space-x-4">
              {!isLoggedIn ? (
                <button 
                  onClick={onSignIn}
                  className="hidden md:block bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg font-medium hover:bg-[var(--accent-color)] transition-colors"
                >
                  Sign In
                </button>
              ) : (
                <a 
                  href="profile.html"
                  className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[var(--secondary-color)] hover:bg-[var(--accent-color)] hover:text-white transition-colors"
                  aria-label="Profile"
                >
                  <div className="icon-user text-xl text-[var(--primary-color)]"></div>
                </a>
              )}
              
              <button 
                onClick={onMenuClick}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
              >
                <div className="icon-menu text-2xl text-[var(--primary-color)]"></div>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}
