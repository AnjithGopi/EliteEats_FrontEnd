import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  validatePassword,
  validateConfirmPassword,
} from "../../../utils/registrationValidation";
import { API_BASE_URL } from "../../../Constants/api";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmpass] = useState("");
  const [errors, setErrors] = useState({
    password: "",
    confirmPass: "",
  });
  const { token } = useParams();

  const navigate=useNavigate()

  console.log(token);

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors({ ...errors, password: validatePassword(value) });
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmpass(value);
    setErrors({
      ...errors,
      confirmPass: validateConfirmPassword(password, value),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`${API_BASE_URL}/user/reset-password/${token}`, {
        password: password,
        confirmPassword: confirmPass,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          // Swal.fire(response.data.message)
          Swal.fire({
            title: "Success!",
            text: response.data.message,
            icon: "success",
            width: "450px",
            backdrop: `
      rgba(0,0,0,0.7)
      url("/images/confetti.gif")
      center top
      no-repeat
    `,
            showClass: {
              popup: `
        animate__animated
        animate__fadeInDown
        animate__faster
      `,
            },
            hideClass: {
              popup: `
        animate__animated
        animate__fadeOutUp
        animate__faster
      `,
            },
            customClass: {
              container: "premium-swal",
              popup: "rounded-xl shadow-2xl border border-gold-200",
              title: "text-2xl font-bold text-emerald-600",
              confirmButton: `
        bg-gradient-to-r from-emerald-500 to-teal-600
        hover:from-emerald-600 hover:to-teal-700
        text-white font-medium py-2 px-6 rounded-lg
        shadow-md transition-all duration-200
      `,
              icon: "border-4 border-emerald-100",
            },
            buttonsStyling: false,
            timer: 3000,
            timerProgressBar: true,
            confirmButtonText: "Continue",
            showConfirmButton: true,
          });
        }
      });

      navigate("/user/login")
  };
  return (
    <>
      <div className="w-screen min-h-screen bg-gradient-to-br from-[#ffde59] via-[#ffd700] to-[#ffc800] flex items-center justify-center p-4">
        <div className="absolute top-0 left-0 bg-[#ffc700] h-64 w-64 rounded-br-full opacity-80"></div>
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md z-10 backdrop-blur-sm bg-opacity-90">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#cb202d] mb-2">
              Create New Password
            </h2>
            <p className="text-gray-600">Enter and confirm your new password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="sr-only">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={handlePassword}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent placeholder-gray-400 transition-all"
                required
                minLength={8}
                autoComplete="new-password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm text-center py-2">
                  {errors.password}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Minimum 8 characters with uppercase, lowercase, number, and
                special character
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPass}
                onChange={handleConfirmPassword}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent placeholder-gray-400 transition-all"
                required
                minLength={8}
                autoComplete="new-password"
              />
              {errors.confirmPass && (
                <p className="text-red-500 text-sm text-center py-2">
                  {errors.confirmPass}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#cb202d] to-[#e53e3e] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[#cb202d] focus:ring-offset-2 shadow-md cursor-pointer"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6 text-center border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-600">
              Need to start over?{" "}
              <a
                href="/user/forgot_password"
                className="font-medium text-[#cb202d] hover:text-[#e53e3e] transition-colors duration-200"
              >
                Request new link
              </a>
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 bg-[#ffc700] h-64 w-64 rounded-tl-full opacity-80"></div>
      </div>
    </>
  );
}

export default NewPassword;
