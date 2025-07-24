import { useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
} from "../../../utils/registrationValidation";

import { useDispatch } from "react-redux";
import { newRider } from "../../../redux/Slice/riderSlice";
import { riderLogin } from "../../../services/riderServices/riderServices";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      //const response = await handleLogin({ email: email, password: password });
      const response =await riderLogin({email:email,password:password})

      alert("Login success");
      console.log(response);
      console.log("Name:", response.user.name);
      const data = {
        id: response.user._id,
        name: response.user.name,
        email: response.user.email,
        mobile: response.user.mobile,
        role: response.user.role,
      };
      console.log("Data:", data);

      dispatch(newRider(data));

      navigate("/rider/profile");
    } catch (error) {
      alert("Error in login ");
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
              Delivery Partner Login
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

            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={handlePassword}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent placeholder-gray-400 transition-all"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
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
                href="/rider/signup"
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
