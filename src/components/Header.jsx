import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.logo}>
          <Link to="/">Origamid Cats</Link>
        </h1>
        <nav>
          <Link style={styles.link} to="/login">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    background: "#fff",
    borderBottom: "1px solid #eee",
    padding: "12px 0",
  },
  container: {
    width: "90%",
    maxWidth: 1000,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    margin: 0,
    fontSize: 20,
    color: "#222",
  },
  link: {
    marginLeft: 16,
    color: "#555",
    textDecoration: "none",
    fontSize: 14,
  },
};

export default Header;
