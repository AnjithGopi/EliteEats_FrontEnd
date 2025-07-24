import React, { useState } from "react";
import {
  User,
  Package,
  Heart,
  Wallet,
  LogOut,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import NavBar from "../../Home/NavBar";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { updateUserAddress } from "../../../services/userServices/userServices";
import { useNavigate } from "react-router-dom";

interface UserProfileProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = () => {

  const navigate=useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.user.name);
  const userEmail = useSelector((state: RootState) => state.user.email);
  const userId = useSelector((state: RootState) => state.user.id);
  const [formData, setFormData] = useState({
    state: "",
    city: "",
    zipcode: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async (userId: string) => {
    const data = { ...formData, id: userId };
    console.log("Saving changes:", formData);

    const response = await updateUserAddress(data);
    if (response) {
      alert(response.message);
      navigate("/user/home")
    } else {
      alert("something went wrong");
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const SidebarContent = () => (
    <>
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-[#cb202d] to-[#a01825] p-6 sm:p-8 text-white">
        <div className="text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4 flex items-center justify-center border border-white/30">
            <User size={32} className="text-white sm:w-10 sm:h-10" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-1">
            {user || "User"}
          </h3>
          <p className="text-red-100 text-sm">
            {userEmail || "user@example.com"}
          </p>
          <button className="mt-3 text-sm text-white/90 hover:text-white border border-white/30 hover:border-white/50 px-4 py-1.5 rounded-full transition-all duration-200">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 sm:p-6 space-y-2">
        <button className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 bg-red-50 text-[#cb202d] rounded-xl hover:bg-red-100 transition-all duration-200 font-medium border border-red-100">
          <User size={18} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Account Details</span>
        </button>
        <button className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 text-gray-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium">
          <Package size={18} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">My Orders</span>
        </button>
        <button className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 text-gray-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium">
          <Heart size={18} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">My Wishlist</span>
        </button>
        <button className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 text-gray-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium">
          <Wallet size={18} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Wallet</span>
        </button>
      </nav>

      {/* Logout Button */}
      <div className="p-4 sm:p-6 pt-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-4 sm:px-5 py-3 sm:py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 font-medium"
        >
          <LogOut size={18} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar isAuthenticated={isAuthenticated} user={user} />
      </div>

      <div className="pt-20">
        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-24 left-4 z-40">
          <button
            onClick={toggleSidebar}
            className="bg-white p-3 rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30 pt-20"
            onClick={toggleSidebar}
          />
        )}

        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="flex gap-4 sm:gap-6 lg:gap-8 relative">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-28 h-fit">
              <SidebarContent />
            </div>

            {/* Mobile Sidebar */}
            <div
              className={`lg:hidden fixed left-0 top-20 h-screen w-80 max-w-[85vw] bg-white rounded-r-2xl shadow-xl border border-gray-100 overflow-hidden z-40 transform transition-transform duration-300 ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <SidebarContent />
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full lg:w-auto">
              {/* Welcome Section */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Welcome <span className="text-[#cb202d]">{user}</span>
                  </h2>
                  <div className="w-2 h-6 sm:h-8 bg-gradient-to-b from-[#cb202d] to-[#a01825] rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      <MapPin className="inline w-4 h-4 mr-2" />
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#cb202d] focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white resize-none text-sm sm:text-base"
                      placeholder="Enter your address"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#cb202d] focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white text-sm sm:text-base"
                      placeholder="Enter your state"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#cb202d] focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white text-sm sm:text-base"
                      placeholder="Enter your city"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={handleInputChange}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#cb202d] focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white text-sm sm:text-base"
                      placeholder="Enter your zip code"
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleSaveChanges(userId)}
                  className="mt-6 sm:mt-8 bg-gradient-to-r from-[#cb202d] to-[#a01825] hover:from-[#a01825] hover:to-[#8b1520] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
                >
                  Save Changes
                </button>
              </div>

              {/* Newsletter & Footer Section */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
