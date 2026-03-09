// src/pages/Search.jsx
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/skeletonCard";
import useDebounce from "../../hooks/useDebounce";
import useMovies from "../../hooks/useMovies";

const Search = () => {
  const { searchMovies } = useMovies();
  const [searchTerm, setSearchTerm] = useState(""); 
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  

  const debouncedQuery = useDebounce(searchTerm, 500);

 
useEffect(() => {
  const performSearch = async () => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    // ONLY show loading if we don't have results yet (prevents flicker)
    if (results.length === 0) {
      setIsLoading(true);
    }

    try {
      const movies = await searchMovies(debouncedQuery);
      setResults(movies.results || movies);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false); 
    }
  };
  performSearch();
}, [debouncedQuery]); // Removed searchMovies from dependency to avoid extra triggers

  return (
    <div className="search-page">
      <Navbar />
      <SearchBar onSearch={setSearchTerm} />

      <div className="search-results">
        {/* Case 1: Loading state - Show Skeletons */}
        {isLoading ? (
          [...Array(10)].map((_, i) => <SkeletonCard type="search" key={i} />)
        ) : 
        /* Case 2: Data loaded - Show Results */
        results?.length > 0 ? (
          results.map((movie) => {
            const movieData = {
                id: movie.id,
                title: movie.title || movie.name,
                poster: movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                    : (movie.poster || "https://via.placeholder.com/500x750?text=No+Poster"),
                rating: movie.vote_average || movie.rating
            };
            return <MovieCard key={movieData.id} movie={movieData} />;
          })
        ) : (
          /* Case 3: No Results found */
          searchTerm && !isLoading && (
            <p style={{ textAlign: "center", gridColumn: "1/-1", marginTop: "2rem", color: "#777" }}>
              No movies found for "{debouncedQuery}".
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Search;