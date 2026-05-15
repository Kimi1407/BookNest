function Sidebar({ isOpen, onClose, onLogout, isLoggedIn }) {
  try {
    return (
      <>
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
            data-name="sidebar-overlay"
            data-file="components/Sidebar.js"
          ></div>
        )}
        
        <div 
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 sidebar-transition ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          data-name="sidebar"
          data-file="components/Sidebar.js"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-[var(--primary-color)]">Menu</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <div className="icon-x text-xl text-[var(--text-dark)]"></div>
              </button>
            </div>
            
            <nav className="space-y-4">
              <a 
                href="profile.html" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[var(--secondary-color)] transition-colors"
              >
                <div className="icon-user text-xl text-[var(--primary-color)]"></div>
                <span className="text-[var(--text-dark)] font-medium">Profile</span>
              </a>
              
              <a 
                href="bookmarks.html" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[var(--secondary-color)] transition-colors"
              >
                <div className="icon-bookmark text-xl text-[var(--primary-color)]"></div>
                <span className="text-[var(--text-dark)] font-medium">Bookmarks</span>
              </a>
              
              <a 
                href="history.html" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[var(--secondary-color)] transition-colors"
              >
                <div className="icon-clock text-xl text-[var(--primary-color)]"></div>
                <span className="text-[var(--text-dark)] font-medium">History</span>
              </a>
              
              {isLoggedIn && (
                <button 
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors w-full text-left"
                  onClick={onLogout}
                >
                  <div className="icon-log-out text-xl text-red-600"></div>
                  <span className="text-red-600 font-medium">Logout</span>
                </button>
              )}
            </nav>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Sidebar component error:', error);
    return null;
  }
}