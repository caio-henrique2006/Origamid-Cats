import React from "react";
import "../style/inputText.css";

export const InputText = ({
  label,
  id,
  value,
  onChange,
  placeholder = "",
  type = "text",
}) => {
  return (
    <div>
      <label className="input-text__label" htmlFor={id}>
        {label}
      </label>
      <input
        className="input-text__input"
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};
