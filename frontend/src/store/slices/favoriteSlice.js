import { createSlice } from "@reduxjs/toolkit"

const favoriteSlice = createSlice({

    name:"favorites",

    initialState:{
        movies:[]
    },

    reducers:{

        setFavorites:(state,action)=>{
        state.movies = action.payload
        }

    }

})

export const {setFavorites} = favoriteSlice.actions

export default favoriteSlice.reducer