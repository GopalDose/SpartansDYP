import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!userId || isLoggedIn !== "true") {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;
