import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Profile = () => {
  return (
    <>
      <Link to="add">Add Post</Link>
      <Outlet />
    </>
  );
};
