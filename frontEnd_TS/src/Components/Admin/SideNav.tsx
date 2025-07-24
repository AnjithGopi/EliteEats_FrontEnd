import { NavLink } from "react-router-dom";
import { logout } from "../../services/adminServices/login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../redux/Slice/adminSlice";
function SideNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(adminLogout());
    const response = await logout();

    if (response) {
      navigate("/admin/login");
    }
  };

  return (
    <>
      <nav className="w-64 min-h-screen bg-[#F1ECEC] text-gray-800 p-4 flex flex-col border-r border-gray-200">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#00b074]">Admin Panel</h1>
          <p className="text-gray-600 text-sm">Welcome Admin</p>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-2 flex-1">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 ${
                  isActive ? "bg-gray-300 font-medium" : ""
                }`
              }
            >
              <svg
                className="w-5 h-5 mr-3  text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/customerlist"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 ${
                  isActive ? "bg-gray-300 font-medium" : ""
                }`
              }
            >
              <svg
                className="w-5 h-5 mr-3 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/restuarents"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 ${
                  isActive ? "bg-gray-300 font-medium" : ""
                }`
              }
            >
              <svg
                className="w-5 h-5 mr-3 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              Restaurants
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/deliveryPartners"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 ${
                  isActive ? "bg-gray-300 font-medium" : ""
                }`
              }
            >
              <svg
                className="w-5 h-5 mr-3 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              Delivery Partners
            </NavLink>
          </li>
        </ul>

        {/* Footer/User Profile */}
        <div className="mt-auto pt-4 border-t border-gray-300">
          <div className="flex items-center">
            <div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-5 py-2 rounded-lg cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default SideNav;
