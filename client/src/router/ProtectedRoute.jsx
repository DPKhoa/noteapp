// eslint-disable-next-line no-unused-vars
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function ProtectedRoute({ children }) {
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
