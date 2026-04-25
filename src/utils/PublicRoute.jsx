import React from "react";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  // If token exists, redirect to dashboard, else show children
  return token ? <Navigate to="/dashboard" replace /> : children;
}

export default PublicRoute;