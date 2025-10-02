// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../../redux/store";
// import {
//   fetchAllOrdersOfRestuarent,
//   findOrder,
// } from "../../../services/restaurentServices/registration";

// interface Product {
//   productId?: string;
//   productName?: string;
//   hotelId?: string;
//   quantity?: number;
//   _id?: string;
// }

// interface Order {
//   _id?: string;
//   userId?: string;
//   products?: Product[];
//   hotelId?: string;
//   totalAmount?: number;
//   paymentMethod?: string;
//   paymentStatus?: string;
//   orderStatus?: string;
//   address?: string;
//   deliveryInstructions?: string;
//   deliveryfee?: number;
//   latitude?: number;
//   longitude?: number;
//   subtotal?: number;
//   tax?: number;
//   createdAt?: string;
//   updatedAt?: string;
//   __v?: number;
// }

// function Orders() {
//   const restaurentId = useSelector(
//     (state: RootState) => state.restaurentSlice.hotelDetails.id
//   );
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [orderDetails, setOrderDetails] = useState<Order | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchAllOrders = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetchAllOrdersOfRestuarent(restaurentId);
//       console.log("Orders:::::::", response, "id:", restaurentId);
//       setOrders(response.orders || []);
//       setError(null);
//     } catch (error) {
//       console.error(error);
//       setError("Failed to fetch orders. Please try again later.");
//       setOrders([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleViewDetails = async (id: string | undefined) => {
//     try {
//       const response = await findOrder(id);
//       setOrderDetails(response);
//       setIsModalOpen(true);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setOrderDetails(null);
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, []);

//   const getStatusColor = (status: string | undefined) => {
//     switch (status?.toLowerCase()) {
//       case "pending":
//         return "bg-amber-50 text-amber-700 border-amber-200";
//       case "completed":
//         return "bg-emerald-50 text-emerald-700 border-emerald-200";
//       case "cancelled":
//         return "bg-red-50 text-red-700 border-red-200";
//       case "order placed":
//         return "bg-blue-50 text-blue-700 border-blue-200";
//       default:
//         return "bg-gray-50 text-gray-700 border-gray-200";
//     }
//   };

//   const getPaymentStatusIcon = (status: string | undefined) => {
//     switch (status?.toLowerCase()) {
//       case "paid":
//         return "✓";
//       case "pending":
//         return "⏳";
//       case "failed":
//         return "✗";
//       default:
//         return "?";
//     }
//   };

//   const getOrderStatusIcon = (status: string | undefined) => {
//     switch (status?.toLowerCase()) {
//       case "completed":
//         return "✓";
//       case "pending":
//         return "⏳";
//       case "cancelled":
//         return "✗";
//       case "order placed":
//         return "📋";
//       default:
//         return "?";
//     }
//   };

//   const formatDate = (dateString: string | undefined) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleString();
//   };

