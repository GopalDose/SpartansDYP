import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const userId = localStorage.getItem("userId");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return userId && isLoggedIn === "true" ? <Outlet /> : <Navigate to="/register" replace />;
};

export default ProtectedRoute;
