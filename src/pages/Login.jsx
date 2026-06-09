import React from "react";
import "../style/Login.css";

export const Login = () => {
  return (
    <div className="login-page">
      <div className="login-page__left" aria-hidden="true" />
      <div className="login-page__right">
        <div className="login-page__box">
          <h2 className="login-page__title">Welcome back</h2>
          <div className="login-page__group">
            <label htmlFor="email" className="login-page__label">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="login-page__input"
            />
          </div>
          <div className="login-page__group">
            <label htmlFor="password" className="login-page__label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="login-page__input"
            />
          </div>
          <div className="login-page__actions">
            <button className="login-page__button login-page__button--login">
              Login
            </button>
            <button className="login-page__button login-page__button--register">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