//   const formatCurrency = (amount: number | undefined) => {
//     if (amount === undefined) return "₹0.00";
//     return `₹${amount.toFixed(2)}`;
//   };

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 text-center">
//             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg
//                 className="w-8 h-8 text-red-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
//                 />
//               </svg>
//             </div>
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">
//               Unable to Load Orders
//             </h2>
//             <p className="text-gray-600 mb-6">{error}</p>
//             <button
//               onClick={fetchAllOrders}
//               disabled={isLoading}
//               className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? "Retrying..." : "Try Again"}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
//             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
//               <svg
//                 className="w-8 h-8 text-blue-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 10h16M4 14h16M4 18h16"
//                 />
//               </svg>
//             </div>
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">
//               Loading Orders...
//             </h2>
//             <p className="text-gray-600">
//               Please wait while we fetch your orders
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
//             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg
//                 className="w-8 h-8 text-blue-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                 />
//               </svg>
//             </div>
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">
//               No Orders Found
//             </h2>
//             <p className="text-gray-600">
//               You haven't received any orders yet. Orders will appear here when
//               customers place them.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center">
//                   <svg
//                     className="w-6 h-6 text-white"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-800">
//                     Order Management
//                   </h1>
//                   <p className="text-gray-600">
//                     Manage and track all your restaurant orders
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 px-4 py-2 rounded-xl border border-emerald-200">
//                   <span className="text-emerald-700 font-medium">
//                     {orders.length} Total Orders
//                   </span>
//                 </div>
//                 <button
//                   onClick={fetchAllOrders}
//                   disabled={isLoading}
//                   className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50"
//                 >
//                   <svg
//                     className="w-4 h-4 inline mr-2"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                     />
//                   </svg>
//                   Refresh
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Orders Grid */}
//         <div className="grid gap-6">
//           {orders.map((order, index) => (
//             <div
//               key={order._id}
//               className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
//             >
//               <div className="flex justify-between items-start mb-6">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center">
//                     <span className="text-white font-bold text-lg">
//                       {index + 1}
//                     </span>
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-bold text-[#cb202d]">
//                       Order #{order._id?.slice(-6).toUpperCase()}
//                     </h2>
//                     <p className="text-gray-500 text-sm">
//                       {order.products?.length}{" "}
//                       {order.products?.length === 1 ? "item" : "items"} •{" "}
//                       {formatDate(order.createdAt)}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={() => handleViewDetails(order._id)}
//                     className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
//                   >
//                     <svg
//                       className="w-4 h-4 inline mr-2"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                       />
//                     </svg>
//                     View Details
//                   </button>
//                 </div>
//               </div>

//               {/* Status Badges and Amount */}
//               <div className="flex flex-wrap gap-3 mb-6">
//                 <div
//                   className={`px-4 py-2 rounded-xl font-medium border ${getStatusColor(
//                     order.paymentStatus
//                   )} flex items-center space-x-2`}
//                 >
//                   <span className="text-lg">
//                     {getPaymentStatusIcon(order.paymentStatus)}
//                   </span>
//                   <span>Payment: {order.paymentStatus}</span>
//                 </div>
//                 <div
//                   className={`px-4 py-2 rounded-xl font-medium border ${getStatusColor(
//                     order.orderStatus
//                   )} flex items-center space-x-2`}
//                 >
//                   <span className="text-lg">
//                     {getOrderStatusIcon(order.orderStatus)}
//                   </span>
//                   <span>Status: {order.orderStatus}</span>
//                 </div>
//                 {order.paymentMethod && (
//                   <div className="px-4 py-2 rounded-xl font-medium border bg-purple-50 text-purple-700 border-purple-200 flex items-center space-x-2">
//                     <span className="text-lg">💳</span>
//                     <span>{order.paymentMethod.toUpperCase()}</span>
//                   </div>
//                 )}
//                 <div className="px-4 py-2 rounded-xl font-medium border bg-green-50 text-green-700 border-green-200 flex items-center space-x-2">
//                   <span className="text-lg">💰</span>
//                   <span>Total: {formatCurrency(order.totalAmount)}</span>
//                 </div>
//               </div>

//               {/* Address Information */}
//               {order.address && (
//                 <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-4">
//                   <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
//                     <svg
//                       className="w-5 h-5 mr-2 text-blue-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                     </svg>
//                     Delivery Address
//                   </h3>
//                   <p className="text-blue-700 text-sm">{order.address}</p>
//                   {order.deliveryInstructions && (
//                     <p className="text-blue-600 text-xs mt-1 italic">
//                       Instructions: {order.deliveryInstructions}
//                     </p>
//                   )}
//                 </div>
//               )}

//               {/* Products Preview */}
//               <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
//                 <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
//                   <svg
//                     className="w-5 h-5 mr-2 text-gray-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
//                     />
//                   </svg>
//                   Order Items
//                 </h3>
//                 <div className="space-y-2">
//                   {order.products?.slice(0, 3).map((product, index) => (
//                     <div
//                       key={product._id || index}
//                       className="flex justify-between items-center py-2 px-3 bg-white rounded-lg border border-gray-200"
//                     >
//                       <div className="flex items-center space-x-3">
//                         <div className="w-8 h-8 bg-[#cb202d] rounded-lg flex items-center justify-center">
//                           <span className="text-white font-medium text-sm">
//                             {index + 1}
//                           </span>
//                         </div>
//                         <span className="font-medium text-gray-800">
//                           {product[0] || "Product"}
//                         </span>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
//                           Qty: {product[1] || 1}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                   {order.products && order.products.length > 3 && (
//                     <div className="text-center py-2 text-gray-500 text-sm">
//                       +{order.products.length - 3} more items
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Enhanced Modal */}
//         {isModalOpen && orderDetails && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300 p-4">
//             <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative transform transition-all duration-300">
//               <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
//                 <button
//                   onClick={closeModal}
//                   className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-xl"
//                 >
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>

