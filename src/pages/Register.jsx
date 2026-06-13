import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Auth } from "../services/auth";
import { InputText } from "../components/InputText";
import { ConfirmButton } from "../components/ConfirmButton";
import { Link } from "react-router-dom";
import "../style/login.css";

export const Register = () => {
  const auth = new Auth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
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
    <main className="login-page">
      <section className="login-page__media" aria-hidden="true">
        <img src="/register-side.jpg" alt="" />
      </section>
      <section className="login-page__content">
        <div className="login-card">
          <p className="login-card__eyebrow">Poste</p>
          <h1>Registrar</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <InputText
              label="Nome"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
            />
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
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <ConfirmButton type="submit">Registrar-se</ConfirmButton>
          </form>
          <Link className="login-card__link" to="/login">
            Já tenho uma conta
          </Link>
        </div>
      </section>
    </main>
  );
};
