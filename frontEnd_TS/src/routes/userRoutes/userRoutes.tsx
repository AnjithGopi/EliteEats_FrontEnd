import HandleSignup from "../../Components/User/HandleSignup";
import Login from "../../Components/User/Pages/Login";
import Home from "../../Components/Home/Home";
import ForgotPassword from "../../Components/User/Pages/ForgotPassword";
import NewPassword from "../../Components/User/Pages/NewPassword";

const userRoutes = [
  { path: "/user/signup", element: <HandleSignup /> },
  { path: "/user/login", element: <Login /> },
  { path: "/user/home", element: <Home /> },
  { path: "/user/forgot_password", element: <ForgotPassword /> },
  { path: "/user/reset-password/:token", element: <NewPassword /> },
];

export default userRoutes;
