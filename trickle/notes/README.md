# BookNest - Book Recommendation Website

## Overview
BookNest is a book recommendation platform that uses collaborative filtering to suggest books based on user preferences and reading patterns.

## Features
- Responsive navigation bar with Home, About, and Contact links
- Authentication system with sign-up and sign-in functionality
- Sign In button transforms into profile icon after user authentication
- Hamburger menu with slide-in sidebar from right to left
- Sidebar menu includes: History, Bookmarks, Profile, and Logout
- **Google Books API Integration**: Search millions of real books
- **Advanced Search**: Filter by title, author, genre, or search all
- Real-time book recommendations from Google Books
- Book detail modal showing ISBN, publication year, author, genres, and summary
- Multi-step sign-up process with email/password and reading preferences
- User can bookmark books (stored in Trickle database)
- Reading history tracking for logged-in users
- Book rating system (1-5 stars) for authenticated users
- Beautiful UI with brown/tan color scheme matching the logo

## Pages
- **Home (index.html)**: Main page with book recommendations and detail modal
- **Sign Up (signup.html)**: Two-step registration with preferences
- **About (about.html)**: Information about BookNest
- **Contact (contact.html)**: Contact form for user inquiries
- **Profile (profile.html)**: User settings page to change email, preferences, and upload profile photo
- **Bookmarks (bookmarks.html)**: User's saved/bookmarked books
- **History (history.html)**: User's reading history with timestamps

## Technology Stack
- React 18
- TailwindCSS
- Lucide Icons
- **Google Books API** (for book data and search)
- Trickle Database (for user data, bookmarks, history, and ratings)
- Trickle Proxy API (for CORS-free API requests)

## Color Scheme
Primary colors derived from the BookNest logo:
- Primary: Brown (#8B4513)
- Secondary: Wheat (#F5DEB3)
- Accent: Chocolate (#D2691E)

## Database Schema
- **user**: Email, Password, FavoriteBook, FavoriteAuthor, LastBookRead, FavoriteGenre, ProfilePhoto
- **bookmark**: UserId, BookId, BookTitle, BookAuthor, BookCover, BookRating
- **history**: UserId, BookId, BookTitle, BookAuthor, BookCover
- **rating**: UserId, BookId, Rating (1-5)

Note: Book data is now fetched dynamically from Google Books API instead of being stored in the database.

## Search Capabilities
The system uses Google Books API to provide:
1. **Title search**: Find books by exact or partial title match
2. **Author search**: Discover books by specific authors
3. **Genre search**: Browse books within specific categories
4. **General search**: Search across all fields for maximum flexibility

## Last Updated
2025-12-01