//                 <div className="flex items-center space-x-4">
//                   <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center">
//                     <svg
//                       className="w-6 h-6 text-white"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-800">
//                       Order #{orderDetails._id?.slice(-6).toUpperCase()}
//                     </h2>
//                     <p className="text-gray-600">Order Details & Information</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6">
//                 {/* Status Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                   <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
//                     <div className="flex items-center space-x-2 mb-2">
//                       <span className="text-2xl">
//                         {getPaymentStatusIcon(orderDetails.paymentStatus)}
//                       </span>
//                       <p className="text-sm font-medium text-blue-700">
//                         Payment Status
//                       </p>
//                     </div>
//                     <p className="font-bold text-blue-800 text-lg">
//                       {orderDetails.paymentStatus}
//                     </p>
//                   </div>

//                   <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
//                     <div className="flex items-center space-x-2 mb-2">
//                       <span className="text-2xl">
//                         {getOrderStatusIcon(orderDetails.orderStatus)}
//                       </span>
//                       <p className="text-sm font-medium text-green-700">
//                         Order Status
//                       </p>
//                     </div>
//                     <p className="font-bold text-green-800 text-lg">
//                       {orderDetails.orderStatus}
//                     </p>
//                   </div>

//                   <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
//                     <div className="flex items-center space-x-2 mb-2">
//                       <span className="text-2xl">💳</span>
//                       <p className="text-sm font-medium text-purple-700">
//                         Payment Method
//                       </p>
//                     </div>
//                     <p className="font-bold text-purple-800 text-lg">
//                       {orderDetails.paymentMethod?.toUpperCase()}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Order Summary */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   {/* Address Section */}
//                   <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
//                     <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
//                       <svg
//                         className="w-5 h-5 mr-2 text-blue-600"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                         />
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                         />
//                       </svg>
//                       Delivery Information
//                     </h3>
//                     <p className="text-blue-700 mb-3">{orderDetails.address}</p>
//                     {orderDetails.deliveryInstructions && (
//                       <p className="text-blue-600 text-sm italic">
//                         <strong>Instructions:</strong>{" "}
//                         {orderDetails.deliveryInstructions}
//                       </p>
//                     )}
//                   </div>

