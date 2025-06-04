import { useState } from "react";
import { validateEmail } from "../../../utils/registrationValidation";
import axios from "axios";
import { API_BASE_URL } from "../../../Constants/api";
import NewPassword from "./NewPassword";
import Swal from "sweetalert2";

function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
  });

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors({ ...errors, email: validateEmail(value) });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`${API_BASE_URL}/user/forgot_password`, {
        email: email,
      })
      .then((response) => {
        console.log(response.data);
        //alert(response.data.user.message);
        //Swal.fire(response.data.user.message)
        Swal.fire({
          title: '<span class="text-emerald-600">Email Sent!</span>',
          html: `
    <div class="text-center">
      <svg class="w-16 h-16 mx-auto text-emerald-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
      <p class="mt-4 text-lg">${response.data.user.message}</p>
      <p class="mt-2 text-sm text-gray-500">Please check your inbox and spam folder</p>
    </div>
  `,
          width: "500px",
          backdrop: `
    rgba(0,0,123,0.4)
    url("/images/email-icon-bg.png")
    center center
    no-repeat
  `,
          background: "white",
          showClass: {
            popup: "animate__animated animate__fadeInDown animate__faster",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp animate__faster",
          },
          customClass: {
            container: "premium-swal",
            popup: "rounded-xl shadow-xl border border-blue-100",
            title: "text-3xl font-bold",
            htmlContainer: "pt-0",
            confirmButton: `
      bg-gradient-to-r from-blue-500 to-indigo-600
      hover:from-blue-600 hover:to-indigo-700
      text-white font-medium py-3 px-8 rounded-lg
      shadow-lg transition-all duration-300 transform hover:scale-105
      focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75
    `,
          },
          buttonsStyling: false,
          showConfirmButton: true,
          confirmButtonText: "Got it!",
          timer: 5000,
          timerProgressBar: true,
          didOpen: () => {
            // Add any additional animations
            const timer = Swal.getTimerLeft();
            if (timer) {
              Swal.showLoading();
            }
            setSubmitted(true);
          },
        });
      });
  };

  if (submitted) {
    return (
      <>
        <NewPassword />
      </>
    );
  }

  return (
    <>
      <div className="w-screen min-h-screen bg-gradient-to-br from-[#ffde59] via-[#ffd700] to-[#ffc800] flex items-center justify-center p-4">
        <div className="absolute top-0 left-0 bg-[#ffc700] h-64 w-64 rounded-br-full opacity-80"></div>
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md z-10 backdrop-blur-sm bg-opacity-90">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#cb202d] mb-2">
              Reset Password
            </h2>
            <p className="text-gray-600">
              Enter your email to receive a reset link
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
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
                autoComplete="email"
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm text-center py-2">
                {errors.email}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#cb202d] to-[#e53e3e] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[#cb202d] focus:ring-offset-2 shadow-md"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-6 text-center border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
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

export default ForgotPassword;
