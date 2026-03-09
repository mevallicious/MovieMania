// src/components/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/slices/authSlice";
import * as userService from "../../services/user.api";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      // 1. Backend call to clear session/cookies
      await userService.logoutUser(); 
      
      // 2. Clear Redux State
      dispatch(logoutUser());
      
      // 3. Redirect to login
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      // Force logout on frontend anyway
      dispatch(logoutUser());
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Movie<span>Mania</span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
          </li>
          <li>
            <Link to="/favorites" className={location.pathname === "/favorites" ? "active" : ""}>Favorites</Link>
          </li>
          <li>
            <Link to="/history" className={location.pathname === "/history" ? "active" : ""}>History</Link>
          </li>
          <li>
            <Link to="/search" className={location.pathname === "/search" ? "active" : ""}>Search</Link>
          </li>
        </ul>

        <div className="nav-actions">
          {user ? (
            <div className="user-section">
              <span className="username">Hi, {user.username}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;