import Signup from "../Restaurent/Pages/Sigunp";
import { useState } from "react";
import Otp from "./Pages/otp";


function HandleSignup() {
  const [userinfo, setUserinfo] = useState({ email: "", token: "", image:"" });

  const handleRestaurentinfo = (info: {
    email: string;
    token: string;
    image:any;
  }) => {
    console.log("restaurent info :", info.email);
    console.log("token:", info.token);
    setUserinfo({ email: info.email, token: info.token, image: info.image });
  };

  if (userinfo.email != "" && userinfo.token != "") {
    return (
      <>
        <Otp
          userEmail={userinfo.email}
          verificationToken={userinfo.token}
          image={userinfo.image}
        />
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
