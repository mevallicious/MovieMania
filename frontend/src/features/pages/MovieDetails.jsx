import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useMovies from "../../hooks/useMovies";
import useHistory from "../../hooks/useHistory";
import useFavorites from "../../hooks/useFavorites";

const MovieDetails = () => {
    const { id } = useParams();
    const { getMovieDetails, getMovieTrailer, getMovieCredits } = useMovies();
    const { addHistory } = useHistory();
    const { addFavorite } = useFavorites();

    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const loadAllData = async () => {
            const [details, trailerUrl, castData] = await Promise.all([
                getMovieDetails(id),
                getMovieTrailer(id),
                getMovieCredits(id)
            ]);
            setMovie(details);
            setTrailer(trailerUrl);
            setCast(castData);
            
            // AUTOMATIC HISTORY: Add to history on click/view
            addHistory(id); 
        };
        loadAllData();
    }, [id]);

    if (!movie) return <div className="loader">Loading Cinematic Experience...</div>;

    return (
        <div className="details-container">
            <Navbar />
            
            {/* HERO SECTION - Matches image_06604d.jpg */}
            <div className="details-hero" style={{ backgroundImage: `url(${movie.backdrop})` }}>
                <div className="hero-overlay">
                    <div className="hero-content-wrapper">
                        <img src={movie.poster} alt={movie.title} className="side-poster" />
                        <div className="main-info">
                            <span className="meta-tag">Movie • {movie.releaseDate?.split('-')[0]}</span>
                            <h1>{movie.title}</h1>
                            <div className="crew-mini">
                                <div><p>Directed By</p><strong>{movie.director || 'N/A'}</strong></div>
                                <div><p>Country</p><strong>{movie.country || 'USA'}</strong></div>
                                <div><p>Language</p><strong>{movie.language || 'English'}</strong></div>
                            </div>
                            
                            <div className="action-buttons">
                                <button className="trailer-btn" onClick={() => window.open(trailer, '_blank')}>
                                    <span>▶</span> Watch Trailer
                                </button>
                                <button className="collection-btn" onClick={() => addFavorite(id)}> 
                                    <span>+</span> Add to Collection
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* INSIGHTS SECTION - Matches image_065fee.png */}
            <div className="details-body">
                <div className="left-column">
                    <section className="overview">
                        <h3>Overview</h3>
                        <p>{movie.overview}</p>
                        <div className="genre-tags">
                            {movie.genres?.map(g => <span key={g}>{g}</span>)}
                        </div>
                    </section>

                    {/* CAST SECTION - Matches image_065f76.png */}
                    <section className="cast-section">
                        <h3>Cast</h3>
                        <div className="cast-scroll">
                            {cast.map(actor => (
                                <div key={actor.id} className="actor-card">
                                    <div className="actor-img" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w200${actor.profile_path})` }}></div>
                                    <p className="actor-name">{actor.name}</p>
                                    <p className="character-name">{actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="right-column">
                    {/* VIBE CHART - Visual CSS Representation */}
                    <div className="vibe-card">
                        <h3>Vibe Chart</h3>
                        <div className="chart-box">
                            <div className="pie-chart" style={{ 
                                background: `conic-gradient(#007bff 0% 25%, #00f2fe 25% 50%, #ff0000 50% 100%)` 
                            }}>
                                <div className="inner-label">Action<br/><span>50%</span></div>
                            </div>
                            <ul className="chart-legend">
                                <li><span className="dot action"></span> Action 50%</li>
                                <li><span className="dot scifi"></span> Sci-Fi 25%</li>
                                <li><span className="dot thriller"></span> Thriller 25%</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;