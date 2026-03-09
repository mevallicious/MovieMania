import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const { login, loading, error } = useAuth(); // Destructure loading and error

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Passing the correct credentials
            await login({ email, password }); 
            navigate("/"); //
        } catch (err) {
            // The refurbished hook now handles Redux error state
            console.error("Login component error:", err);
        }
    };

    return (
        <div className="auth-page">
            <form onSubmit={handleSubmit} className="auth-card">
                <h2>Login</h2>
                
                {/* Display error message if it exists */}
                {error && <p className="error-message">{error}</p>}
                
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading} // Disable inputs during loading
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading} // Disable inputs during loading
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p>Don't have an account? <Link to={"/signup"}>SignUp</Link></p>
            </form>
        </div>
    );
};

export default Login;