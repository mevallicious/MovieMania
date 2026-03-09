import api from "./axios"

export async function getTrendingMovies(){
    const response = await api.get("/movies/trending")
    return response.data
}


export async function getPopularMovies(){
    const response = await api.get("/movies/popular")
    return response.data
}

export async function getTopRatedMovies(){
    const response = await api.get("/movies/top-rated")
    return response.data
}

export async function searchMovies(query){
    const response = await api.get(`/movies/search?q=${query}`)
    return response.data
}

export async function getMovieDetails(id){
    const response = await api.get(`/movies/${id}`)
    return response.data
}

export async function getMovieCredits(id) {
    const response = await api.get(`/movies/${id}/credits`);
    return response.data; 
}

export async function getMovieTrailers(id){
    const response = await api.get(`/movies/${id}/trailer`)
    return response.data
}