//                   {/* Order Summary */}
//                   <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
//                     <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
//                       <svg
//                         className="w-5 h-5 mr-2 text-green-600"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
//                         />
//                       </svg>
//                       Order Summary
//                     </h3>
//                     <div className="space-y-2 text-green-700">
//                       <div className="flex justify-between">
//                         <span>Subtotal:</span>
//                         <span>{formatCurrency(orderDetails.subtotal)}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Tax:</span>
//                         <span>{formatCurrency(orderDetails.tax)}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Delivery Fee:</span>
//                         <span>{formatCurrency(orderDetails.deliveryfee)}</span>
//                       </div>
//                       <hr className="border-green-300" />
//                       <div className="flex justify-between font-bold text-lg">
//                         <span>Total:</span>
//                         <span>{formatCurrency(orderDetails.totalAmount)}</span>
//                       </div>
//                     </div>
//                     <p className="text-green-600 text-xs mt-3">
//                       Order placed: {formatDate(orderDetails.createdAt)}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Order Items */}
//                 <div className="mb-6">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//                     <svg
//                       className="w-5 h-5 mr-2 text-gray-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
//                       />
//                     </svg>
//                     Order Items ({orderDetails.products?.length})
//                   </h3>
//                   <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
//                     <div className="bg-white px-6 py-4 border-b border-gray-200">
//                       <div className="flex justify-between items-center">
//                         <span className="font-semibold text-gray-800">
//                           Product Name
//                         </span>
//                         <span className="font-semibold text-gray-800">
//                           Quantity
//                         </span>
//                       </div>
//                     </div>
//                     <div className="divide-y divide-gray-200">
//                       {orderDetails.products?.map((product, index) => (
//                         <div
//                           key={product._id || index}
//                           className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors duration-150"
//                         >
//                           <div className="flex items-center space-x-4">
//                             <div className="w-10 h-10 bg-[#cb202d] rounded-lg flex items-center justify-center">
//                               <span className="text-white font-medium text-sm">
//                                 {index + 1}
//                               </span>
//                             </div>
//                             <span className="font-medium text-gray-800">
//                               {product[0] || "Product"}
//                             </span>
//                           </div>
//                           <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
//                             {product[1] || 1}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     onClick={closeModal}
//                     className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//                   >
//                     Close
//                   </button>
//                   {orderDetails.orderStatus?.toLowerCase() === "pending" && (
//                     <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl">
//                       Mark as Completed
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Orders;



// new order component with varients


import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import {
  fetchAllOrdersOfRestuarent,
  findOrder,
} from "../../../services/restaurentServices/registration";

interface SelectedVariant {
  name: string;
  price: number;
}

interface SelectedAddon {
  name: string;
  price: number;
  _id?: string;
}

interface Product {
  productId: string;
  productName: string;
  quantity: number;
  productImage?: string;
  productPrice: number;
  selectedVariant?: SelectedVariant;
  selectedAddons: SelectedAddon[];
  itemTotalPrice: number;
  originalItemPrice?: number;
  _id?: string;
}

