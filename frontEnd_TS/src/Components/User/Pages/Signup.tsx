import { useState } from "react";
import { API_BASE_URL } from "../../../Constants/api";
import axios from "axios";

import {
  validateEmail,
  validateFirstname,
  validateLastname,
  validateMobile,
  validatePassword,
  validateConfirmPassword,
} from "../../../utils/registrationValidation";

type SignupProps = {
  sendUserInfo: (info: { email: string; token: string }) => void;
};

function Signup({sendUserInfo}:SignupProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirm] = useState("");
  const [token, setToken] = useState(null);

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
      .post(`${API_BASE_URL}/user/signup`, {
        email: email,
        name: firstName + " " + lastName,
        mobile: mobile,
        password: password,
      })
      .then((response) => {
        console.log(response.data);

        const verificationToken=response.data.verificationToken
        setToken(verificationToken);
        sendUserInfo({email,token:verificationToken})
      })
      .catch((error) => {
        console.log("Error in getting response:", error);
      });


      if(token){
        console.log(token)
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              />
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
                href="/user/login"
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
