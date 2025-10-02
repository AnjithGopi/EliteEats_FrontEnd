// import { useEffect, useState } from "react";
// import {
//   User,
//   Package,
//   Heart,
//   Wallet,
//   LogOut,
//   MapPin,
//   Menu,
//   X,
//   CreditCard,
//   Calendar,
//   IndianRupee,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState } from "../../../redux/store";
// import NavBar from "../../Home/NavBar";
// import Nav from "./nav";
// import ProfileSideheader from "./profileSideheader";
// import { getOrders } from "../../../services/userServices/userServices";
// import { setOrders } from "../../../redux/Slice/userSlice";

// const UserOrders = () => {
//   const dispatch = useDispatch();

//   const userId = useSelector((state: RootState) => state.user.id);

//   const getUserOrders = async () => {
//     try {
//       const orderResponse = await await getOrders(userId);
//       console.log(orderResponse);
//       if (orderResponse.success) {
//         dispatch(setOrders(orderResponse.orders));
//       } else {
//         alert("No orders found");
//       }
//     } catch (error) {
//       alert("Something went wrong !")
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getUserOrders();
//   },[]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [expandedOrders, setExpandedOrders] = useState({});

//   const user = useSelector((state: RootState) => state.user.name);
//   const userEmail = useSelector((state: RootState) => state.user.email);

