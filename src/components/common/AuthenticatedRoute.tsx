import { Navigate, useLocation } from "react-router-dom";
import authService from "@/services/authService";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const AuthenticatedRoute = ({ children }: ProtectedRouteProps) => {
  const user = authService.getCurrentUser();
  const location = useLocation();
  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location?.pathname }} />
  );
};

export default AuthenticatedRoute;
