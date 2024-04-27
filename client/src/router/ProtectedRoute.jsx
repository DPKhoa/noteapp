// eslint-disable-next-line no-unused-vars
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  if (!localStorage.getItem("accessToken")) {
    navigate("/login");
    return;
  }
  return <Outlet />;
}
