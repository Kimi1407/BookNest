function ContactApp() {
  try {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    };

    const handleSignIn = () => {
      window.location.href = 'signup.html';
    };

    return (
      <div className="min-h-screen" data-name="contact-app" data-file="contact-app.js">
        <Header 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isLoggedIn={isLoggedIn}
          onSignIn={handleSignIn}
        />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="mb-8">Contact Us</h1>
          <div className="bg-white rounded-xl shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">Message</label>
                <textarea 
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--accent-color)] transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('ContactApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ContactApp />);