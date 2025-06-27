import { useEffect } from "react";
import NavBar from "./NavBar";
import Body from "./body";
import SwipeCards from "./restaurentCards";
import { useState } from "react";
import PartnerRestaurent from "./PartnerRestaurent";
import Footer from "./footer";
import { getAllHotels } from "../../services/userServices/userServices";

function LandingPage() {
  const [hotels, setHotels] = useState([]);
  const getHotels = async () => {
    const response = await getAllHotels();
    setHotels(response);
  };

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <>
      <NavBar />
      <Body />

      <div className="relative mt-10 mb-8">
        <div className="absolute right-4 top-0">
          <button className="text-sm md:text-base font-semibold text-[#cb202d] hover:text-[#a51b24] mt-15 mr-10 transition duration-200 underline underline-offset-4 cursor-pointer">
            View More
          </button>
        </div>

        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#cb202d] mb-2">
            Popular <span className="text-[#ffd700]">Restaurants</span>
          </h1>
          <div className="w-24 h-1.5 bg-[#cb202d] mx-auto rounded-full"></div>
          <p className="mt-3 text-lg text-gray-600">
            Discover the most loved dining spots in town
          </p>
        </div>
      </div>

      <div className="mt-10">
        <SwipeCards hotels={hotels} />
      </div>

      <PartnerRestaurent />

      <Footer />
    </>
  );
}

export default LandingPage;
