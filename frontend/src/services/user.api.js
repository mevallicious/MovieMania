import api from "./axios"

export async function addFavorite(tmdbId){
    const response = await api.post(`/user/favorites/${tmdbId}`)
    return response.data
}

export async function removeFavorite(tmdbId){
    const response = await api.delete(`/user/favorites/${tmdbId}`)
    return response.data
}

export async function getFavorite(){ 
    const response = await api.get(`/user/favorites`) 
    return response.data
}


export async function addToHistory(tmdbId){
    const response = await api.post(`/user/history/${tmdbId}`)
    return response.data
}

export async function getHistory(){ 
    const response = await api.get(`/user/history`) 
    return response.data
}