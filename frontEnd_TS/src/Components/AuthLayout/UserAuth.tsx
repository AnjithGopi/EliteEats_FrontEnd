import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";

export const UserAuthLayout = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="user/login" replace />;
  }

  return <Outlet />;
};

export const GuestLayout = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  if (isAuthenticated) {
    return <Navigate to="user/home/" replace />;
  }

  return <Outlet />;
};
