import { useState } from "react"

import * as movieService from "../services/movies.api"

const useMovies = () => {

  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [topRated, setTopRated] = useState([])

  const [loading, setLoading] = useState(false)

  // Load Home Page Movies
  const loadMovies = async () => {

    try {
      setLoading(true)
      const [trendingRes, popularRes, topRatedRes] =
        await Promise.all([
          movieService.getTrendingMovies(),
          movieService.getPopularMovies(),
          movieService.getTopRatedMovies()
        ])
      setTrending(trendingRes.movies)
      setPopular(popularRes.movies)
      setTopRated(topRatedRes.movies)
    } catch (err) {
      console.error("Error loading movies", err)
    } finally {
      setLoading(false)
    }
  }

  // Search Movies
  const searchMovies = async (query) => {
    try {
      const res = await movieService.searchMovies(query)
      return res.movies || []
    } catch (err) {
      console.error(err)
      return []
    }
  }

  // Get Movie Details
  const getMovieDetails = async (id) => {
    try {
      const res = await movieService.getMovieDetails(id)
      return res
    } catch (err) {
      console.error(err)
      return null
    }
  }

  // Get Movie Trailer
  const getMovieTrailer = async (id) => {
    try {
      const res = await movieService.getMovieTrailers(id)
      return res.trailer
    } catch (err) {
      console.error(err)
      return null
    }
  }

  const getMovieCredits = async (id) => {
    try {
      const res = await movieService.getMovieCredits(id);
      return res.cast; // The array of actors
    } catch (err) {
      console.error("Error fetching cast:", err);
      return [];
    }
  };

  return {

    trending,
    popular,
    topRated,
    loading,
    loadMovies,
    searchMovies,
    getMovieDetails,
    getMovieTrailer,
    getMovieCredits
  }

}

export default useMovies