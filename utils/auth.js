const AUTH_KEY = 'booknest_user';

const AuthService = {
  async signUp(formData) {
    try {
      const user = await trickleCreateObject('user', {
        Email: formData.email,
        Password: formData.password,
        FavoriteBook: formData.favoriteBook,
        FavoriteAuthor: formData.favoriteAuthor,
        LastBookRead: formData.lastBookRead,
        FavoriteGenre: formData.favoriteGenre
      });
      
      const userData = {
        id: user.objectId,
        email: formData.email
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  },

  getCurrentUser() {
    const userData = localStorage.getItem(AUTH_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
  }
};