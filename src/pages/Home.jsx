import React from "react";
import { useEffect } from "react";
import { Auth } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { Post } from "../services/post";
import { Card } from "../components/Card";
import "../style/home.css";
import "../style/card.css";

export const Home = () => {
  const auth = new Auth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postService = new Post();
        const posts = await postService.getAllPosts();
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

  useEffect(() => {
    const checkAuth = async () => {
      if (!(await auth.isAuthenticated())) {
        navigate("/login");
      }
    };
    checkAuth();
  }, []);

  return (
    <div className="home">
      <div className="home-page">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          posts.map((post) => <Card key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
};
