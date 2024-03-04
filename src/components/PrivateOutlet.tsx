import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function PrivateOutlet() {
  const { token } = useAuthStore();

  if (token === "") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
