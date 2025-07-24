import {
  GuestLayout,
  RestuarentAuth,
} from "../../Components/AuthLayout/RestaurentAuth";
import Login from "../../Components/Restaurent/Pages/Login";
import Dashboard from "../../Components/Restaurent/Pages/dashboard";
import Menumanagement from "../../Components/Restaurent/Pages/menuManagement";
import OrderManagement from "../../Components/Restaurent/Pages/orderManagement";
import HandleSignup from "../../Components/Restaurent/handleSignup";

const RestaurentRoutes = [
  {
    //guest user  routes
    path: "/",
    element: <GuestLayout />,
    children: [
      { path: "restaurent/signup", element: <HandleSignup /> },
      { path: "restaurent/login", element: <Login /> },
    ],
  },

  // protected routes

  {
    path: "/",
    element: <RestuarentAuth />,
    children: [
      { path: "restaurent/dashboard", element: <Dashboard /> },
      { path: "restaurent/menu", element: <Menumanagement /> },
      { path: "restaurent/orders", element: <OrderManagement /> },
    ],
  },
];

export default RestaurentRoutes;
