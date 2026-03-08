const tmdbService=require("../services/tmdb.services")


async function getTrendingMovies(req,res){
    const data = await tmdbService.getTrendingMovies()

    const movies = data.results.map(movie=>({
        id:movie.id,
        title:movie.title,
        poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : null,
        rating:movie.vote_average,
        releaseDate:movie.release_date
    }))

    res.status(200).json({ movies })
}

async function getPopularMovies(req,res){
    const data = await tmdbService.getPopularMovies()

    const movies = data.results.map(movie=>({
        id:movie.id,
        title:movie.title,
        poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : null,
        rating:movie.vote_average,
        releaseDate:movie.release_date
    }))

    res.status(200).json({ movies })
}

async function getTopRatedMovies(req,res){

    const data = await tmdbService.getTopRatedMovies()
    
    const movies = data.results.map(movie=>({
        id:movie.id,
        title:movie.title,
        poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : null,
        rating:movie.vote_average,
        releaseDate:movie.release_date
    }))
    
    res.status(200).json({ movies })
}

async function searchMovies(req,res){
    const query = req.query.q

    const data = await tmdbService.searchMovies(query)

    const movies = data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : null,
            rating: movie.vote_average,
            releaseDate: movie.release_date
        }))

    res.status(200).json({ movies })
}

async function getMovieDetails(req,res){
    const id =Number(req.params.id)

    //yaha pe we did take movie as the id and created detailed movie as the whole defination cause jab new page khulega toh aditional details bhi hogi
    const movie=await tmdbService.getMovieDetails(id)

    const Moviedetails = {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : null,
        rating: movie.vote_average,
        releaseDate: movie.release_date,
        runtime: movie.runtime,
        genres: movie.genres.map(g => g.name)
    }

    res.status(200).json(Moviedetails)
}

async function getMovieTrailers(req,res){
    const id = Number(req.params.id)

    const data = await tmdbService.getMovieTrailers(id)

    const trailer =data.results.find(
        video => video.type ==="Trailer" && video.site ==="YouTube"
    )

    if(!trailer){
        return res.status(404).json({
            message:"Trailer not available"
        })
    }

    const trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`

    res.status(200).json({
        trailer:trailerUrl
    })
}


module.exports ={
    getTrendingMovies,getPopularMovies,getTopRatedMovies,getMovieTrailers,searchMovies,getMovieDetails
}
