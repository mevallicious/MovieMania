import { useNavigate,Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const Signup = () => {
    const navigate = useNavigate();
    const { register, loading, error } = useAuth(); // Use the hook here!

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // Call the register function from useAuth
            await register({ username, email, password });
            navigate("/"); // Go to home after successful registration
        } catch (err) {
            console.log("Signup failed", err);
        }
    }

    return (
        <div className="auth-page">
            <form onSubmit={handleSignup} className="auth-card">
                <h2>Signup</h2>
                {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}
                
                <input 
                    placeholder="Username" 
                    onChange={(e) => setUsername(e.target.value)} 
                    disabled={loading}
                />
                <input 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    disabled={loading}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    disabled={loading}
                />
                
                <button type="submit" disabled={loading}>
                    {loading ? "Creating Account..." : "Signup"}
                </button>
                <p>Already have an account? <Link to={"/login"}>Login</Link></p>
            </form>
        </div>
    );
}

export default Signup