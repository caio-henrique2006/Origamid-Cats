import React from "react";
import { Comments } from "../services/comments";
import { useEffect } from "react";

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  width: "min(960px, 92vw)",
  height: "min(540px, 88vh)",
  background: "#fff",
  borderRadius: "10px",
  overflow: "hidden",
  display: "flex",
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
};

const imageWrapperStyle = {
  width: "70%",
  background: "#f2f2f2",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const contentStyle = {
  width: "30%",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  overflowY: "auto",
};

export const Modal = ({ data, setModalOpen }) => {
  const comment = new Comments();
  const [comments, setComments] = React.useState([]);
  const [commentInput, setCommentInput] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const handleAddComment = async () => {
    if (!commentInput.trim()) return;
    const newComment = await comment.sendComments({
      post_id: data.id,
      text: commentInput,
    });
    setCommentInput("");
    setComments((prev) => [newComment, ...prev]);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const commentsData = await comment.getComments(data.id);
        setComments(commentsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return (
    <div style={overlayStyle} onClick={() => setModalOpen(false)}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={imageWrapperStyle}>
          <img
            src={data.image_url}
            alt={data.title || "Modal image"}
            style={imageStyle}
          />
        </div>

        <div style={contentStyle}>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
          <p>
            <strong>Local:</strong> {data.local}
          </p>

          <div>
            <strong>Comentaries:</strong>
            <div style={{ display: "flex", gap: "0.5rem", margin: "0.5rem 0" }}>
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add a comment"
                style={{ flex: 1, padding: "0.4rem 0.5rem" }}
              />
              <button type="button" onClick={handleAddComment}>
                Add
              </button>
            </div>
            <ul>
              {loading ? (
                <li>Loading comments...</li>
              ) : comments.length === 0 ? (
                <p>Sem comentários</p>
              ) : (
                comments.map((comment, index) => (
                  <li key={`${comment}-${index}`}>
                    <b>{comment.user_name}</b>
                    <p>{comment.text}</p>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
