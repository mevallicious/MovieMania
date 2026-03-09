import { useDispatch,useSelector } from "react-redux"
import { setFavorites } from "../store/slices/favoriteSlice"
import * as userService from "../services/user.api"

export default function useFavorites(){
  const dispatch = useDispatch()
  const favorites = useSelector(state=>state.favorites.movies)

  const loadFavorites = async()=>{
    const res = await userService.getFavorite()
    dispatch(setFavorites(res.favorites))
  }

  const addFavorite = async (id) => {
    try {
        console.log("Sending ID to backend:", id);
        const res = await userService.addFavorite(id);
        await loadFavorites();
        alert("Added to your collection!"); 
    } catch (error) {
        if (error.response && error.response.status === 409) {
            console.warn("Movie already exists in favorites.");
            alert("This movie is already in your collection!");
        } else {
            console.error("Failed to add favorite:", error.response?.data || error.message);
        }
    }
};

  const removeFavorite = async(id)=>{
    await userService.removeFavorite(id)
    loadFavorites()
  }

  return{
    favorites,
    loadFavorites,
    addFavorite,
    removeFavorite
  }

}