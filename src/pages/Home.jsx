import React from "react";
import { useEffect } from "react";
import { Auth } from "../services/auth";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const auth = new Auth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!(await auth.isAuthenticated())) {
        navigate("/login");
      }
    };
    checkAuth();
  }, []);
  return <>Home</>;
};
