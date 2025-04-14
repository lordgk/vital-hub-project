
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // We removed the wrapping of MainLayout since each page component
  // should already be wrapped with MainLayout with proper title
  return <Outlet />;
};

export default ProtectedRoute;
