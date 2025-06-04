import { useState } from "react";
import { validateOtp } from "../../../utils/registrationValidation";
import axios from "axios";
import { API_BASE_URL } from "../../../Constants/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface OtpProps {
  userEmail: string;
  verificationToken: string;
}

function Otp({ userEmail, verificationToken }: OtpProps) {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  //const [token, setToken] = useState("");
  const [email, setEmail] = useState("Email Not Found");
  const [otperror, setOtperror] = useState({
    otp: "",
  });

  const handleOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtp(value);
    setOtperror({
      ...otperror,
      otp: validateOtp(value),
    });
  };

  const otpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail(userEmail);
   // setToken(verificationToken);
    try {
      axios
        .post(`${API_BASE_URL}/user/verify_otp`, {
          otp: otp,
          token:verificationToken,
        })
        .then((response) => {
          console.log(response);
          //alert("User Registration successfull");
          Swal.fire("Registration Success")
          navigate("/user/login");
        })
        .catch((error) => {
          console.log(error);
         // alert("Error in User Registration ");
          Swal.fire("Something went Wrong")
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
              Verify Your Account
            </h2>
            <p className="text-gray-600">We've sent a verification code to</p>
            <p className="font-medium text-gray-800 mt-1">{email}</p>
          </div>

          <form onSubmit={otpSubmit} className="space-y-6">
            <div className="flex justify-center">
              <div className="w-full max-w-xs">
                <label htmlFor="otp" className="sr-only">
                  OTP Verification Code
                </label>
                <div className="relative">
                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="• • • • "
                    value={otp}
                    onChange={handleOtp}
                    className="w-full px-4 py-3 text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent text-center tracking-[1rem] placeholder-gray-300"
                    maxLength={6}
                    autoFocus
                  />
                  {otperror.otp && (
                    <p className="text-red-500 text-xs mt-1">{otperror.otp}</p>
                  )}
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <span className="text-gray-400 text-xl"></span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Enter the 4-digit code sent to your email
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#cb202d] to-[#e53e3e] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[#cb202d] focus:ring-offset-2 shadow-md"
            >
              Verify & Continue
            </button>

            <div className="text-center text-sm text-gray-600">
              Didn't receive code?{" "}
              <button
                type="button"
                className="text-[#cb202d] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[#cb202d] focus:ring-offset-2 rounded px-2 py-1"
                // disabled={resendDisabled}
              >
                {/* {resendDisabled ? `Resend in ${countdown}s` : 'Resend Now'} */}
              </button>
            </div>
          </form>
        </div>
        <div className="absolute bottom-0 right-0 bg-[#ffc700] h-64 w-64 rounded-tl-full opacity-80"></div>
      </div>
    </>
  );
}

export default Otp;
