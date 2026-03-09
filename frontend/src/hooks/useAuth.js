import { useDispatch, useSelector } from "react-redux";
import { setUser, logoutUser, setLoading, setError } from "../store/slices/authSlice";
import api from "../services/axios";

export default function useAuth() {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector(state => state.auth);

    // --- REGISTER ---
    const register = async (userData) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            // Step 1: Hit the register endpoint
            const response = await api.post("/auth/register", userData);
            
            // Step 2: Auto-login by setting the user from the response
            // Your backend registerUser sends back { user: { username, id, email } }
            dispatch(setUser(response.data.user));
            
            return response.data;
        } catch (err) {
            const message = err.response?.data?.message || "Registration failed";
            dispatch(setError(message));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    };

    // --- LOGIN ---
    const login = async (credentials) => {

  dispatch(setLoading(true))
  dispatch(setError(null))

  try {

    // Step 1: Login request (sets JWT cookie)
    await api.post("/auth/login", credentials)

    // Step 2: Fetch logged-in user
    const response = await api.get("/auth/get-me")

    // Step 3: Save user in redux
    dispatch(setUser(response.data.user))

    return response.data.user

  } catch (err) {

    const message =
      err.response?.data?.message || "Invalid email or password"

    dispatch(setError(message))

    throw new Error(message)

  } finally {

    dispatch(setLoading(false))

  }

}

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            dispatch(logoutUser());
        }
    };

    const getMe = async () => {
        dispatch(setLoading(true));
        try {
            const response = await api.get("/auth/get-me");
            dispatch(setUser(response.data.user));
        } catch (err) {
            dispatch(logoutUser());
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        user,
        loading,
        error,
        register, // Now available to your components
        login,
        logout,
        getMe
    };
}