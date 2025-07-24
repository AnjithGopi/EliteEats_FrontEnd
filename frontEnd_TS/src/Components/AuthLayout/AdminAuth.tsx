import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";

export const AdminAuth = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.adminSlice.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="admin/login" replace />;
  }

  return <Outlet />;
};

export const GuestLayout = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.adminSlice.isAuthenticated
  );

  if (isAuthenticated) {
    return <Navigate to="admin/dashboard" replace/>;
  }

  return <Outlet />;
};