interface Order {
  _id: string;
  orderId?: string;
  userId: string;
  hotelId: string;
  products: Product[];
  subtotal: number;
  tax: number;
  deliveryfee: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  address: string;
  landMark?: string;
  deliveryInstructions?: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

function Orders() {
  const restaurentId = useSelector(
    (state: RootState) => state.restaurentSlice.hotelDetails.id
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllOrders = async () => {
    setIsLoading(true);
    try {
      const response = await fetchAllOrdersOfRestuarent(restaurentId);
      console.log("Orders:::::::", response, "id:", restaurentId);
      setOrders(response.orders || []);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch orders. Please try again later.");
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = async (id: string) => {
    try {
      const response = await findOrder(id);
      setOrderDetails(response);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOrderDetails(null);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "received":
      case "delivered":
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "cancelled":
      case "failed":
      case "returned":
        return "bg-red-50 text-red-700 border-red-200";
      case "order placed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "shipped":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "received":
        return "✓";
      case "pending":
        return "⏳";
      case "failed":
        return "✗";
      case "refund":
        return "↩️";
      default:
        return "?";
    }
  };

  const getOrderStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "✅";
      case "confirmed":
        return "✓";
      case "pending":
        return "⏳";
      case "cancelled":
      case "returned":
        return "✗";
      case "order placed":
        return "📋";
      case "shipped":
        return "🚚";
      default:
        return "?";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount: number) => {
    if (amount === undefined || amount === null) return "₹0.00";
    return `₹${amount.toFixed(2)}`;
  };

  const getTotalItems = (products: Product[]) => {
    return products.reduce((total, product) => total + product.quantity, 0);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Unable to Load Orders
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchAllOrders}
              disabled={isLoading}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Retrying..." : "Try Again"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Loading Orders...
            </h2>
            <p className="text-gray-600">
              Please wait while we fetch your orders
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No Orders Found
            </h2>
            <p className="text-gray-600">
              You haven't received any orders yet. Orders will appear here when
              customers place them.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    Order Management
                  </h1>
                  <p className="text-gray-600">
                    Manage and track all your restaurant orders
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 px-4 py-2 rounded-xl border border-emerald-200">
                  <span className="text-emerald-700 font-medium">
                    {orders.length} Total Orders
                  </span>
                </div>
                <button
                  onClick={fetchAllOrders}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  <svg
                    className="w-4 h-4 inline mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid gap-6">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#cb202d]">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {getTotalItems(order.products)} items •{" "}
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleViewDetails(order._id)}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <svg
                      className="w-4 h-4 inline mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View Details
                  </button>
                </div>
              </div>

              {/* Status Badges and Amount */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div
                  className={`px-4 py-2 rounded-xl font-medium border ${getStatusColor(
                    order.paymentStatus
                  )} flex items-center space-x-2`}
                >
                  <span className="text-lg">
                    {getPaymentStatusIcon(order.paymentStatus)}
                  </span>
                  <span>Payment: {order.paymentStatus}</span>
                </div>
                <div
                  className={`px-4 py-2 rounded-xl font-medium border ${getStatusColor(
                    order.orderStatus
                  )} flex items-center space-x-2`}
                >
                  <span className="text-lg">
                    {getOrderStatusIcon(order.orderStatus)}
                  </span>
                  <span>Status: {order.orderStatus}</span>
                </div>
                <div className="px-4 py-2 rounded-xl font-medium border bg-purple-50 text-purple-700 border-purple-200 flex items-center space-x-2">
                  <span className="text-lg">💳</span>
                  <span>{order.paymentMethod.toUpperCase()}</span>
                </div>
                <div className="px-4 py-2 rounded-xl font-medium border bg-green-50 text-green-700 border-green-200 flex items-center space-x-2">
                  <span className="text-lg">💰</span>
                  <span>Total: {formatCurrency(order.totalAmount)}</span>
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-4">
                <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Delivery Address
                </h3>
                <p className="text-blue-700 text-sm">{order.address}</p>
                {order.landMark && (
                  <p className="text-blue-600 text-xs mt-1">
                    Landmark: {order.landMark}
                  </p>
                )}
                {order.deliveryInstructions && (
                  <p className="text-blue-600 text-xs mt-1 italic">
                    Instructions: {order.deliveryInstructions}
                  </p>
                )}
              </div>

              {/* Products Preview */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  Order Items
                </h3>
                <div className="space-y-2">
                  {order.products.slice(0, 3).map((product, index) => (
                    <div
                      key={product._id || index}
                      className="flex justify-between items-center py-2 px-3 bg-white rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#cb202d] rounded-lg flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-800">
                            {product.productName}
                          </span>
                          {product.selectedVariant && (
                            <p className="text-xs text-gray-500">
                              {product.selectedVariant.name} - {formatCurrency(product.selectedVariant.price)}
                            </p>
                          )}
                          {product.selectedAddons.length > 0 && (
                            <p className="text-xs text-gray-500">
                              +{product.selectedAddons.length} addon(s)
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          Qty: {product.quantity}
                        </span>
                        <span className="text-sm font-medium text-gray-600">
                          {formatCurrency(product.itemTotalPrice)}
                        </span>
                      </div>
                    </div>
                  ))}
                  {order.products.length > 3 && (
                    <div className="text-center py-2 text-gray-500 text-sm">
                      +{order.products.length - 3} more items
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Modal */}
        {isModalOpen && orderDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300 p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative transform transition-all duration-300">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-xl"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Order #{orderDetails._id.slice(-6).toUpperCase()}
                    </h2>
                    <p className="text-gray-600">Order Details & Information</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">
                        {getPaymentStatusIcon(orderDetails.paymentStatus)}
                      </span>
                      <p className="text-sm font-medium text-blue-700">
                        Payment Status
                      </p>
                    </div>
                    <p className="font-bold text-blue-800 text-lg">
                      {orderDetails.paymentStatus}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">
                        {getOrderStatusIcon(orderDetails.orderStatus)}
                      </span>
                      <p className="text-sm font-medium text-green-700">
                        Order Status
                      </p>
                    </div>
                    <p className="font-bold text-green-800 text-lg">
                      {orderDetails.orderStatus}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">💳</span>
                      <p className="text-sm font-medium text-purple-700">
                        Payment Method
                      </p>
                    </div>
                    <p className="font-bold text-purple-800 text-lg">
                      {orderDetails.paymentMethod.toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Address Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Delivery Information
                    </h3>
                    <p className="text-blue-700 mb-2">{orderDetails.address}</p>
                    {orderDetails.landMark && (
                      <p className="text-blue-600 text-sm mb-2">
                        <strong>Landmark:</strong> {orderDetails.landMark}
                      </p>
                    )}
                    {orderDetails.deliveryInstructions && (
                      <p className="text-blue-600 text-sm italic">
                        <strong>Instructions:</strong> {orderDetails.deliveryInstructions}
                      </p>
                    )}
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                    <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      Order Summary
                    </h3>
                    <div className="space-y-2 text-green-700">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(orderDetails.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>{formatCurrency(orderDetails.tax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee:</span>
                        <span>{formatCurrency(orderDetails.deliveryfee)}</span>
                      </div>
                      <hr className="border-green-300" />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>{formatCurrency(orderDetails.totalAmount)}</span>
                      </div>
                    </div>
                    <p className="text-green-600 text-xs mt-3">
                      Order placed: {formatDate(orderDetails.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    Order Items ({orderDetails.products.length})
                  </h3>
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                    <div className="bg-white px-6 py-4 border-b border-gray-200">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <span className="font-semibold text-gray-800 col-span-5">
                          Product Details
                        </span>
                        <span className="font-semibold text-gray-800 col-span-2 text-center">
                          Quantity
                        </span>
                        <span className="font-semibold text-gray-800 col-span-2 text-center">
                          Unit Price
                        </span>
                        <span className="font-semibold text-gray-800 col-span-3 text-right">
                          Total Price
                        </span>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {orderDetails.products.map((product, index) => (
                        <div
                          key={product._id || index}
                          className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
                        >
                          <div className="grid grid-cols-12 gap-4 items-start">
                            <div className="col-span-5">
                              <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-[#cb202d] rounded-lg flex items-center justify-center flex-shrink-0">
                                  <span className="text-white font-medium text-sm">
                                    {index + 1}
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-gray-800 truncate">
                                    {product.productName}
                                  </p>
                                  {product.selectedVariant && (
                                    <p className="text-sm text-gray-600">
                                      Variant: {product.selectedVariant.name}
                                    </p>
                                  )}
                                  {product.selectedAddons.length > 0 && (
                                    <div className="mt-1">
                                      <p className="text-xs text-gray-500 mb-1">Add-ons:</p>
                                      {product.selectedAddons.map((addon, addonIndex) => (
                                        <p key={addonIndex} className="text-xs text-gray-600">
                                          • {addon.name} (+{formatCurrency(addon.price)})
                                        </p>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-span-2 text-center">
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                {product.quantity}
                              </span>
                            </div>
                            <div className="col-span-2 text-center">
                              <span className="text-sm font-medium text-gray-600">
                                {formatCurrency(product.productPrice)}
                              </span>
                            </div>
                            <div className="col-span-3 text-right">
                              <span className="text-lg font-bold text-gray-800">
                                {formatCurrency(product.itemTotalPrice)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={closeModal}
                    className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Close
                  </button>
                  {(orderDetails.orderStatus?.toLowerCase() === "pending" || 
                    orderDetails.orderStatus?.toLowerCase() === "order placed") && (
                    <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                      Mark as Confirmed
                    </button>
                  )}
                  {orderDetails.orderStatus?.toLowerCase() === "confirmed" && (
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                      Mark as Shipped
                    </button>
                  )}
                  {orderDetails.orderStatus?.toLowerCase() === "shipped" && (
                    <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                      Mark as Delivered
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;