//   const orders = useSelector((state: RootState) => state.user.orders);
//   const isAuthenticated = useSelector(
//     (state: RootState) => state.user.isAuthenticated
//   );

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const toggleOrderDetails = (orderId) => {
//     setExpandedOrders((prev) => ({
//       ...prev,
//       [orderId]: !prev[orderId],
//     }));
//   };

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case "order placed":
//         return "text-blue-600 bg-blue-50 border-blue-200";
//       case "preparing":
//         return "text-orange-600 bg-orange-50 border-orange-200";
//       case "out for delivery":
//         return "text-purple-600 bg-purple-50 border-purple-200";
//       case "delivered":
//         return "text-green-600 bg-green-50 border-green-200";
//       default:
//         return "text-gray-600 bg-gray-50 border-gray-200";
//     }
//   };

//   const getPaymentStatusColor = (status) => {
//     return status.toLowerCase() === "paid"
//       ? "text-green-600 bg-green-50 border-green-200"
//       : "text-red-600 bg-red-50 border-red-200";
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const SidebarContent = () => (
//     <>
//       <div className="bg-gradient-to-br from-[#cb202d] to-[#a01825] p-6 sm:p-8 text-white">
//         <ProfileSideheader />
//       </div>
//       <Nav />
//     </>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="fixed top-0 left-0 right-0 z-50">
//         <NavBar isAuthenticated={isAuthenticated} user={user} />
//       </div>
//       <div className="pt-20">
//         {/* Mobile Menu Button */}
//         <div className="lg:hidden fixed top-24 left-4 z-40">
//           <button
//             onClick={toggleSidebar}
//             className="bg-white p-3 rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200"
//           >
//             {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </div>

//         {/* Mobile Sidebar Overlay */}
//         {isSidebarOpen && (
//           <div
//             className="lg:hidden fixed inset-0 bg-black/50 z-30 pt-20"
//             onClick={toggleSidebar}
//           />
//         )}

//         <div className="max-w-7xl mx-auto p-4 sm:p-6">
//           <div className="flex gap-4 sm:gap-6 lg:gap-8 relative">
//             {/* Desktop Sidebar */}
//             <div className="hidden lg:block w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-28 h-fit">
//               <SidebarContent />
//             </div>

//             {/* Mobile Sidebar */}
//             <div
//               className={`lg:hidden fixed left-0 top-20 h-screen w-80 max-w-[85vw] bg-white rounded-r-2xl shadow-xl border border-gray-100 overflow-hidden z-40 transform transition-transform duration-300 ${
//                 isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//               }`}
//             >
//               <SidebarContent />
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 w-full lg:w-auto">
//               {/* Header */}
//               <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
//                     My <span className="text-[#cb202d]">Orders</span>
//                   </h2>
//                   <div className="w-2 h-6 sm:h-8 bg-gradient-to-b from-[#cb202d] to-[#a01825] rounded-full"></div>
//                 </div>
//                 <p className="text-gray-600 mt-2">
//                   Track and manage your orders
//                 </p>
//               </div>

//               {/* Orders List */}
//               <div className="space-y-6">
//                 {orders.map((order) => (
//                   <div
//                     key={order._id}
//                     className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
//                   >
//                     {/* Order Header */}
//                     <div className="p-6 sm:p-8 border-b border-gray-100">
//                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                         <div className="flex items-center gap-4">
//                           <div className="w-12 h-12 bg-gradient-to-br from-[#cb202d] to-[#a01825] rounded-xl flex items-center justify-center">
//                             <Package className="w-6 h-6 text-white" />
//                           </div>
//                           <div>
//                             <h3 className="font-semibold text-gray-800">
//                               Order #{order._id.slice(-6)}
//                             </h3>
//                             <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
//                               <Calendar className="w-4 h-4" />
//                               {formatDate(order.createdAt)}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex flex-wrap items-center gap-3">
//                           <span
//                             className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
//                               order.orderStatus
//                             )}`}
//                           >
//                             {order.orderStatus}
//                           </span>
//                           <span
//                             className={`px-3 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(
//                               order.paymentStatus
//                             )}`}
//                           >
//                             {order.paymentStatus}
//                           </span>
//                           <button
//                             onClick={() => toggleOrderDetails(order._id)}
//                             className="text-[#cb202d] hover:text-[#a01825] font-medium text-sm flex items-center gap-1"
//                           >
//                             {expandedOrders[order._id] ? (
//                               <>
//                                 Hide Details <ChevronUp className="w-4 h-4" />
//                               </>
//                             ) : (
//                               <>
//                                 View Details <ChevronDown className="w-4 h-4" />
//                               </>
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Order Summary */}
//                     <div className="p-6 sm:p-8">
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         <div className="md:col-span-2">
//                           <h4 className="font-semibold text-gray-800 mb-3">
//                             Items Ordered
//                           </h4>
//                           <div className="space-y-2">
//                             {order.products.map((product, index) => (
//                               <div
//                                 key={index}
//                                 className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
//                               >
//                                 <span className="text-gray-700">
//                                   {product[0]}
//                                 </span>
//                                 <span className="text-gray-600 text-sm">
//                                   Qty: {product[1]}
//                                 </span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="bg-gray-50 rounded-xl p-4">
//                           <h4 className="font-semibold text-gray-800 mb-3">
//                             Order Total
//                           </h4>
//                           <div className="space-y-2 text-sm">
//                             <div className="flex justify-between">
//                               <span className="text-gray-600">Subtotal:</span>
//                               <span className="flex items-center">
//                                 <IndianRupee className="w-3 h-3" />
//                                 {order.subtotal}
//                               </span>
//                             </div>
//                             <div className="flex justify-between">
//                               <span className="text-gray-600">Tax:</span>
//                               <span className="flex items-center">
//                                 <IndianRupee className="w-3 h-3" />
//                                 {order.tax}
//                               </span>
//                             </div>
//                             {order.deliveryfee > 0 && (
//                               <div className="flex justify-between">
//                                 <span className="text-gray-600">Delivery:</span>
//                                 <span className="flex items-center">
//                                   <IndianRupee className="w-3 h-3" />
//                                   {order.deliveryfee}
//                                 </span>
//                               </div>
//                             )}
//                             <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
//                               <span>Total:</span>
//                               <span className="flex items-center text-[#cb202d]">
//                                 <IndianRupee className="w-4 h-4" />
//                                 {order.totalAmount}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Expanded Details */}
//                     {expandedOrders[order._id] && (
//                       <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-gray-100">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                           <div>
//                             <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                               <MapPin className="w-4 h-4" />
//                               Delivery Address
//                             </h4>
//                             <p className="text-gray-600 text-sm leading-relaxed">
//                               {order.address}
//                             </p>
//                             {order.deliveryInstructions && (
//                               <p className="text-gray-500 text-sm mt-2">
//                                 <strong>Instructions:</strong>{" "}
//                                 {order.deliveryInstructions}
//                               </p>
//                             )}
//                           </div>
//                           <div>
//                             <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                               <CreditCard className="w-4 h-4" />
//                               Payment Details
//                             </h4>
//                             <div className="space-y-2 text-sm">
//                               <div className="flex justify-between">
//                                 <span className="text-gray-600">Method:</span>
//                                 <span className="capitalize">
//                                   {order.paymentMethod === "cod"
//                                     ? "Cash on Delivery"
//                                     : "Online Payment"}
//                                 </span>
//                               </div>
//                               <div className="flex justify-between">
//                                 <span className="text-gray-600">Status:</span>
//                                 <span
//                                   className={`capitalize ${
//                                     order.paymentStatus.toLowerCase() === "paid"
//                                       ? "text-green-600"
//                                       : "text-red-600"
//                                   }`}
//                                 >
//                                   {order.paymentStatus}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}

//                 {orders.length === 0 && (
//                   <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
//                     <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                     <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                       No Orders Yet
//                     </h3>
//                     <p className="text-gray-600 mb-6">
//                       You haven't placed any orders yet. Start exploring our
//                       menu!
//                     </p>
//                     <button className="bg-gradient-to-r from-[#cb202d] to-[#a01825] hover:from-[#a01825] hover:to-[#8b1520] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200">
//                       Browse Menu
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserOrders;



import { useState } from "react";
import {
  User,
  Package,
  Heart,
  Wallet,
  LogOut,
  MapPin,
  Menu,
  X,
  CreditCard,
  Calendar,
  IndianRupee,
  ChevronDown,
  ChevronUp,
  Plus,
} from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrders } from "../../../services/userServices/userServices";
import { setOrders } from "../../../redux/Slice/userSlice";
import NavBar from "../../Home/NavBar";

