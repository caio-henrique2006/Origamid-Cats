import React from "react";
import { useEffect, useState } from "react";
import { Auth } from "../services/auth";
import { Post } from "../services/post";
import { useNavigate } from "react-router-dom";

export const ProfileAdd = () => {
  const auth = new Auth();
  const navigate = useNavigate();
  const post = new Post();
  const [Title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [local, setLocal] = useState("");
  const [image, setImage] = useState(null);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!Title || !description) return;
    try {
      await post.sendPost({
        title: Title,
        description: description,
        local: local,
        imageFile: image,
      });
      console.log("Successful Post", { Title, description });
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
    <form onSubmit={handlePost}>
      <label htmlFor="title">Título</label>
      <input
        id="title"
        type="text"
        placeholder="Melhor poste"
        value={Title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="local">Local</label>
      <input
        id="local"
        type="text"
        placeholder="Ex: São Paulo, SP"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
      />

      <label htmlFor="description">Descrição</label>
      <input
        id="description"
        type="textarea"
        placeholder="Esse poste mudou minha vida..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="image">Imagem</label>
      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />

      <button type="submit">Login</button>
    </form>
  );
};
