import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, element: Component, ...props }) => {
  return loggedIn ? <Component {...props} /> : <Navigate to="/sing-in" replace />;
};

export default ProtectedRoute;
