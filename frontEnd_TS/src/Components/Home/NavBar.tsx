import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/Slice/userSlice";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../services/userServices/userServices";

interface NavBarProps {
  isAuthenticated: boolean;
  user: string;
}

function NavBar({ isAuthenticated, user }: NavBarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await userLogout();
    console.log(response)
    dispatch(logout());
    navigate("/user/login");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <>
      <nav className=" z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 z-1000">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/user/home"
              className="text-xl font-bold bg-gradient-to-r from-[#cb202d] to-[#e63946] bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
            >
              EliteEats
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              <Link
                to="/user/home"
                className="text-gray-700 hover:text-[#cb202d] hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group"
              >
                Home
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#cb202d] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </Link>
              <Link
                to="/menu"
                className="text-gray-700 hover:text-[#cb202d] hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group"
              >
                Browse Menu
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#cb202d] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </Link>
              <Link
                to="/restaurants"
                className="text-gray-700 hover:text-[#cb202d] hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group"
              >
                Restaurants
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#cb202d] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </Link>
              <Link
                to="/track-order"
                className="text-gray-700 hover:text-[#cb202d] hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group"
              >
                Track Order
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#cb202d] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </Link>
            </div>

            {/* User Profile or Login Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  onMouseEnter={() => setIsProfileDropdownOpen(true)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#cb202d] to-[#e63946] flex items-center justify-center text-white font-bold cursor-pointer">
                    {user?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="hidden md:inline text-gray-700 font-medium">
                    {user || "User"}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100 cursor-pointer"
                    onMouseLeave={() => setIsProfileDropdownOpen(false)}
                  >
                    <Link
                      to="/user/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-[#cb202d]"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/user/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-[#cb202d]"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      Your Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-[#cb202d]"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/user/login"
                className="w-25 bg-gradient-to-r from-[#cb202d] to-[#e63946] hover:from-[#a01a26] hover:to-[#cb202d] text-white font-bold text-center px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-[#cb202d] hover:bg-red-50 focus:outline-none transition-all duration-200"
            >
              <svg
                className={`h-6 w-6 transform transition-transform duration-200 ${
                  isMenuOpen ? "rotate-90" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="px-4 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md border-t border-gray-100">
              <Link
                to="/user/home"
                className="text-gray-700 hover:text-[#cb202d] hover:bg-red-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/menu"
                className="text-gray-700 hover:text-[#cb202d] hover:bg-red-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Menu
              </Link>
              <Link
                to="/restaurants"
                className="text-gray-700 hover:text-[#cb202d] hover:bg-red-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Restaurants
              </Link>
              <Link
                to="/track-order"
                className="text-gray-700 hover:text-[#cb202d] hover:bg-red-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Track Order
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/user/profile"
                    className="text-gray-700 hover:text-[#cb202d] hover:bg-red-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/user/orders"
                    className="text-gray-700 hover:text-[#cb202d] hover:bg-red-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Your Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-gray-700 hover:text-[#cb202d] hover:bg-red-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/user/login"
                  className="bg-gradient-to-r from-[#cb202d] to-[#e63946] hover:from-[#a01a26] hover:to-[#cb202d] text-white block px-4 py-3 rounded-lg text-base font-medium text-center transition-all duration-200 shadow-md mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
