import { useDispatch,useSelector } from "react-redux"
import { setHistory } from "../store/slices/historySlice"
import * as userService from "../services/user.api"

export default function useHistory() {
    const dispatch = useDispatch();
    const history = useSelector(state => state.history.movies);
    const loadHistory = async () => {
        
        const res = await userService.getHistory(); 
        
        dispatch(setHistory(res.history)); 
    };
    const addHistory = async(id)=>{
        await userService.addToHistory(id)
        loadHistory()
    }

    return{
        history,
        loadHistory,
        addHistory
    }

}