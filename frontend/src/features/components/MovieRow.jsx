import MovieCard from "./MovieCard"

const MovieRow = ({ title, movies }) => {
  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="movie-row-container">
        {/* The '?' ensures it only maps if movies exists */}
        {movies?.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  )
}

export default MovieRow