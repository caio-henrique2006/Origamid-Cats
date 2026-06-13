import React from "react";
import "../style/button.css";

export const ConfirmButton = ({ children, onClick, type = "button" }) => {
  return (
    <button type={type} onClick={onClick} className="confirm-button">
      {children}
    </button>
  );
};
