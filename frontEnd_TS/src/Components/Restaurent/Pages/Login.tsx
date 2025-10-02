import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyLogin } from "../../../services/restaurentServices/registration";
import { useDispatch } from "react-redux";
import { newRestaurent } from "../../../redux/Slice/restaurentSlice";

function RestaurantLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await verifyLogin(formData);
      if (response.message && !response.adminVerified) {
        alert(response.message);
        window.location.reload();
      } else {
        dispatch(newRestaurent(response));
        navigate("/restaurent/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-[#ffde59] via-[#ffd700] to-[#ffc800] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#ffc700] rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#cb202d] rounded-full opacity-20 transform translate-x-1/2 translate-y-1/2"></div>

      <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-10 relative z-10 transform hover:scale-[1.02] transition-transform duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#cb202d] tracking-tight">
            Welcome Back
          </h2>
          <p className="text-gray-600 mt-2 text-base sm:text-lg font-light">
            Sign in to manage your restaurant
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Business Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="restaurant@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#ffd700]/50 focus:border-[#cb202d] placeholder-gray-400 text-gray-800 transition-all duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#ffd700]/50 focus:border-[#cb202d] placeholder-gray-400 text-gray-800 transition-all duration-300"
            />
            <div className="flex justify-end mt-2">
              <a
                href="/restaurant/forgot-password"
                className="text-xs text-[#cb202d] hover:text-[#e53e3e] transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#cb202d] to-[#e53e3e] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[#cb202d] focus:ring-offset-2 shadow-md cursor-pointer"
          >
            Login
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 font-light">
            Don't have an account?{" "}
            <a
              href="/restaurent/signup"
              className="font-semibold text-[#cb202d] hover:text-[#e53e3e] transition-colors duration-200"
            >
              Register your restaurant
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RestaurantLogin;
