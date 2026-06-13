import React from "react";
import { useEffect, useState } from "react";
import { Auth } from "../services/auth";
import { Post } from "../services/post";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { InputText } from "../components/InputText";
import { ConfirmButton } from "../components/ConfirmButton";
import "../style/login.css";

export const ProfileAdd = () => {
  const auth = new Auth();
  const navigate = useNavigate();
  const post = new Post();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [local, setLocal] = useState("");
  const [image, setImage] = useState(null);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!title || !description) return;
    try {
      await post.sendPost({
        title,
        description,
        local,
        imageFile: image,
      });
      console.log("Successful Post", { title, description });
      navigate("/profile");
    } catch (e) {
      console.error("Error creating post:", e);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (!(await auth.isAuthenticated())) {
        navigate("/");
      }
    };
    checkAuth();
  }, []);

  return (
    <main className="register-page">
      <nav className="home-nav">
        <p> Minha Conta </p>
        <div>
          <Link to="/profile"> Meus Postes </Link>
          <Link to="/profile/add"> Criar Poste </Link>
        </div>
      </nav>
      <section className="login-page__content">
        <div className="login-card">
          <h1>Criar Poste</h1>

          <form className="login-form" onSubmit={handlePost}>
            <InputText
              label="Título"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Melhor poste"
            />

            <InputText
              label="Local"
              id="local"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              placeholder="Ex: São Paulo, SP"
            />

            <div>
              <label className="input-text__label" htmlFor="description">
                Descrição
              </label>
              <textarea
                className="input-text__input"
                id="description"
                placeholder="Esse poste mudou minha vida..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
              />
            </div>

            <div>
              <label className="input-text__label" htmlFor="image">
                Imagem
              </label>
              <input
                className="input-text__input"
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>

            <ConfirmButton type="submit">Criar Post</ConfirmButton>
          </form>
        </div>
      </section>
    </main>
  );
};
