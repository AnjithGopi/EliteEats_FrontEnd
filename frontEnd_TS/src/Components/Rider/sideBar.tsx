import { useState } from "react";
import { useSelector } from "react-redux";
import {
  HiHome,
  HiBriefcase,
  HiChartBar,
  HiCog,
  HiQuestionMarkCircle,
  HiLogout,
  HiStar,
  HiBell,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/store";
import { logout } from "../../services/riderServices/riderServices";
import { useDispatch } from "react-redux";
import { riderlogout } from "../../redux/Slice/riderSlice";

const DeliveryPartnerNavbar = () => {

  const dispatch=useDispatch()
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const deliveryPartnerName = useSelector(
    (state: RootState) => state.riderSlice.name
  );
  const partnerRating = 4.8;
  const completedDeliveries = 1247;

  const handleLogout = async () => {
    const response = await logout();
    console.log(response.success);
    if (response.success) {
      dispatch(riderlogout())
      navigate("/rider/login");
    }
  };

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: HiHome,
      path: "/delivery-partner/dashboard",
    },
    {
      id: "verify Profile",
      label: "Verify Profile",
      icon: HiCog,
      path: "/rider/verify_Profile",
    },
    {
      id: "deliveries",
      label: "My Deliveries",
      icon: HiBriefcase,
      path: "/delivery-partner/deliveries",
    },
    {
      id: "performance",
      label: "Performance",
      icon: HiChartBar,
      path: "/delivery-partner/performance",
    },
    {
      id: "settings",
      label: "Settings",
      icon: HiCog,
      path: "/delivery-partner/settings",
    },
    {
      id: "help",
      label: "Help Center",
      icon: HiQuestionMarkCircle,
      path: "/delivery-partner/help",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl w-72 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #cb202d 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #cb202d 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 p-6 border-b border-slate-700/50">
        {/* Logo and Name */}
        <div className="flex items-center mb-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#cb202d] to-[#a01825] flex items-center justify-center text-white font-bold text-lg shadow-lg">
              DP
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="font-semibold text-white text-lg">
              {deliveryPartnerName}
            </h3>
            <p className="text-slate-400 text-xs">Delivery Partner</p>
          </div>
          <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-all duration-200">
            <HiBell className="w-5 h-5 text-slate-400 hover:text-white" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/30">
            <div className="flex items-center">
              <HiStar className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-white font-semibold text-sm">
                {partnerRating}
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-1">Rating</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/30">
            <div className="text-white font-semibold text-sm">
              {completedDeliveries.toLocaleString()}
            </div>
            <p className="text-slate-400 text-xs mt-1">Completed</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-6 relative z-10">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full group relative flex items-center p-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] ${
                    isActive
                      ? "bg-gradient-to-r from-[#cb202d] to-[#a01825] text-white shadow-lg shadow-red-500/25"
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-white backdrop-blur-sm"
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                  )}

                  {/* Icon with glow effect for active */}
                  <div
                    className={`relative ${isActive ? "drop-shadow-lg" : ""}`}
                  >
                    <Icon
                      className={`w-6 h-6 transition-all duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-slate-400 group-hover:text-[#cb202d]"
                      }`}
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
                    )}
                  </div>

                  <span
                    className={`ml-4 font-medium transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-slate-300 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Hover indicator */}
                  {!isActive && (
                    <div className="absolute right-4 w-2 h-2 bg-[#cb202d] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-slate-700/50 relative z-10">
        <button
          onClick={handleLogout}
          className="w-full group flex items-center p-4 rounded-2xl text-slate-300 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-600/10 hover:text-red-400 transition-all duration-300 transform hover:scale-[1.02] border border-transparent hover:border-red-500/20"
        >
          <HiLogout className="w-6 h-6 text-slate-400 group-hover:text-red-400 transition-colors duration-300" />
          <span className="ml-4 font-medium">Logout</span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
          </div>
        </button>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default DeliveryPartnerNavbar;
