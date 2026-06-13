import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Auth } from "../services/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "../components/InputText";
import { ConfirmButton } from "../components/ConfirmButton";
import "../style/login.css";

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
    <main className="login-page">
      <section className="login-page__media" aria-hidden="true">
        <img src="/login-side.jpg" alt="" />
      </section>
      <section className="login-page__content">
        <div className="login-card">
          <p className="login-card__eyebrow">Poste</p>
          <h1>Login</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <InputText
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="suaConta@exemplo.com"
            />
            <InputText
              label="Senha"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <ConfirmButton type="submit">Login</ConfirmButton>
          </form>
          <Link className="login-card__link" to="/register">
            Registrar-se
          </Link>
        </div>
      </section>
    </main>
  );
};
