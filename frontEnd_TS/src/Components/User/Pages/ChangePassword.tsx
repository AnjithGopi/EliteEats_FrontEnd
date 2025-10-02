import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import type { RootState } from "../../../redux/store";
import { changePasswordForUser } from "../../../services/userServices/userServices";

function ChangePassword() {
  const userId = useSelector((state: RootState) => state.user.id);
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });

    // Basic validation
    if (name === "newPassword" && value.length < 6) {
      setErrors({
        ...errors,
        newPassword: "Password must be at least 6 characters",
      });
    } else if (name === "confirmPassword" && value !== passwords.newPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Passwords do not match",
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    if (passwords.newPassword.length < 6) {
      Swal.fire("Error", "Password must be at least 6 characters", "error");
      return;
    }

    setIsLoading(true);

    try {
      const data = {
        ...passwords,
        userId: userId,
      };

      console.log("Data::::", data);

      const response = await changePasswordForUser(data);

      if (response.success) {
        console.log(response);
      

      Swal.fire({
        title: "Success!",
        text: "Your password has been changed successfully",
        icon: "success",
        customClass: {
          container: "premium-swal",
          popup: "border border-gray-200 rounded-xl",
          confirmButton:
            "bg-[#cb202d] hover:bg-blue-700 text-white px-6 py-2 rounded-lg",
        },
        buttonsStyling: false,
        confirmButtonText: "Continue",
      }).then(() => {
        navigate("/user/profile"); 
      });

    }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "Failed to change password. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-[#ffde59] via-[#ffd700] to-[#ffc800] flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 bg-[#ffc700] h-64 w-64 rounded-br-full opacity-80"></div>
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md z-10 backdrop-blur-sm bg-opacity-90">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#cb202d] mb-2">
            Change Password
          </h2>
          <p className="text-gray-600">
            Secure your account with a new password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder="Enter your current password"
              value={passwords.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent"
              required
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.currentPassword}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Enter new password (min 6 characters)"
              value={passwords.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent"
              required
              minLength={6}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              value={passwords.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent"
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#cb202d] to-[#e53e3e] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[#cb202d] focus:ring-offset-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Changing Password..." : "Change Password"}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-sm text-[#cb202d] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[#cb202d] focus:ring-offset-2 rounded px-2 py-1"
            >
              Back to Profile
            </button>
          </div>
        </form>
      </div>
      <div className="absolute bottom-0 right-0 bg-[#ffc700] h-64 w-64 rounded-tl-full opacity-80"></div>
    </div>
  );
}

export default ChangePassword;
