function ProfileApp() {
  try {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [userProfile, setUserProfile] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [profilePhoto, setProfilePhoto] = React.useState('');
    const [formData, setFormData] = React.useState({
      email: '',
      favoriteBook: '',
      favoriteAuthor: '',
      lastBookRead: '',
      favoriteGenre: ''
    });

    React.useEffect(() => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
        loadProfile(user.id);
      } else {
        window.location.href = 'signup.html';
      }
    }, []);

    const loadProfile = async (userId) => {
      try {
        const profile = await trickleGetObject('user', userId);
        setUserProfile(profile);
        const data = profile.objectData || {};
        setFormData({
          email: data.Email || '',
          favoriteBook: data.FavoriteBook || '',
          favoriteAuthor: data.FavoriteAuthor || '',
          lastBookRead: data.LastBookRead || '',
          favoriteGenre: data.FavoriteGenre || 'fiction'
        });
        setProfilePhoto(data.ProfilePhoto || '');
      } catch (error) {
        console.error('Load profile error:', error);
        setFormData({
          email: currentUser?.email || '',
          favoriteBook: '',
          favoriteAuthor: '',
          lastBookRead: '',
          favoriteGenre: 'fiction'
        });
      } finally {
        setLoading(false);
      }
    };

    const handleSave = async (e) => {
      e.preventDefault();
      try {
        await trickleUpdateObject('user', currentUser.id, {
          Email: formData.email,
          FavoriteBook: formData.favoriteBook,
          FavoriteAuthor: formData.favoriteAuthor,
          LastBookRead: formData.lastBookRead,
          FavoriteGenre: formData.favoriteGenre,
          ProfilePhoto: profilePhoto
        });
        alert('Profile updated successfully!');
        await loadProfile(currentUser.id);
      } catch (error) {
        console.error('Save profile error:', error);
        alert('Failed to update profile. Please try again.');
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
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="mb-8">Profile Settings</h1>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8">
              <form onSubmit={handleSave} className="space-y-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-32 h-32 rounded-full bg-[var(--secondary-color)] flex items-center justify-center mb-4 overflow-hidden">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="icon-user text-5xl text-[var(--primary-color)]"></div>
                    )}
                  </div>
                  <input
                    type="url"
                    value={profilePhoto}
                    onChange={(e) => setProfilePhoto(e.target.value)}
                    placeholder="Profile photo URL"
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">Email</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">Favorite Book</label>
                  <input 
                    type="text" 
                    value={formData.favoriteBook}
                    onChange={(e) => setFormData({...formData, favoriteBook: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">Favorite Author</label>
                  <input 
                    type="text" 
                    value={formData.favoriteAuthor}
                    onChange={(e) => setFormData({...formData, favoriteAuthor: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">Last Book Read</label>
                  <input 
                    type="text" 
                    value={formData.lastBookRead}
                    onChange={(e) => setFormData({...formData, lastBookRead: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">Favorite Genre</label>
                  <select 
                    value={formData.favoriteGenre}
                    onChange={(e) => setFormData({...formData, favoriteGenre: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                  >
                    <option value="fiction">Fiction</option>
                    <option value="non-fiction">Non-Fiction</option>
                    <option value="mystery">Mystery</option>
                    <option value="romance">Romance</option>
                    <option value="sci-fi">Science Fiction</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="biography">Biography</option>
                    <option value="history">History</option>
                  </select>
                </div>

                <button type="submit" className="w-full bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--accent-color)] transition-colors">
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('ProfileApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProfileApp />);