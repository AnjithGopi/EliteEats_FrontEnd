import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";

export const RestuarentAuth = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.restaurentSlice.hotelDetails.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="restaurent/login" replace />;
  }

  return <Outlet />;
};

export const GuestLayout = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.restaurentSlice.hotelDetails.isAuthenticated
  );

  if (isAuthenticated) {
    return <Navigate to="restaurent/dashboard" replace />;
  }

  return <Outlet />;
};
