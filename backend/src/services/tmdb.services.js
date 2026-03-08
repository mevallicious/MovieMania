const axios = require("axios")

const api =axios.create({
    baseURL:process.env.TMDB_BASE_URL,
    params:{
        api_key:process.env.TMDB_API
    }
})

async function getTrendingMovies(){
    const response = await api.get("/trending/movie/day")
    return response.data
}

async function getPopularMovies(){
    const response = await api.get("/movie/popular")
    return response.data
}

async function getTopRatedMovies(){
    const response = await api.get("/movie/top_rated")
    return response.data
}

async function getMovieDetails(id){
    const response = await api.get(`/movie/${id}`)
    return response.data
}

async function searchMovies(query){
    const response = await api.get("/search/movie", {
        params: { query }
    })

    return response.data
}

async function getMovieTrailers(id){
    const response = await api.get(`/movie/${id}/videos`)
    return response.data
}

module.exports = {
    getTrendingMovies,getPopularMovies,getTopRatedMovies,getMovieDetails,searchMovies,getMovieTrailers    
}