import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const RiderAuth = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.riderSlice.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/rider/login" replace />;
  }

  return <Outlet />;
};

export const GuestLayout = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.riderSlice.isAuthenticated
  );

  if (isAuthenticated) {
    return <Navigate to="/rider/profile" />;
  }

  return <Outlet />;
};
