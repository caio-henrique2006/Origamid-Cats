import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Auth } from "../services/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const auth = new Auth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      await auth.login(email, password);
      console.log("Successful Login", { email });
      navigate("/");
    } catch (e) {
      console.error("Error logging in user:", e);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (await auth.isAuthenticated()) {
        navigate("/");
      }
    };
    checkAuth();
  }, []);

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </section>
  );
};
