import Signup from "./Pages/Signup";
import Otp from "./Pages/Otp";
import { useState } from "react";

function HandleSignup() {
  const [userInfo, setUserInfo] = useState({ email: "", token: "" });

  const handleUserInfo = (info: { email: string; token: string }) => {
    setUserInfo(info);

    console.log("Email and token recieved in handle signup:", userInfo);
  };

  if (userInfo) {
    return (
      <>
        <Otp userEmail={userInfo.email} verificationToken={userInfo.token} />
      </>
    );
  } else {
    return (
      <>
        <Signup sendUserInfo={handleUserInfo} />
      </>
    );
  }
}

export default HandleSignup;
