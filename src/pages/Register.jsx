import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Auth } from "../services/auth";

export const Register = () => {
  const auth = new Auth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    if (password !== confirm) return;
    try {
      await auth.register(email, password, name);
      console.log("Successful Register", { name, email });
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (await auth.isAuthenticated()) {
        navigate("/home");
      }
    };
    checkAuth();
  }, []);

  return (
    <section className="register">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </label>

        <label>
          Confirm Password
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={6}
          />
        </label>

        <button type="submit">Create account</button>
      </form>
    </section>
  );
};
