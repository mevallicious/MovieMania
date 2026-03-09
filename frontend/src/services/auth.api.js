import api from "./axios"

export async function registerUser(username,email,password){
    const response = await api.post("/auth/register",{
        username,password,email
    })
    return response.data
}

export async function loginUser(email,password){
    const response = await api.post("/auth/login",{
        password,email
    })
    return response.data
}

export async function getMeUser(){
    const response = await api.get("/auth/get-me")
    return response.data
}

export async function logoutUser(){
    const response = await api.post("/auth/logout")
    return response.data
}