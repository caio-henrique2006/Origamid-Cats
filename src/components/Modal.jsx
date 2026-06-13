import React from "react";
import { Comments } from "../services/comments";
import { useEffect } from "react";
import "../style/modal.css";
import { ConfirmButton } from "./ConfirmButton";

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
    <div className="overlay" onClick={() => setModalOpen(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="image-wrapper">
          <img src={data.image_url} alt={data.title || "Modal image"} />
        </div>

        <div className="content">
          <h2>{data.title}</h2>
          <p>{data.description}</p>
          <p>
            <strong>Local:</strong> {data.local}
          </p>

          <div>
            <strong>Comentários:</strong>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                margin: "0.5rem 0",
              }}
            >
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add a comment"
                style={{ flex: 1, padding: "0.4rem 0.5rem" }}
              />
              <ConfirmButton onClick={handleAddComment}>Enviar</ConfirmButton>
            </div>
            <div>
              {loading ? (
                <p>Carregando comentários...</p>
              ) : comments.length === 0 ? (
                <p>Sem comentários</p>
              ) : (
                comments.map((comment, index) => (
                  <div key={`${comment}-${index}`}>
                    <b>{comment.user_name}</b>
                    <p>{comment.text}</p>
                    <hr />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
