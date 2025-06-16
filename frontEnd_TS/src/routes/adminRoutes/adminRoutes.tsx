import Login from "../../Components/Admin/Pages/Login";
import Dashboard from "../../Components/Admin/Pages/Dashboard";
import Customers from "../../Components/Admin/Pages/Customers";
import Restaurents from "../../Components/Admin/Pages/restaurents";

const adminRoutes = [
  { path: "/admin/login", element: <Login /> },
  { path: "/admin/dashboard", element: <Dashboard /> },
  { path: "/admin/customerlist", element: <Customers /> },
  { path: "/admin/restuarents", element: <Restaurents /> },
];

export default adminRoutes;
