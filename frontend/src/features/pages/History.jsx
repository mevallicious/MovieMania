// src/pages/History.jsx
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import useHistory from "../../hooks/useHistory";

const History = () => {
  const { history, loadHistory } = useHistory();

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="history-page">
      <Navbar />
      <div className="history-header">
        <h1>Watch History</h1>
        <p>Movies you've recently viewed</p>
      </div>

      <div className="history-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', padding: '20px' }}>
        {history && history.length > 0 ? (
          history.map((item) => {
            // 1. Identify where the actual movie data lives
            // This checks if it's nested (item.movieId) or flat (item)
            const movieDetails = item.movieId || item.movie || item;

            // 2. Map the data to what MovieCard.jsx expects
            const mappedMovie = {
              id: movieDetails.tmdbId || movieDetails.id || movieDetails._id,
              title: movieDetails.title || movieDetails.name || "Untitled Movie",
              // Ensure we have the full TMDB URL for the image
              poster: movieDetails.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` 
                : (movieDetails.poster || "https://via.placeholder.com/500x750?text=No+Poster"),
              rating: movieDetails.vote_average || movieDetails.rating || 0
            };

            return (
              <MovieCard 
                key={mappedMovie.id || Math.random()} 
                movie={mappedMovie} 
              />
            );
          })
        ) : (
          <div className="empty-history">
            <p>Your watch history is empty. Start exploring!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;