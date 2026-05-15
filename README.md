# 📚 BookNest

> A personalised book discovery and recommendation platform

**🔗 Live Demo:** [https://cxnf5rwkp9gb.trickle.host](https://cxnf5rwkp9gb.trickle.host)

---

## About

BookNest is a web application that helps readers discover books they'll love. Users create a profile based on their reading preferences, and the platform uses a hybrid recommendation algorithm — combining content-based and collaborative filtering — to suggest books tailored to each user. Originally built as a school group project using React and the Google Books API.

---

## Features

- 🔐 **User Authentication** — Two-step sign up with email, password, and reading preferences; persistent login via localStorage
- 🎯 **Personalised Recommendations** — Hybrid algorithm using favourite genre, favourite author, and collaborative filtering from other users' ratings
- 🔍 **Advanced Book Search** — Search by title, author, genre, or general keyword via the Google Books API
- 🔖 **Bookmarks** — Save books to read later
- 📖 **Reading History** — Automatically tracks every book a logged-in user views
- ⭐ **Book Ratings** — Rate books 1–5 stars to improve future recommendations
- 👤 **Profile Management** — Update email, reading preferences, and profile photo
- 📄 **Book Detail Modal** — View ISBN, publication year, author, genres, and full summary

---

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Book recommendations and search |
| Sign Up | `signup.html` | Two-step registration |
| Profile | `profile.html` | Update user preferences |
| Bookmarks | `bookmarks.html` | Saved books |
| History | `history.html` | Viewing history with timestamps |
| About | `about.html` | About BookNest |
| Contact | `contact.html` | Contact form |

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | Frontend UI (loaded via CDN, no build step required) |
| Tailwind CSS | Styling |
| Lucide Icons | UI icons |
| Google Books API | Book data, search, covers, and metadata |
| Trickle Database | Backend — user accounts, bookmarks, history, ratings |

---

## How the Recommendation Engine Works

BookNest uses a **hybrid recommendation approach** with three components:

### 1. Content-Based Filtering
Boosts books that match the user's stated preferences:
- **+2.0 points** if the book's author matches the user's favourite author
- **+1.5 points** if the book's genre matches the user's favourite genre

### 2. Collaborative Filtering (Cosine Similarity)
Finds users with similar rating patterns and recommends books they liked:
- Compares each user's ratings against all other users using cosine similarity
- Books rated highly by similar users are surfaced even if unrelated to stated preferences
- Score adjusted by `(collaborativeScore - 3) * 0.3` to reward above-average ratings

### 3. Popularity Base Score
Each book starts with its Google Books average rating as a baseline, ensuring well-regarded books surface even for new users with no rating history.

---

## Project Structure

```
BookNest/
├── index.html              # Home page
├── signup.html             # Sign up / sign in
├── profile.html            # Profile settings
├── bookmarks.html          # Saved books
├── history.html            # Reading history
├── about.html              # About page
├── contact.html            # Contact page
├── app.js                  # Main React app
├── signup-app.js           # Sign up flow
├── profile-app.js          # Profile page logic
├── bookmarks-app.js        # Bookmarks page logic
├── history-app.js          # History page logic
├── about-app.js            # About page
├── contact-app.js          # Contact page
├── components/
│   ├── Hero.js             # Recommendations display and search UI
│   ├── BookCard.js         # Individual book card component
│   ├── BookDetail.js       # Book detail modal
│   ├── Header.js           # Navigation bar
│   ├── Sidebar.js          # Slide-in sidebar menu
│   ├── Footer.js           # Page footer
│   └── Icon.js             # Icon component
└── utils/
    ├── auth.js                  # Sign up, sign in, session management
    ├── bookService.js           # Bookmarks, history, ratings
    ├── googleBooksAPI.js        # Google Books API integration
    └── recommendationEngine.js  # Hybrid recommendation algorithm
```

---

## Database Schema

| Collection | Fields |
|---|---|
| `user` | Email, Password, FavoriteBook, FavoriteAuthor, LastBookRead, FavoriteGenre, ProfilePhoto |
| `bookmark` | UserId, BookId, BookTitle, BookAuthor, BookCover, BookRating |
| `history` | UserId, BookId, BookTitle, BookAuthor, BookCover |
| `rating` | UserId, BookId, Rating (1–5) |

---

## Running Locally

No build tools or installs required. Clone the repo and open `index.html` in your browser:

```bash
git clone https://github.com/your-username/BookNest.git
cd BookNest
open index.html
```

> Some features (bookmarks, history, ratings) require an active internet connection to communicate with the backend.

---

## Color Scheme

Derived from the BookNest logo:

| Role | Color | Hex |
|---|---|---|
| Primary | Brown | `#8B4513` |
| Secondary | Wheat | `#F5DEB3` |
| Accent | Chocolate | `#D2691E` |

---

## Contributors

Built as a group school project.

---

## License

This project is open source and available under the [MIT License](LICENSE).
