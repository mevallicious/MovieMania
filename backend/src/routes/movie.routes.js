const express= require("express")
const movieRouter =express.Router()
const movieController =require("../controller/movie.controller")


movieRouter.get("/trending", movieController.getTrendingMovies)
movieRouter.get("/popular", movieController.getPopularMovies)
movieRouter.get("/top-rated", movieController.getTopRatedMovies)

movieRouter.get("/search", movieController.searchMovies)

movieRouter.get("/:id", movieController.getMovieDetails)
movieRouter.get("/:id/trailer", movieController.getMovieTrailers)
movieRouter.get("/:id/credits", movieController.getMovieCredits);

module.exports =movieRouter