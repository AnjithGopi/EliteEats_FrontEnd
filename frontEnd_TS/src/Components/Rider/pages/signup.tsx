import { useState } from "react";
import { API_BASE_URL } from "../../../Constants/api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  validateEmail,
  validateFirstname,
  validateLastname,
  validateMobile,
  validatePassword,
  validateConfirmPassword,
} from "../../../utils/registrationValidation";
import { register } from "../../../redux/Slice/riderSlice";



function Signup() {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirm] = useState("");
  const [token, setToken] = useState(null);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    confirmPass: "",
  });

  const handleFirstname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    setErrors({ ...errors, firstname: validateFirstname(value) });
  };

  const handleLastname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    setErrors({ ...errors, lastname: validateLastname(value) });
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors({ ...errors, email: validateEmail(value) });
  };

  const handleMobile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMobile(value);
    setErrors({ ...errors, mobile: validateMobile(value) });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors({ ...errors, password: validatePassword(value) });
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirm(value);
    setErrors({
      ...errors,
      confirmPass: validateConfirmPassword(password, value),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`${API_BASE_URL}/rider/signup`, {
        email: email,
        name: firstName + " " + lastName,
        mobile: mobile,
        password: password,
      })
      .then((response) => {
        console.log(response.data);

        const verificationToken = response.data.verificationToken;
        setToken(verificationToken);

        dispatch(register({
          email:email,
          token:verificationToken
        }))

        navigate("/rider/otp")
        
      })
      .catch((error) => {
        console.log("Error in getting response:", error);
      });

    if (token) {
      console.log(token);
    }
  };

  return (
    <>
      <div className="w-screen min-h-screen bg-gradient-to-br from-[#ffde59] via-[#ffd700] to-[#ffc800] flex items-center justify-center p-4">
        <div className="absolute top-0 left-0 bg-[#ffc700] h-64 w-64 rounded-br-full opacity-80"></div>
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md z-10 backdrop-blur-sm bg-opacity-90">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#cb202d] mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">Join our community today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={handleFirstname}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent placeholder-gray-400 transition-all"
                  required
                />
                {errors.firstname && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstname}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={handleLastname}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent placeholder-gray-400 transition-all"
                  required
                />
                {errors.lastname && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="text"
                placeholder="your@email.com"
                value={email}
                onChange={handleEmail}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent placeholder-gray-400 transition-all"
                required
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                placeholder="+1 (123) 456-7890"
                value={mobile}
                onChange={handleMobile}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent placeholder-gray-400 transition-all"
                required
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={handlePassword}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent placeholder-gray-400 transition-all"
                required
                minLength={8}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"} // Toggle between text/password
                placeholder="••••••••"
                value={confirmPass}
                onChange={handleConfirmPassword}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent placeholder-gray-400 transition-all"
                required
                minLength={8}
              />
              {/* Toggle button (eye icon) */}
              <button
                type="button"
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  // Eye-slash icon (visible state)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  // Eye icon (hidden state)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
              {errors.confirmPass && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPass}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#cb202d] to-[#e53e3e] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[#cb202d] focus:ring-offset-2 shadow-md"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/rider/login"
                className="font-medium text-[#cb202d] hover:text-[#e53e3e] transition-colors duration-200"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 bg-[#ffc700] h-64 w-64 rounded-tl-full opacity-80"></div>
      </div>
    </>
  );
}

export default Signup;
