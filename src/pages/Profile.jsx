import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Post } from "../services/post";
import { Modal } from "../components/Modal";

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
    <>
      {modalOpen ? (
        <Modal data={selectedPost} setModalOpen={setModalOpen} />
      ) : null}
      <Link to="add">Add Post</Link>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} onClick={() => handleModalOpen(post)}>
              <h3>{post.title}</h3>
              <img width="200px" src={post.image_url} alt={post.title} />
            </div>
          ))
        )}
      </div>
    </>
  );
};
