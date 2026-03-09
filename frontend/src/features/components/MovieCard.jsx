import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card-container">
      <Link to={`/movie/${movie.id}`} className="movie-card">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
        />
        <div className="movie-info">
          <h4>{movie.title}</h4>
          <span>⭐ {movie.rating?.toFixed(1)}</span>
        </div>
      </Link>

    </div>
  );
};

export default MovieCard;