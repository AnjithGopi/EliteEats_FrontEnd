import { useEffect, useState } from "react";
import { verifyOtp } from "../../../services/restaurentServices/registration";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface OtpProps {
  userEmail: string;
  verificationToken: string;
}

function Otp({ userEmail, verificationToken }: OtpProps) {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [restemail, setRestemail] = useState("email not found");

  useEffect(() => {
    setRestemail(userEmail);
  }, []);

  const handleOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setOtp(e.target.value);
  };

  //   const otpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     console.log("otp submitted");
  //     const response = await verifyOtp({ otp: otp, token: verificationToken });
  //     console.log(response.data);
  //     if (response.data) {
  //       Swal.fire(response.message);
  //     }
  //   };

  const otpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Show loading state
    Swal.fire({
      title: "Verifying OTP",
      html: "Please wait while we verify your code",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    console.log("otp submitted");

    try {


      const response = await verifyOtp({ otp: otp, token: verificationToken });
      Swal.close();

      console.log("after verification:", response.message);

      if (response.data) {
        // Success notification
        Swal.fire({
          title: "Success!",
          text: response.message,
          icon: "success",
          showClass: {
            popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                    `,
          },
          hideClass: {
            popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                    `,
          },
          customClass: {
            container: "premium-swal-container",
            popup: "premium-swal-popup",
            title: "premium-swal-title",
            icon: "premium-swal-icon",
            confirmButton: "premium-swal-confirm-btn",
          },
          background: "#1a1a2e",
          color: "#ffffff",
          confirmButtonColor: "#0d6efd",
          confirmButtonText: "Continue",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: true,
        });
        navigate("/restaurent/login");
      }
    } catch (error) {
      console.log(error);
      // Error notification
      Swal.fire({
        title: "Error!",
        text: "Failed to verify OTP. Please try again.",
        icon: "error",
        showClass: {
          popup: `
                    animate__animated
                    animate__headShake
                `,
        },
        customClass: {
          confirmButton: "premium-swal-error-btn",
        },
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Try Again",
      });
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
            <p className="font-medium text-gray-800 mt-1">{restemail}</p>
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
                  {/* {otperror.otp && (
                    <p className="text-red-500 text-xs mt-1">{otperror.otp}</p>
                  )} */}
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
