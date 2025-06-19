import { useEffect } from "react";
import NavBar from "./NavBar";
import Body from "./body";
import SwipeCards from "./restaurentCards";
import { userApiRequest } from "../../utils/Api_helper/userApihelper";
import { useState } from "react";

function LandingPage() {

  const [hotels,setHotels]=useState([])
  const getHotels =  async() => {
    const response = await userApiRequest("/user/restaurents", "GET");
    console.log(response);
    setHotels(response)
  };

  useEffect(() => {
    console.log("landing page rendered");

    getHotels();
  }, []);

  return (
    <>
      <NavBar />
      <Body />
      <div className="mt-10 mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#cb202d] mb-2">
          Popular <span className="text-[#ffd700]">Restaurants</span>
        </h1>
        <div className="w-24 h-1.5 bg-[#cb202d] mx-auto rounded-full"></div>
        <p className="mt-3 text-lg text-gray-600">
          Discover the most loved dining spots in town
        </p>
      </div>
      <div className="mt-10">
        <SwipeCards hotels={hotels} />
      </div>
    </>
  );
}

export default LandingPage;
