function SignUpApp() {
  try {
    const [step, setStep] = React.useState(1);
    const [formData, setFormData] = React.useState({
      email: '',
      password: '',
      favoriteBook: '',
      favoriteAuthor: '',
      lastBookRead: '',
      favoriteGenre: ''
    });

    const handleNextStep = async (e) => {
      e.preventDefault();
      if (step === 1) {
        setStep(2);
      } else {
        try {
          await AuthService.signUp(formData);
          alert('Account created successfully!');
          window.location.href = 'index.html';
        } catch (error) {
          alert('Failed to create account. Please try again.');
        }
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4" data-name="signup-app" data-file="signup-app.js">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <img 
              src="https://app.trickle.so/storage/public/images/usr_17a06c0760000001/cbf11076-a7bf-46d1-81b6-3c49f4088ee8.jpeg" 
              alt="BookNest Logo" 
              className="h-16 w-16 rounded-lg object-cover mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-2">Join BookNest</h1>
            <p className="text-[var(--text-light)]">Step {step} of 2</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <form onSubmit={handleNextStep} className="space-y-6">
              {step === 1 ? (
                <>
                  <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">Create Account</h2>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">Password</label>
                    <input 
                      type="password" 
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">Tell Us About You</h2>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">Favorite Book</label>
                    <input 
                      type="text" 
                      required
                      value={formData.favoriteBook}
                      onChange={(e) => setFormData({...formData, favoriteBook: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">Favorite Author</label>
                    <input 
                      type="text" 
                      required
                      value={formData.favoriteAuthor}
                      onChange={(e) => setFormData({...formData, favoriteAuthor: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">Last Book Read</label>
                    <input 
                      type="text" 
                      required
                      value={formData.lastBookRead}
                      onChange={(e) => setFormData({...formData, lastBookRead: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">Favorite Genre</label>
                    <select 
                      required
                      value={formData.favoriteGenre}
                      onChange={(e) => setFormData({...formData, favoriteGenre: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                    >
                      <option value="">Select a genre</option>
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
                </>
              )}

              <button type="submit" className="w-full bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--accent-color)] transition-colors">
                {step === 1 ? 'Next' : 'Complete Sign Up'}
              </button>
            </form>

            {step === 2 && (
              <button 
                onClick={() => setStep(1)}
                className="w-full mt-4 text-[var(--primary-color)] hover:underline"
              >
                Back
              </button>
            )}
          </div>

          <p className="text-center mt-6 text-[var(--text-light)]">
            Already have an account? <a href="index.html" className="text-[var(--primary-color)] font-medium hover:underline">Sign In</a>
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('SignUpApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SignUpApp />);