import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PrivateRoutes() {
  const { auth } = useAuth();

  return auth?.id ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
