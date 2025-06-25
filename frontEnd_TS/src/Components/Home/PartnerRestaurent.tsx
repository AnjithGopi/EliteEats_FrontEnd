import { useNavigate } from "react-router-dom";

function PartnerRestaurent() {
  const navigate = useNavigate();

  const deliverySignup = () => {
    navigate("/rider/signup")
  };

  const restaurentSignup = () => {
    navigate("/restaurent/signup");
  };
  return (
    <div className="flex w-full h-full">
      <div className="w-1/2 h-full ml-3 mr-1 relative">
        <img
          src="/chef.jpg"
          alt="Left Side"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-0"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-end text-white p-6 z-10">
          <h2 className="text-3xl font-extrabold mb-4 text-center">
            Are you a Restaurant Owner?
          </h2>
          <p className="text-lg text-center mb-6">
            Join us and grow your business
          </p>
          <button
            onClick={restaurentSignup}
            className="bg-[#cb202d] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#cb204d] transition cursor-pointer"
          >
            Partner with Us
          </button>
        </div>
      </div>

      {/* right side */}

      <div className="w-1/2 h-full mr-3 ml-1 relative">
        <img
          src="/delivery_boy.jpg"
          alt="Right Side"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-0"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-end text-white p-6 z-10">
          <h2 className="text-3xl font-extrabold mb-4 text-center">
            Want to Deliver with Us?
          </h2>
          <p className="text-lg text-center mb-6">
            Become a delivery partner today
          </p>
          <button
            onClick={deliverySignup}
            className="bg-[#cb202d] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#cb204d] transition cursor-pointer"
          >
            Join as Delivery Partner
          </button>
        </div>
      </div>
    </div>
  );
}

export default PartnerRestaurent;
