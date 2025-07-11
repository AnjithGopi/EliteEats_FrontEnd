import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed,
  Plus,
  Star,
  BarChart3,
  LogOut,
  ChevronDown,
  Settings,
  Bell,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/Slice/restaurentSlice";
import { useNavigate } from "react-router-dom";
import { restaurentLogout } from "../../services/restaurentServices/registration";
function Sidebar() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [activeItem, setActiveItem] = useState("dashboard");

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/restaurent/dashboard",
      badge: null,
    },
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingCart,
      href: "/restaurent/orders",
      badge: "12",
    },
    {
      id: "menu",
      label: "Menu",
      icon: UtensilsCrossed,
      href: "/restaurent/menu",
      badge: null,
    },
    {
      id: "add-items",
      label: "Add Items",
      icon: Plus,
      href: "#",
      badge: null,
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: Star,
      href: "#",
      badge: "5",
    },
    {
      id: "reports",
      label: "Reports",
      icon: BarChart3,
      href: "#",
      badge: null,
    },
  ];

  const handleLogout = async () => {
    const response = await restaurentLogout();

    if (response) {
      console.log(response);
      dispatch(logout());
      navigate("/restaurent/signup")
    } else {
      alert("Something went wrong ! ");
    }
  };

  return (
    <div className="h-full hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl border-r border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between h-20 px-6 bg-gradient-to-r from-red-600 to-red-700 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <UtensilsCrossed className="text-red-600" size={24} />
            </div>
            <div>
              <span className="text-xl font-bold">Restaurent</span>
              <p className="text-xs text-red-100 opacity-90">Dashboard</p>
            </div>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200">
            <Bell size={20} className="text-white" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col flex-grow px-4 py-6 overflow-y-auto">
          <nav className="flex-1 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveItem(item.id)}
                  className={`group relative flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg transform scale-105"
                      : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                        isActive
                          ? "bg-white/20"
                          : "bg-gray-700 group-hover:bg-gray-600"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded-full ${
                        isActive
                          ? "bg-white text-red-600"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {isActive && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Settings Section */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <a
              href="#"
              className="flex items-center px-4 py-3 text-sm font-semibold text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 rounded-xl transition-all duration-300 group"
            >
              <div className="p-2 rounded-lg mr-3 bg-gray-700 group-hover:bg-gray-600 transition-all duration-300">
                <Settings size={18} />
              </div>
              <span>Settings</span>
            </a>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-700 bg-gradient-to-r from-gray-800 to-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  className="w-12 h-12 rounded-xl object-cover shadow-lg"
                  src="https://randomuser.me/api/portraits/women/11.jpg"
                  alt="User"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-800 rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Sarah Johnson</p>
                <p className="text-xs text-gray-300">Restaurant Admin</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors duration-200">
              <ChevronDown size={16} className="text-gray-300" />
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-300 group"
          >
            <LogOut size={16} className="mr-2" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
