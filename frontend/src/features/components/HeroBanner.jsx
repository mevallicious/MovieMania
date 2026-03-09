const HeroBanner = ({ movie }) => {

  if (!movie) return null

  return (
        <div
        className="hero-banner"
        style={{
            backgroundImage: `url(${movie.poster})`
        }}
        >
            <div className="hero-content">
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
                <div className="hero-buttons">
                    <button className="play-btn">
                        ▶ Play Trailer
                    </button>
                    <button className="fav-btn">
                        + Add to Favorites
                    </button>
                </div>
            </div>
        </div>

  )
}

export default HeroBanner