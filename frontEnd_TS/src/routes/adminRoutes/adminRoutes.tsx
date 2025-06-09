import Login from "../../Components/Admin/Pages/Login";
import Dashboard from "../../Components/Admin/Pages/Dashboard";
import Customers from "../../Components/Admin/Pages/Customers";

const adminRoutes = [
  { path: "/admin/login", element: <Login /> },
  { path: "/admin/dashboard", element: <Dashboard /> },
  { path: "/admin/customerlist", element: <Customers /> },
  
];

export default adminRoutes;
