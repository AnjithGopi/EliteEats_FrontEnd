import HandleSignup from "../../Components/User/HandleSignup";
import Login from "../../Components/User/Pages/Login";
import Home from "../../Components/Home/Home";
import ForgotPassword from "../../Components/User/Pages/ForgotPassword";
import NewPassword from "../../Components/User/Pages/NewPassword";
import LandingPage from "../../Components/Home/LandingPage";
import PremiumRestaurantMenu from "../../Components/User/Pages/premiumRestaurent";
import UserCart from "../../Components/User/Pages/cart";


const userRoutes = [
  { path: "/user/signup", element: <HandleSignup /> },
  { path: "/user/login", element: <Login /> },
  { path: "/user/home", element: <Home /> },
  { path: "/user/forgot_password", element: <ForgotPassword /> },
  { path: "/user/reset-password/:token", element: <NewPassword /> },
  { path: "/", element: <LandingPage /> },
  {path:"/user/restaurent_Details",element:<PremiumRestaurantMenu/>},
  {path:"/user/cart",element:<UserCart/>}
  
  
];

export default userRoutes;