const UserOrders = () => {

  const dispatch=useDispatch()
  const userId=useSelector((state:RootState)=>state.user.id)

  
  const getUserOrders = async () => {
    try {
      const orderResponse = await await getOrders(userId);
      console.log(orderResponse);
      if (orderResponse.success) {
        dispatch(setOrders(orderResponse.orders));
      } else {
        alert("No orders found");
      }
    } catch (error) {
      alert("Something went wrong !")
      console.log(error);
    }
  };

  useEffect(() => {
    getUserOrders();
   },[]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState({});

  
     const user = useSelector((state: RootState) => state.user.name);
   const userEmail = useSelector((state: RootState) => state.user.email);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
   );

  
  // const orders = [
  //   {
  //     "_id": "68af655bf5c8823c012313fa",
  //     "userId": "6888ece78b3cdefcdce9a248",
  //     "hotelId": "688a048349c818e1a63a70a2",
  //     "products": [
  //       {
  //         "selectedVariant": {
  //           "name": "Half",
  //           "price": 110
  //         },
  //         "productId": "68af6537f5c8823c0123120e",
  //         "productName": "Chicken Biryani",
  //         "quantity": 2,
  //         "productPrice": 169.97,
  //         "selectedAddons": [
  //           {
  //             "name": "extra salad",
  //             "price": 10,
  //             "_id": "68af6537f5c8823c0123120f"
  //           },
  //           {
  //             "name": "extra rice",
  //             "price": 49.97,
  //             "_id": "68af6537f5c8823c01231210"
  //           }
  //         ],
  //         "itemTotalPrice": 339.94,
  //         "_id": "68af655bf5c8823c012313fb"
  //       },
  //       {
  //         "selectedVariant": {
  //           "name": "Full",
  //           "price": 600
  //         },
  //         "productId": "68af6542f5c8823c012312fe",
  //         "productName": "Chicken Mandi",
  //         "quantity": 3,
  //         "productPrice": 670,
  //         "selectedAddons": [
  //           {
  //             "name": "Extra Rice",
  //             "price": 50,
  //             "_id": "68af6542f5c8823c012312ff"
  //           },
  //           {
  //             "name": "Extra Maionnise",
  //             "price": 20,
  //             "_id": "68af6542f5c8823c01231300"
  //           }
  //         ],
  //         "itemTotalPrice": 1340,
  //         "_id": "68af655bf5c8823c012313fe"
  //       }
  //     ],
  //     "subtotal": 2349.94,
  //     "tax": 187.9952,
  //     "deliveryfee": 0,
  //     "totalAmount": 2537.9352,
  //     "paymentMethod": "cod",
  //     "paymentStatus": "Pending",
  //     "orderStatus": "Order Placed",
  //     "address": "no 20 girinagar ,kochi ,kerala ,india ,682587",
  //     "deliveryInstructions": "ring calling bell",
  //     "latitude": 9.954290799999999,
  //     "longitude": 76.3016561,
  //     "createdAt": "2025-08-27T20:06:51.176Z",
  //     "updatedAt": "2025-08-27T20:06:51.176Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "68af6ab19dba7a529d21c195",
  //     "userId": "6888ece78b3cdefcdce9a248",
  //     "hotelId": "688a048349c818e1a63a70a2",
  //     "products": [
  //       {
  //         "selectedVariant": {
  //           "name": "Full",
  //           "price": 600
  //         },
  //         "productId": "68af6a909dba7a529d21bd6a",
  //         "productName": "Chicken Mandi",
  //         "quantity": 2,
  //         "productPrice": 600,
  //         "selectedAddons": [],
  //         "itemTotalPrice": 1200,
  //         "_id": "68af6ab19dba7a529d21c196"
  //       },
  //       {
  //         "selectedVariant": {
  //           "name": "Half",
  //           "price": 110
  //         },
  //         "productId": "68af6aa09dba7a529d21c0a5",
  //         "productName": "Chicken Biryani",
  //         "quantity": 1,
  //         "productPrice": 110,
  //         "selectedAddons": [],
  //         "itemTotalPrice": 220,
  //         "_id": "68af6ab19dba7a529d21c197"
  //       }
  //     ],
  //     "subtotal": 1310,
  //     "tax": 104.8,
  //     "deliveryfee": 0,
  //     "totalAmount": 1414.8,
  //     "paymentMethod": "cod",
  //     "paymentStatus": "Pending",
  //     "orderStatus": "Order Placed",
  //     "address": "no 14 gandhi nagar ,kochi ,kerala ,india ,682785",
  //     "deliveryInstructions": "leave at the door",
  //     "latitude": 9.978798399999999,
  //     "longitude": 76.29478809999999,
  //     "createdAt": "2025-08-27T20:29:37.019Z",
  //     "updatedAt": "2025-08-27T20:29:37.019Z",
  //     "__v": 0
  //   }
  // ];
 
  const orders=useSelector((state:RootState)=>state.user.orders)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "order placed":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "preparing":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "out for delivery":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "delivered":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getPaymentStatusColor = (status) => {
    return status.toLowerCase() === "paid"
      ? "text-green-600 bg-green-50 border-green-200"
      : "text-red-600 bg-red-50 border-red-200";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const ProfileSideheader = () => (
    <div className="flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
        <User className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{user || "Guest User"}</h3>
      <p className="text-white/80 text-sm">{userEmail || "user@example.com"}</p>
    </div>
  );

  const Nav = () => (
    <div className="p-6">
      <nav className="space-y-2">
        <a href="#" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-red-50 hover:text-[#cb202d] rounded-xl transition-all duration-200 group">
          <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Profile</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 bg-red-50 text-[#cb202d] rounded-xl">
          <Package className="w-5 h-5" />
          <span className="font-medium">Orders</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-red-50 hover:text-[#cb202d] rounded-xl transition-all duration-200 group">
          <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Favorites</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-red-50 hover:text-[#cb202d] rounded-xl transition-all duration-200 group">
          <Wallet className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Wallet</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-red-50 hover:text-[#cb202d] rounded-xl transition-all duration-200 group">
          <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Addresses</span>
        </a>
        <button className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group w-full">
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Logout</span>
        </button>
      </nav>
    </div>
  );

  // const NavBar = ({ isAuthenticated, user }) => (
  //   <div className="bg-white shadow-lg border-b">
  //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //       <div className="flex justify-between items-center h-16">
  //         <div className="flex items-center">
  //           <h1 className="text-2xl font-bold text-[#cb202d]">FoodApp</h1>
  //         </div>
  //         <div className="flex items-center space-x-4">
  //           {isAuthenticated && (
  //             <span className="text-gray-700">Hello, {user}</span>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  const SidebarContent = () => (
    <>
      <div className="bg-gradient-to-br from-[#cb202d] to-[#a01825] p-6 sm:p-8 text-white">
        <ProfileSideheader/>
      </div>
      <Nav/>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar isAuthenticated={isAuthenticated} user={user} />
      </div>
      <div className="pt-20">
        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-24 left-4 z-40">
          <button
            onClick={toggleSidebar}
            className="bg-white p-3 rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30 pt-20"
            onClick={toggleSidebar}
          />
        )}

        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="flex gap-4 sm:gap-6 lg:gap-8 relative">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-28 h-fit">
              <SidebarContent />
            </div>

            {/* Mobile Sidebar */}
            <div
              className={`lg:hidden fixed left-0 top-20 h-screen w-80 max-w-[85vw] bg-white rounded-r-2xl shadow-xl border border-gray-100 overflow-hidden z-40 transform transition-transform duration-300 ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <SidebarContent />
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full lg:w-auto">
              {/* Header */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    My <span className="text-[#cb202d]">Orders</span>
                  </h2>
                  <div className="w-2 h-6 sm:h-8 bg-gradient-to-b from-[#cb202d] to-[#a01825] rounded-full"></div>
                </div>
                <p className="text-gray-600 mt-2">
                  Track and manage your orders
                </p>
              </div>

              {/* Orders List */}
              <div className="space-y-6">
                {orders?.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    {/* Order Header */}
                    <div className="p-6 sm:p-8 border-b border-gray-100">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#cb202d] to-[#a01825] rounded-xl flex items-center justify-center">
                            <Package className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              Order #{order._id.slice(-6)}
                            </h3>
                            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              order.orderStatus
                            )}`}
                          >
                            {order.orderStatus}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(
                              order.paymentStatus
                            )}`}
                          >
                            {order.paymentStatus}
                          </span>
                          <button
                            onClick={() => toggleOrderDetails(order._id)}
                            className="text-[#cb202d] hover:text-[#a01825] font-medium text-sm flex items-center gap-1"
                          >
                            {expandedOrders[order._id] ? (
                              <>
                                Hide Details <ChevronUp className="w-4 h-4" />
                              </>
                            ) : (
                              <>
                                View Details <ChevronDown className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="p-6 sm:p-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <h4 className="font-semibold text-gray-800 mb-4">
                            Items Ordered ({order.products.length} items)
                          </h4>
                          <div className="space-y-4">
                            {order.products.map((product, index) => (
                              <div
                                key={product._id || index}
                                className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex-1">
                                    <h5 className="font-medium text-gray-800">
                                      {product.productName}
                                    </h5>
                                    <div className="flex items-center gap-4 mt-1">
                                      <span className="text-sm text-gray-600">
                                        {product.selectedVariant?.name} • Qty: {product.quantity}
                                      </span>
                                      {/* <span className="text-sm font-medium text-[#cb202d] flex items-center">
                                        <IndianRupee className="w-3 h-3" />
                                        {product.itemTotalPrice.toFixed(2)}
                                      </span> */}
                                    </div>
                                  </div>
                                </div>
                                {product.selectedAddons && product.selectedAddons.length > 0 && (
                                  <div className="mt-2 pt-2 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 mb-1">Add-ons:</p>
                                    <div className="flex flex-wrap gap-2">
                                      {product.selectedAddons.map((addon, addonIndex) => (
                                        <span
                                          key={addon._id || addonIndex}
                                          className="text-xs bg-white px-2 py-1 rounded-md border border-gray-200 flex items-center gap-1"
                                        >
                                          <Plus className="w-3 h-3" />
                                          {addon.name} (+₹{addon.price})
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-800 mb-3">
                            Order Total
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Subtotal:</span>
                              <span className="flex items-center">
                                <IndianRupee className="w-3 h-3" />
                                {order.subtotal.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tax:</span>
                              <span className="flex items-center">
                                <IndianRupee className="w-3 h-3" />
                                {order.tax.toFixed(2)}
                              </span>
                            </div>
                            {order.deliveryfee > 0 && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Delivery:</span>
                                <span className="flex items-center">
                                  <IndianRupee className="w-3 h-3" />
                                  {order.deliveryfee}
                                </span>
                              </div>
                            )}
                            <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
                              <span>Total:</span>
                              <span className="flex items-center text-[#cb202d]">
                                <IndianRupee className="w-4 h-4" />
                                {order.totalAmount.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedOrders[order._id] && (
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              Delivery Address
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {order.address}
                            </p>
                            {order.deliveryInstructions && (
                              <p className="text-gray-500 text-sm mt-2">
                                <strong>Instructions:</strong>{" "}
                                {order.deliveryInstructions}
                              </p>
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                              <CreditCard className="w-4 h-4" />
                              Payment Details
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Method:</span>
                                <span className="capitalize">
                                  {order.paymentMethod === "cod"
                                    ? "Cash on Delivery"
                                    : "Online Payment"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <span
                                  className={`capitalize ${
                                    order.paymentStatus.toLowerCase() === "paid"
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {order.paymentStatus}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {(!orders || orders.length === 0) && (
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      No Orders Yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      You haven't placed any orders yet. Start exploring our
                      menu!
                    </p>
                    <button className="bg-gradient-to-r from-[#cb202d] to-[#a01825] hover:from-[#a01825] hover:to-[#8b1520] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200">
                      Browse Menu
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;