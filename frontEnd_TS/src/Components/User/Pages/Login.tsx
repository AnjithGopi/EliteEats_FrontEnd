import { useState } from "react";
import { API_BASE_URL } from "../../../Constants/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
} from "../../../utils/registrationValidation";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors({ ...errors, email: validateEmail(value) });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors({ ...errors, password: validatePassword(value) });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      axios
        .post(`${API_BASE_URL}/user/login`, {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response);
          console.log("Login success");
          navigate("/user/home");
        })
        .catch((error) => {
          console.log(error);
          console.log("Error in login");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-screen min-h-screen bg-gradient-to-br from-[#ffde59] via-[#ffd700] to-[#ffc800] flex items-center justify-center p-4">
        <div className="absolute top-0 left-0 bg-[#ffc700] h-64 w-64 rounded-br-full opacity-80"></div>
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md z-10 backdrop-blur-sm bg-opacity-90">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#cb202d] mb-2">
              User Login
            </h2>
            <p className="text-gray-600">Welcome back to our community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={handleEmail}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent placeholder-gray-400 transition-all"
                required
                autoComplete="username"
              />
              {errors.email && (
                <p className="text-red-500 text-sm text-center py-2">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
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
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm text-center py-2">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#cb202d] to-[#e53e3e] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[#cb202d] focus:ring-offset-2 shadow-md cursor-pointer"
            >
              Login
            </button>

            <div className="text-center pt-2">
              <a
                href="/user/forgot_password"
                className="text-xs text-gray-600 hover:text-[#cb202d] transition-colors"
              >
                Forgot password?
              </a>
            </div>
          </form>

          <div className="mt-6 text-center border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-600">
              New here?{" "}
              <a
                href="/user/signup"
                className="font-medium text-[#cb202d] hover:text-[#e53e3e] transition-colors duration-200"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 bg-[#ffc700] h-64 w-64 rounded-tl-full opacity-80"></div>
      </div>
    </>
  );
}

export default Login;
