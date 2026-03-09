import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./slices/authSlice"
import favoriteReducer from "./slices/favoriteSlice"
import historyReducer from "./slices/historySlice"

const store = configureStore({
    reducer:{
        auth: authReducer,
        favorites: favoriteReducer,
        history: historyReducer
    }
})

export default store