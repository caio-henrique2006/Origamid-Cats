import react from "react";
import { useState } from "react";
import { Modal } from "./Modal";
import "../style/card.css";

export const Card = ({ id, post }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = (post) => {
    setModalOpen(true);
  };

  return (
    <>
      {modalOpen ? <Modal data={post} setModalOpen={setModalOpen} /> : null}
      <div key={id} className="card" onClick={() => handleModalOpen(post)}>
        <img src={post.image_url} alt={post.title} />
        <div className="card__overlay">
          <p>{post.title}</p>
        </div>
      </div>
    </>
  );
};
