import Signup from "./Pages/Signup";
import Otp from "./Pages/Otp";
import { useState } from "react";

function HandleSignup() {
  const [userInfo, setUserInfo] = useState({ email: "", token: "" });

  const handleUserInfo = (info: { email: string; token: string }) => {
    console.log(info);
    setUserInfo({email:info.email,token:info.token});

   
  };

  if (userInfo.email != "" && userInfo.token != "") {
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
