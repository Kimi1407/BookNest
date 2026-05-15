function Footer() {
  try {
    return (
      <footer className="bg-white border-t border-gray-200 mt-16" data-name="footer" data-file="components/Footer.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-[var(--text-light)]">
              © 2025 BookNest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}