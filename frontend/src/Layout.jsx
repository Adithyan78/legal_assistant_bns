import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Layout.css";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/auth");
  };

  return (
    <>
      <nav className="navbar">
        <h2 className="logo">AI Legal Intelligence System</h2>

        <div className="nav-links">
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            Home
          </Link>

          {isLoggedIn && (
            <Link
              to="/chatbot"
              className={location.pathname === "/chatbot" ? "active" : ""}
            >
              <span className="nav-icon">💬</span> AI Assistant
            </Link>
          )}

          {!isLoggedIn ? (
            <Link
              to="/auth"
              className={location.pathname === "/auth" ? "active" : ""}
            >
              Login
            </Link>
          ) : (
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </nav>

      <main className="container">{children}</main>
    </>
  );
}