import { createSlice } from "@reduxjs/toolkit"

const historySlice = createSlice({

    name:"history",

    initialState:{
        movies:[]
    },

    reducers:{

        setHistory:(state,action)=>{
        state.movies = action.payload
        }

    }

})

export const {setHistory} = historySlice.actions

export default historySlice.reducer