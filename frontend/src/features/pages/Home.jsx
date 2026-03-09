import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import useMovies from "../../hooks/useMovies";

const Home = () => {
  const { trending, popular, topRated, loadMovies } = useMovies();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initHome = async () => {
      setIsLoading(true);
      await loadMovies();
      setIsLoading(false);
    };
    initHome();
  }, []);

  return (
    <div className="home-page">
      <Navbar />

      {/* HeroBanner Skeleton or Content */}
      {isLoading ? (
        <div className="hero-skeleton"></div> // Simple CSS shimmer for hero
      ) : (
        trending?.length > 0 && <HeroBanner movie={trending[0]} />
      )}

      {/* Passing isLoading to rows */}
      <MovieRow title="Trending Movies" movies={trending} isLoading={isLoading} />
      <MovieRow title="Popular Movies" movies={popular} isLoading={isLoading} />
      <MovieRow title="Top Rated Movies" movies={topRated} isLoading={isLoading} />
    </div>
  );
};

export default Home;