import type { RootState } from "../../redux/store";
import NavBar from "./NavBar";
import Body from "./body";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import SwipeCards from "./restaurentCards";
import Footer from "./footer";
function Home() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.user.name);

  const hotels = useSelector(
    (state: RootState) => state.restaurentSlice.hotels
  );

  useEffect(() => {
    console.log("User loged in :", user);
  }, [user]);

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} user={user} />
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


      <Footer />
    </>
  );
}

export default Home;
