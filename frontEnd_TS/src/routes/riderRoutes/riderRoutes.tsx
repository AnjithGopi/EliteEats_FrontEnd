import { GuestLayout, RiderAuth } from "../../Components/AuthLayout/RiderAuth";
import VerifyProfile from "../../Components/Rider/pages/deliveryPartnerVerify";
import Login from "../../Components/Rider/pages/login";
import Otp from "../../Components/Rider/pages/Otp";
import RiderProfile from "../../Components/Rider/pages/RiderProfile";
import Signup from "../../Components/Rider/pages/signup";

const riderRoutes = [
  // guest layout

  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { path: "rider/signup", element: <Signup /> },
      { path: "rider/otp", element: <Otp /> },
      { path: "rider/login", element: <Login /> },
    ],
  },

  // protected routes

  {
    path: "/",
    element: <RiderAuth />,
    children: [
      { path: "rider/profile", element: <RiderProfile /> },
      { path: "rider/verify_profile", element: <VerifyProfile /> },
    ],
  },
];

export default riderRoutes;
