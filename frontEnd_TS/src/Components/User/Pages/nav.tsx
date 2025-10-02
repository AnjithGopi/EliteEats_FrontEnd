import { User, Heart, Package, Wallet } from "lucide-react";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../../redux/store";
// import { getOrders } from "../../../services/userServices/userServices";
import { useNavigate } from "react-router-dom";
// import { setOrders } from "../../../redux/Slice/userSlice";
// import { useDispatch } from "react-redux";

function Nav() {
 // const userId = useSelector((state: RootState) => state.user.id);
  const navigate = useNavigate();
 // const dispatch = useDispatch();

  const getUserOrders = async () => {
   // const response = await getOrders(userId);

    // if (response.success) {
    //   console.log("Response of orders from backend:>>>><<<<<<",response)
    //   console.log("Second one::::",response.orders);
    //   dispatch(setOrders(response.orders));

      navigate("/user/orders");
    // } else {
    //   console.log(response.message);
    // }
  };
  return (
    <div>
      <nav className="p-4 sm:p-6 space-y-2">
        <button className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 bg-red-50 text-[#cb202d] rounded-xl hover:bg-red-100 transition-all duration-200 font-medium border border-red-100">
          <User size={18} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Address</span>
        </button>
        <button
          onClick={getUserOrders}
          className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 text-gray-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
        >
          <Package size={18} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">My Orders</span>
        </button>
        <button className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 text-gray-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium">
          <Heart size={18} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">My Wishlist</span>
        </button>
        <button className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 text-gray-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium">
          <Wallet size={18} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Wallet</span>
        </button>
      </nav>
    </div>
  );
}

export default Nav;
