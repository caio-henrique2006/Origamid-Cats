import React from "react";
import { Link } from "react-router-dom";
import { Auth } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../style/header.css";

export const Header = () => {
  const auth = new Auth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.logout();
      navigate("/login");
    } catch (e) {
      console.error("Error logging out user:", e);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (await auth.isAuthenticated()) {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="header__container">
        <img
          src="./logo.png"
          alt="Logo"
          className="header__logo"
          width="50"
          onClick={() => navigate("/")}
        />
        <nav className="header__nav">
          <Link className="header__link" to="/profile">
            Perfil
          </Link>
          {isAuthenticated ? (
            <img
              src="./logout.png"
              width="20"
              height="20"
              alt="Logout"
              onClick={handleLogout}
              style={{ cursor: "pointer", marginLeft: 16 }}
            />
          ) : (
            <Link className="header__link" to="/login">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
