import { useEffect } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import useFavorites from "../../hooks/useFavorites";

const Favorites = () => {
  const { favorites, loadFavorites, removeFavorite } = useFavorites();

  // Fetch the data from backend on page load
  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <div className="favorites-page">
      <Navbar />
      
      <div className="favorites-container">
        <header className="favorites-header">
          <h1>My Collection</h1>
          <p>{favorites?.length || 0} movies saved</p>
        </header>

        {favorites && favorites.length > 0 ? (
          <div className="favorites-grid">
            {favorites.map((item) => {
              // Standardize data for MovieCard
              const movieData = {
                id: item.id || item.tmdbId,
                title: item.title || item.name,
                poster: item.poster_path 
                  ? `https://image.tmdb.org/t/p/w500${item.poster_path}` 
                  : (item.poster || "https://via.placeholder.com/500x750?text=No+Poster"),
                rating: item.vote_average || item.rating || 0
              };

              return (
                <div key={movieData.id} className="favorite-item-wrapper">
                  <MovieCard movie={movieData} onRemove={removeFavorite} />
                  
                  {/* Remove Button Overlay */}
                  <button 
                    className="remove-fav-btn" 
                    onClick={() => removeFavorite(movieData.id)}
                    aria-label="Remove from favorites"
                  >
                    &times;
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-favorites">
            <div className="empty-icon">📂</div>
            <h2>Your collection is empty</h2>
            <p>Start exploring and add some movies to your list!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;