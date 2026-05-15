# Collaborative Filtering Recommendation Algorithm (Python Implementation)

This document describes the collaborative filtering algorithm used in BookNest for book recommendations.

## Algorithm Overview

The recommendation system uses a hybrid approach combining:
1. Content-based filtering (user preferences)
2. Collaborative filtering (user ratings)
3. Popularity-based recommendations

## Python Implementation

```python
import numpy as np
from typing import List, Dict, Optional

class BookRecommendationEngine:
    def __init__(self, books: List[Dict], user_ratings: List[Dict]):
        """
        Initialize the recommendation engine
        
        Args:
            books: List of book dictionaries with id, title, author, genres, rating
            user_ratings: List of user rating dictionaries with userId, bookId, rating
        """
        self.books = books
        self.user_ratings = user_ratings
        
    def calculate_similarity(self, user1_ratings: Dict, user2_ratings: Dict) -> float:
        """
        Calculate cosine similarity between two users based on their ratings
        
        Args:
            user1_ratings: Dictionary of {bookId: rating} for user 1
            user2_ratings: Dictionary of {bookId: rating} for user 2
            
        Returns:
            Similarity score between 0 and 1
        """
        common_books = set(user1_ratings.keys()) & set(user2_ratings.keys())
        
        if len(common_books) == 0:
            return 0.0
            
        user1_vector = np.array([user1_ratings[book] for book in common_books])
        user2_vector = np.array([user2_ratings[book] for book in common_books])
        
        dot_product = np.dot(user1_vector, user2_vector)
        magnitude1 = np.linalg.norm(user1_vector)
        magnitude2 = np.linalg.norm(user2_vector)
        
        if magnitude1 == 0 or magnitude2 == 0:
            return 0.0
            
        return dot_product / (magnitude1 * magnitude2)
    
    def get_user_ratings_dict(self, user_id: str) -> Dict:
        """Get dictionary of book ratings for a specific user"""
        ratings = {}
        for rating in self.user_ratings:
            if rating['userId'] == user_id:
                ratings[rating['bookId']] = rating['rating']
        return ratings
    
    def get_recommendations(self, user_id: str, user_profile: Optional[Dict] = None, 
                          top_n: int = 8) -> List[Dict]:
        """
        Generate book recommendations for a user
        
        Args:
            user_id: ID of the user to generate recommendations for
            user_profile: Optional user profile with preferences
            top_n: Number of recommendations to return
            
        Returns:
            List of recommended books sorted by score
        """
        user_ratings = self.get_user_ratings_dict(user_id)
        all_users = set(r['userId'] for r in self.user_ratings)
        
        # Calculate similarity with all other users
        similarities = {}
        for other_user in all_users:
            if other_user != user_id:
                other_ratings = self.get_user_ratings_dict(other_user)
                sim = self.calculate_similarity(user_ratings, other_ratings)
                similarities[other_user] = sim
        
        # Calculate recommendation scores
        recommendations = []
        for book in self.books:
            score = book['rating']  # Base score from book's overall rating
            
            # Content-based filtering: boost based on user preferences
            if user_profile:
                if user_profile.get('favoriteGenre'):
                    if user_profile['favoriteGenre'].lower() in book['genres']:
                        score += 1.5
                        
                if user_profile.get('favoriteAuthor'):
                    if user_profile['favoriteAuthor'].lower() in book['author'].lower():
                        score += 2.0
            
            # Collaborative filtering: use similar users' ratings
            if user_id and book['id'] not in user_ratings:
                weighted_sum = 0
                similarity_sum = 0
                
                for other_user, similarity in similarities.items():
                    other_ratings = self.get_user_ratings_dict(other_user)
                    if book['id'] in other_ratings:
                        weighted_sum += similarity * other_ratings[book['id']]
                        similarity_sum += similarity
                
                if similarity_sum > 0:
                    collaborative_score = weighted_sum / similarity_sum
                    score += (collaborative_score - 3) * 0.3
            
            # If user already rated this book, boost/penalize based on their rating
            if book['id'] in user_ratings:
                score += (user_ratings[book['id']] - 3) * 0.5
            
            recommendations.append({
                **book,
                'recommendationScore': score
            })
        
        # Sort by score and return top N
        recommendations.sort(key=lambda x: x['recommendationScore'], reverse=True)
        return recommendations[:top_n]


# Example usage
if __name__ == "__main__":
    # Sample data
    books = [
        {'id': 1, 'title': 'The Great Gatsby', 'author': 'F. Scott Fitzgerald', 
         'rating': 4.5, 'genres': ['fiction', 'classic']},
        {'id': 2, 'title': 'To Kill a Mockingbird', 'author': 'Harper Lee',
         'rating': 4.8, 'genres': ['fiction', 'classic']},
        # ... more books
    ]
    
    user_ratings = [
        {'userId': 'user1', 'bookId': 1, 'rating': 5},
        {'userId': 'user2', 'bookId': 1, 'rating': 4},
        {'userId': 'user2', 'bookId': 2, 'rating': 5},
        # ... more ratings
    ]
    
    user_profile = {
        'favoriteGenre': 'fiction',
        'favoriteAuthor': 'F. Scott Fitzgerald'
    }
    
    engine = BookRecommendationEngine(books, user_ratings)
    recommendations = engine.get_recommendations('user1', user_profile, top_n=5)
    
    for book in recommendations:
        print(f"{book['title']} - Score: {book['recommendationScore']:.2f}")
```

## Algorithm Components

### 1. Cosine Similarity
- Calculates similarity between users based on their rating patterns
- Range: 0 (completely different) to 1 (identical preferences)

### 2. Weighted Scoring System
- Base book rating: Uses the book's overall rating as starting point
- Genre match: +1.5 points if book matches user's favorite genre
- Author match: +2.0 points if book is by user's favorite author
- Collaborative filtering: Adjusts score based on similar users' ratings
- User's own rating: Adjusts score based on their previous rating (+/-0.5 per star difference from neutral)

### 3. Top-N Recommendations
- Sorts all books by their calculated score
- Returns the top N highest-scoring books

## Last Updated
2025-11-12