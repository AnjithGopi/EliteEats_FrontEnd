import HandleSignup from "../../Components/User/HandleSignup";
import Login from "../../Components/User/Pages/Login";
import Home from "../../Components/Home/Home";
import ForgotPassword from "../../Components/User/Pages/ForgotPassword";
import NewPassword from "../../Components/User/Pages/NewPassword";
import LandingPage from "../../Components/Home/LandingPage";
import PremiumRestaurantMenu from "../../Components/User/Pages/premiumRestaurent";
import UserCart from "../../Components/User/Pages/cart";
import UserProfile from "../../Components/User/Pages/Profile";
import FoodDeliveryCheckout from "../../Components/User/Pages/Checkout";
import { UserAuthLayout } from "../../Components/AuthLayout/UserAuth";
import { GuestLayout } from "../../Components/AuthLayout/UserAuth";
import UserOrders from "../../Components/User/Pages/Orders";
import ChangePassword from "../../Components/User/Pages/ChangePassword";

const userRoutes = [
  //guest routes

  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { path: "user/signup", element: <HandleSignup /> },
      { path: "user/login", element: <Login /> },
      { path: "user/forgot_password", element: <ForgotPassword /> },
      { path: "user/reset-password/:token", element: <NewPassword /> },
      { path: "/", element: <LandingPage /> },
    ],
  },

  // protected routes

  {
    path: "/",
    element: <UserAuthLayout />,
    children: [
      { path: "user/home", element: <Home /> },
      { path: "user/restaurent_Details", element: <PremiumRestaurantMenu /> },
      { path: "user/cart", element: <UserCart /> },
      { path: "user/profile", element: <UserProfile /> },
      { path: "user/checkout", element: <FoodDeliveryCheckout /> },
      { path: "user/orders", element: <UserOrders /> },
      { path: "user/change_password", element: <ChangePassword /> },
    ],
  },
];

export default userRoutes;
