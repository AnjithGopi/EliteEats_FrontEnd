import Login from "../../Components/Admin/Pages/Login";
import Dashboard from "../../Components/Admin/Pages/Dashboard";
import Customers from "../../Components/Admin/Pages/Customers";
import Restaurents from "../../Components/Admin/Pages/restaurents";
import Riders from "../../Components/Admin/Pages/riders";
import { AdminAuth, GuestLayout } from "../../Components/AuthLayout/AdminAuth";

const adminRoutes = [
  //guest layout

  {
    path: "/",
    element: <GuestLayout />,
    children: [{ path: "admin/login", element: <Login /> }],
  },

  //protected routes

  {
    path: "/",
    element: <AdminAuth />,
    children: [
      { path: "admin/dashboard", element: <Dashboard /> },
      { path: "admin/customerlist", element: <Customers /> },
      { path: "admin/restuarents", element: <Restaurents /> },
      { path: "admin/deliveryPartners", element: <Riders /> },
    ],
  },
];

export default adminRoutes;
