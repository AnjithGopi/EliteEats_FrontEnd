import Signup from "../Restaurent/Pages/Sigunp";
import { useState } from "react";
import Otp from "./Pages/otp";

function HandleSignup() {
  const [userinfo, setUserinfo] = useState({ email: "", token: "" });

  const handleRestaurentinfo = (info: { email: string; token: string }) => {
    console.log("restaurent info :",info.email)
    console.log("token:",info.token)
    setUserinfo({email:info.email,token:info.token});
    
  };

  

  if (userinfo.email != "" && userinfo.token != "") {
    return (
      <>
        <Otp userEmail={userinfo.email} verificationToken={userinfo.token} />
      </>
    );
  } else {
    return (
      <>
        <Signup sendRestaurentInfo={handleRestaurentinfo} />
      </>
    );
  }
}

export default HandleSignup;
