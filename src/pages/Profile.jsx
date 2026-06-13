import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Post } from "../services/post";
import { Modal } from "../components/Modal";
import { Card } from "../components/Card";
import "../style/home.css";

export const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postService = new Post();
        const posts = await postService.getPosts();
        console.log("Fetched posts:", posts);
        if (posts) {
          setPosts(posts);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="home">
      <nav className="home-nav">
        <p> Minha Conta </p>
        <div>
          <Link to="/profile"> Meus Postes </Link>
          <Link to="/profile/add"> Criar Poste </Link>
        </div>
      </nav>
      <div className="home-page">
        {loading ? (
          <p>Carregando...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => <Card key={post.id} post={post} />)
        ) : (
          <p>Nenhum post encontrado.</p>
        )}
      </div>
    </div>
  );
};
