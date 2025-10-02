// // import  {useState } from "react";
// // import {
// //   CreditCard,
// //   Shield,
// //   Lock,
// //   Truck,
// //   Award,
// //   // Star,
// //   ArrowLeft,
// //   MapPin,
// //   ChevronDown,
// //   Plus,
// //   // Clock,
// //   Home,
// //   Briefcase,
// // } from "lucide-react";
// // import { useSelector,useDispatch } from "react-redux";
// // import type { RootState } from "../../../redux/store";
// // import { createOrder } from "../../../services/userServices/userServices";
// // import { useNavigate } from "react-router-dom";
// // import { clearCart } from "../../../services/userServices/userServices";
// // import { clearCartfromRedux } from "../../../redux/Slice/userSlice";

// // interface FormData {
// //   firstName: string;
// //   lastName: string;
// //   phone: string;
// //   selectedAddress: string;
// //   customAddress: string;
// //   city: string;
// //   state: string;
// //   zipCode: string;
// //   landmark: string;
// //   addressType: "home" | "work" | "other";
// //   deliveryInstructions: string;
// // }

// // interface Address {
// //   id: string;
// //   type: "home" | "work" | "other";
// //   address: string;
// //   landmark?: string;
// //   isDefault: boolean;
// // }

// // interface OrderSummary {
// //   subtotal: number;
// //   deliveryFee: number;
// //   tax: number;
// //   discount: number;
// //   total: number;
// // }

// // const FoodDeliveryCheckout: React.FC = () => {

// //   const dispatch=useDispatch()
// //   const [formData, setFormData] = useState<FormData>({
// //     firstName: "",
// //     lastName: "",
// //     phone: "",
// //     selectedAddress: "",
// //     customAddress: "",
// //     city: "",
// //     state: "",
// //     zipCode: "",
// //     landmark: "",
// //     addressType: "home",
// //     deliveryInstructions: "",
// //   });

// //   const userId = useSelector((state: RootState) => state.user.id);
// //   const restaurentId=useSelector((state:RootState)=>state.user.restaurentData.id)
// //   const userName = useSelector((state: RootState) => state.user.name);
// //   const userEmail = useSelector((state: RootState) => state.user.email);
// //   const userPhone = useSelector((state: RootState) => state.user.mobile);

// //   const itemsToCreateOrder = useSelector(
// //     (state: RootState) => state.user.orderFromCart
// //   );

// //   console.log("Make Orders with Products=:", itemsToCreateOrder);

// //   const navigate = useNavigate();

// //   const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">(
// //     "razorpay"
// //   );
// //   const [showNewAddress, setShowNewAddress] = useState<boolean>(false);

// //   const savedAddresses: Address[] = [
// //     {
// //       id: "1",
// //       type: "home",
// //       address: "123 Main Street, Downtown Area, New York, NY 10001",
// //       landmark: "Near Central Park",
// //       isDefault: true,
// //     },
// //     {
// //       id: "2",
// //       type: "work",
// //       address: "456 Business Ave, Corporate District, New York, NY 10002",
// //       landmark: "Next to Metro Station",
// //       isDefault: false,
// //     },
// //   ];

// //   const handleInputChange = (
// //     e: React.ChangeEvent<
// //       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
// //     >
// //   ) => {
// //     const { name, value, type } = e.target;
// //     const checked = (e.target as HTMLInputElement).checked;

// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: type === "checkbox" ? checked : value,
// //     }));
// //   };

// //   const handleCompleteOrder = async () => {
// //     console.log("Payment method:", paymentMethod);

// //     const data={

// //       ...itemsToCreateOrder,
// //       userId:userId,
// //       hotelId:restaurentId,
// //       paymentMethod:paymentMethod

// //     }

// //     const response = await createOrder(data);
// //     if (response) {
// //       console.log(response);
// //       alert(response.message);
// //       await clearCart(userId)
// //       dispatch(clearCartfromRedux())
// //       navigate("/user/restaurent_Details");
// //     }
// //   };

// //   const getAddressIcon = (type: string) => {
// //     switch (type) {
// //       case "home":
// //         return <Home className="w-4 h-4" />;
// //       case "work":
// //         return <Briefcase className="w-4 h-4" />;
// //       default:
// //         return <MapPin className="w-4 h-4" />;
// //     }
// //   };

// //   const calculateAmount = (
// //     subtotal: number,
// //     deliveryFee: number,
// //     tax: number,
// //     discount: number
// //   ): number => {
// //     return Number((subtotal + deliveryFee + tax - discount).toFixed(2));
// //   };

// //   const subtotal = Number(itemsToCreateOrder.subtotal);
// //   const deliveryFee = Number(itemsToCreateOrder.deliveryfee);
// //   const tax = Number(itemsToCreateOrder.tax);
// //   const discount = Number(5.0 * itemsToCreateOrder.products.length);

// //   const orderSummary: OrderSummary = {
// //     subtotal,
// //     deliveryFee,
// //     tax,
// //     discount,
// //     total: calculateAmount(subtotal, deliveryFee, tax, discount),
// //   };

// //   return (
// //     <div className="min-h-screen bg-white">
// //       {/* Header */}
// //       <div className="bg-white shadow-sm border-b">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex items-center justify-between h-16">
// //             <div className="flex items-center">
// //               <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
// //                 <ArrowLeft className="w-5 h-5 mr-2" />
// //                 <a href="/user/restaurent_Details" className="font-medium">
// //                   Back
// //                 </a>
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //           {/* Left Column - Forms */}
// //           <div className="space-y-6">
// //             {/* Contact Information */}
// //             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
// //               <h2 className="text-xl font-semibold text-gray-900 mb-6">
// //                 Contact Information
// //               </h2>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div>
// //                   <p className="text-sm font-medium text-gray-700 mb-1">Name</p>
// //                   <p className="text-[#cb202d] font-medium">
// //                     {userName || "Not provided"}
// //                   </p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm font-medium text-gray-700 mb-1">
// //                     Email
// //                   </p>
// //                   <p className="text-[#cb202d] font-medium">
// //                     {userEmail || "Not provided"}
// //                   </p>
// //                 </div>
// //               </div>
// //               <div className="mt-4">
// //                 <p className="text-sm font-medium text-gray-700 mb-1">
// //                   Phone Number
// //                 </p>
// //                 <p className="text-[#cb202d] font-medium">
// //                   {userPhone || "Not provided"}
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Delivery Address */}
// //             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
// //               <div className="flex items-center justify-between mb-6">
// //                 <h2 className="text-xl font-semibold text-gray-900">
// //                   Delivery Address
// //                 </h2>
// //                 <button
// //                   onClick={() => setShowNewAddress(!showNewAddress)}
// //                   className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 text-sm font-medium"
// //                 >
// //                   <Plus className="w-4 h-4" />
// //                   <span>Add New Address</span>
// //                 </button>
// //               </div>

// //               {/* Saved Addresses */}
// //               <div className="space-y-3 mb-6">
// //                 {savedAddresses.map((address) => (
// //                   <div
// //                     key={address.id}
// //                     className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
// //                   >
// //                     <div className="flex items-start space-x-3">
// //                       <input
// //                         type="radio"
// //                         id={`address-${address.id}`}
// //                         name="selectedAddress"
// //                         value={address.id}
// //                         checked={formData.selectedAddress === address.id}
// //                         onChange={handleInputChange}
// //                         className="w-4 h-4 text-orange-600 focus:ring-orange-500 mt-1"
// //                       />
// //                       <div className="flex-1">
// //                         <div className="flex items-center space-x-2 mb-2">
// //                           {getAddressIcon(address.type)}
// //                           <span className="text-sm font-medium text-gray-900 capitalize">
// //                             {address.type}
// //                           </span>
// //                           {address.isDefault && (
// //                             <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
// //                               Default
// //                             </span>
// //                           )}
// //                         </div>
// //                         <p className="text-sm text-gray-700">
// //                           {address.address}
// //                         </p>
// //                         {address.landmark && (
// //                           <p className="text-xs text-gray-500 mt-1">
// //                             Landmark: {address.landmark}
// //                           </p>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>

// //               {/* Add New Address Form */}
// //               {showNewAddress && (
// //                 <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
// //                   <h3 className="font-medium text-gray-900 mb-4">
// //                     Add New Address
// //                   </h3>
// //                   <div className="space-y-4">
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Full Address
// //                       </label>
// //                       <input
// //                         type="text"
// //                         name="customAddress"
// //                         value={formData.customAddress}
// //                         onChange={handleInputChange}
// //                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
// //                         placeholder="123 Main Street, Apartment 4B"
// //                       />
// //                     </div>

// //                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-2">
// //                           City
// //                         </label>
// //                         <input
// //                           type="text"
// //                           name="city"
// //                           value={formData.city}
// //                           onChange={handleInputChange}
// //                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
// //                           placeholder="New York"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-2">
// //                           State
// //                         </label>
// //                         <div className="relative">
// //                           <select
// //                             name="state"
// //                             value={formData.state}
// //                             onChange={handleInputChange}
// //                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none"
// //                           >
// //                             <option value="">Select State</option>
// //                             <option value="NY">New York</option>
// //                             <option value="CA">California</option>
// //                             <option value="TX">Texas</option>
// //                             <option value="FL">Florida</option>
// //                           </select>
// //                           <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// //                         </div>
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-2">
// //                           ZIP Code
// //                         </label>
// //                         <input
// //                           type="text"
// //                           name="zipCode"
// //                           value={formData.zipCode}
// //                           onChange={handleInputChange}
// //                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
// //                           placeholder="10001"
// //                         />
// //                       </div>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Landmark (Optional)
// //                       </label>
// //                       <input
// //                         type="text"
// //                         name="landmark"
// //                         value={formData.landmark}
// //                         onChange={handleInputChange}
// //                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
// //                         placeholder="Near Central Park"
// //                       />
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Address Type
// //                       </label>
// //                       <div className="flex space-x-4">
// //                         {["home", "work", "other"].map((type) => (
// //                           <label
// //                             key={type}
// //                             className="flex items-center space-x-2 cursor-pointer"
// //                           >
// //                             <input
// //                               type="radio"
// //                               name="addressType"
// //                               value={type}
// //                               checked={formData.addressType === type}
// //                               onChange={handleInputChange}
// //                               className="w-4 h-4 text-orange-600 focus:ring-orange-500"
// //                             />
// //                             <span className="text-sm text-gray-700 capitalize">
// //                               {type}
// //                             </span>
// //                           </label>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}

// //               <div className="mt-4">
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Delivery Instructions (Optional)
// //                 </label>
// //                 <textarea
// //                   name="deliveryInstructions"
// //                   value={formData.deliveryInstructions}
// //                   onChange={handleInputChange}
// //                   rows={3}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
// //                   placeholder="e.g., Ring the doorbell, Leave at door, etc."
// //                 />
// //               </div>
// //             </div>

// //             {/* Payment Method */}
// //             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
// //               <h2 className="text-xl font-semibold text-gray-900 mb-6">
// //                 Payment Method
// //               </h2>

// //               <div className="space-y-4">
// //                 {/* <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
// //                   <div className="flex items-center space-x-3">
// //                     <input
// //                       type="radio"
// //                       id="razorpay"
// //                       name="paymentMethod"
// //                       value="razorpay"
// //                       checked={paymentMethod === "razorpay"}
// //                       onChange={(e) =>
// //                         setPaymentMethod(e.target.value as "razorpay" | "cod")
// //                       }
// //                       className="w-4 h-4 text-orange-600 focus:ring-orange-500"
// //                     />
// //                     <label
// //                       htmlFor="razorpay"
// //                       className="flex items-center space-x-3 cursor-pointer flex-1"
// //                     >
// //                       <div className="w-8 h-8 bg-blue-600 rounded text-white flex items-center justify-center text-sm font-bold">
// //                         R
// //                       </div>
// //                       <div>
// //                         <div className="font-medium text-gray-900">
// //                           Razorpay
// //                         </div>
// //                         <div className="text-sm text-gray-600">
// //                           Pay securely with cards, UPI, wallets
// //                         </div>
// //                       </div>
// //                     </label>
// //                   </div>
// //                 </div> */}

// //                 <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
// //                   <div className="flex items-center space-x-3">
// //                     <input
// //                       type="radio"
// //                       id="cod"
// //                       name="paymentMethod"
// //                       value="cod"
// //                       checked={paymentMethod === "cod"}
// //                       onChange={(e) =>
// //                         setPaymentMethod(e.target.value as "razorpay" | "cod")
// //                       }
// //                       className="w-4 h-4 text-orange-600 focus:ring-orange-500"
// //                     />
// //                     <label
// //                       htmlFor="cod"
// //                       className="flex items-center space-x-3 cursor-pointer flex-1"
// //                     >
// //                       <CreditCard className="w-8 h-8 text-green-600" />
// //                       <div>
// //                         <div className="font-medium text-gray-900">
// //                           Cash on Delivery
// //                         </div>
// //                         <div className="text-sm text-gray-600">
// //                           Pay with cash when your order arrives
// //                         </div>
// //                       </div>
// //                     </label>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Column - Order Summary */}
// //           <div className="lg:sticky lg:top-8 h-fit">
// //             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
// //               <h2 className="text-xl font-semibold text-gray-900 mb-6">
// //                 Order Summary
// //               </h2>

// //               {/* Food Items */}

// //                 {/* Food Items */}
// //                 <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
// //                   {itemsToCreateOrder.products.map((item, index) => (
// //                     <div key={index}>
// //                       <span>{item}</span>
// //                     </div>
// //                   ))}
// //                 </div>

// //             </div>

// //             {/* Estimated Delivery Time */}
// //             {/* <div className="flex items-center space-x-2 mb-6 p-3 bg-green-50 rounded-lg">
// //                 <Clock className="w-5 h-5 text-green-600" />
// //                 <span className="text-sm text-green-800 font-medium">
// //                   Estimated delivery: 25-35 minutes
// //                 </span>
// //               </div> */}

// //             {/* Price Breakdown */}
// //             <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 mt-10">
// //               <div className="flex justify-between text-sm">
// //                 <span className="text-gray-600">Subtotal</span>
// //                 <span className="text-gray-900">${orderSummary.subtotal}</span>
// //               </div>
// //               <div className="flex justify-between text-sm">
// //                 <span className="text-gray-600">Delivery Fee</span>
// //                 <span className="text-gray-900">
// //                   ${orderSummary.deliveryFee}
// //                 </span>
// //               </div>
// //               <div className="flex justify-between text-sm">
// //                 <span className="text-gray-600">Tax</span>
// //                 <span className="text-gray-900">${orderSummary.tax}</span>
// //               </div>
// //               <div className="flex justify-between text-sm">
// //                 <span className="text-gray-600">Discount</span>
// //                 <span className="text-green-600">
// //                   -${Math.abs(orderSummary.discount)}
// //                 </span>
// //               </div>
// //             </div>

// //             {/* Total */}
// //             <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
// //               <span>Total</span>
// //               <span>${orderSummary.total}</span>
// //             </div>

// //             {/* Place Order Button */}
// //             <button
// //               onClick={handleCompleteOrder}
// //               className="w-full bg-[#cb202d] text-white py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center space-x-2 mb-4 cursor-pointer"
// //             >
// //               <Lock className="w-5 h-5" />
// //               <span>Place Order</span>
// //             </button>

// //             {/* Security Features */}
// //             <div className="space-y-3">
// //               <div className="flex items-center space-x-2 text-sm text-gray-600">
// //                 <Shield className="w-4 h-4 text-green-600" />
// //                 <span>Secure Payment</span>
// //               </div>
// //               <div className="flex items-center space-x-2 text-sm text-gray-600">
// //                 <Truck className="w-4 h-4 text-blue-600" />
// //                 <span>Fast Delivery</span>
// //               </div>
// //               <div className="flex items-center space-x-2 text-sm text-gray-600">
// //                 <Award className="w-4 h-4 text-purple-600" />
// //                 <span>Quality Guaranteed</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FoodDeliveryCheckout;

// // import { useState, useEffect } from "react";
// // import { useSelector } from "react-redux";
// // import { MAP_API } from "../../../Constants/api";
// // import { useDispatch } from "react-redux";

// // import {
// //   CreditCard,
// //   Shield,
// //   Lock,
// //   Truck,
// //   Award,
// //   ArrowLeft,
// //   MapPin,
// //   ChevronDown,
// //   Plus,
// //   Home,
// //   Briefcase,
// //   Navigation,
// // } from "lucide-react";
// // import type { RootState } from "../../../redux/store";
// // import type { FormData } from "../../../Types/CreateOrderForm";
// // //import type { Address } from "../../../Types/OrderAddress";
// // import type { OrderSummary } from "../../../Types/OrderSummary";
// // import { fetchUserAddress } from "../../../services/userServices/userServices";
// // import { setOrderAddress } from "../../../redux/Slice/userSlice";

// // const FoodDeliveryCheckout: React.FC = () => {
// //   const dispatch = useDispatch();
// //   useEffect(() => {
// //     fetchAddress();
// //   }, []);
// //   const userId = useSelector((state: RootState) => state.user.id);
// //   const restaurentId = useSelector(
// //     (state: RootState) => state.user.restaurentData.id
// //   );
// //   const userName = useSelector((state: RootState) => state.user.name);
// //   const userEmail = useSelector((state: RootState) => state.user.email);
// //   const userPhone = useSelector((state: RootState) => state.user.mobile);
// //   const itemsToCreateOrder = useSelector(
// //     (state: RootState) => state.user.orderFromCart
// //   );
// //   const currentLocation = useSelector(
// //     (state: RootState) => state.user.addressOnLocation
// //   );
// //   const latitude = useSelector((state: RootState) => state.user.latitude);
// //   const longitude = useSelector((state: RootState) => state.user.longitude);
// //   const savedAddresses = useSelector(
// //     (state: RootState) => state.user.orderAddress
// //   );

// //   const fetchAddress = async () => {
// //     const response = await fetchUserAddress(userId);

// //     if (response) {
// //       console.log(response.addresses);
// //       dispatch(setOrderAddress(response.addresses));
// //     }
// //   };

// //   const [defaultAddress, setDefaultAddress] = useState("");
// //   const [currentAddress, setCurrentAddress] = useState("");
// //   const [formData, setFormData] = useState<FormData>({
// //     selectedAddress: "",
// //     customAddress: "",
// //     liveAddress: "",
// //     city: "",
// //     state: "",
// //     zipCode: "",
// //     landmark: "",
// //     addressType: "home",
// //     deliveryInstructions: "",
// //   });

// //   const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">(
// //     "razorpay"
// //   );
// //   const [showNewAddress, setShowNewAddress] = useState<boolean>(false);

// //   const [showCurrentLocationOption, setShowCurrentLocationOption] =
// //     useState<boolean>(false);
// //   const [liveAddress, setLiveAddress] = useState(false);

// //   const handleInputChange = (
// //     e: React.ChangeEvent<
// //       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
// //     >
// //   ) => {
// //     setDefaultAddress(e.target.value);
// //   };

// //   const handleUseCurrentLocation = () => {
// //     if (currentLocation) {
// //       setCurrentAddress(currentLocation);
// //       setLiveAddress(true);
// //     }
// //   };

// //   const handleCompleteOrder = async () => {
// //     console.log("Payment method:", paymentMethod);

// //     const data_for_checkout = {
// //       ...itemsToCreateOrder,
// //       userId: userId,
// //       hotelId: restaurentId,
// //       paymentMethod: paymentMethod,
// //       address: currentLocation,
// //     };

// //     // Mock order creation
// //     console.log("Creating order with data:", data_for_checkout);
// //     alert("Order created successfully!");
// //   };

// //   const getAddressIcon = (type: string) => {
// //     switch (type) {
// //       case "home":
// //         return <Home className="w-4 h-4" />;
// //       case "work":
// //         return <Briefcase className="w-4 h-4" />;
// //       default:
// //         return <MapPin className="w-4 h-4" />;
// //     }
// //   };

// //   const calculateAmount = (
// //     subtotal: number,
// //     deliveryFee: number,
// //     tax: number,
// //     discount: number
// //   ): number => {
// //     return Number((subtotal + deliveryFee + tax - discount).toFixed(2));
// //   };

// //   const subtotal = Number(itemsToCreateOrder.subtotal);
// //   const deliveryFee = Number(itemsToCreateOrder.deliveryfee);
// //   const tax = Number(itemsToCreateOrder.tax);
// //   const discount = Number(5.0 * itemsToCreateOrder.products.length);

// //   const orderSummary: OrderSummary = {
// //     subtotal,
// //     deliveryFee,
// //     tax,
// //     discount,
// //     total: calculateAmount(subtotal, deliveryFee, tax, discount),
// //   };

// //   return (
// //     <div className="min-h-screen bg-white">
// //       {/* Header */}
// //       <div className="bg-white shadow-sm border-b">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex items-center justify-between h-16">
// //             <div className="flex items-center">
// //               <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
// //                 <ArrowLeft className="w-5 h-5 mr-2" />
// //                 <span className="font-medium">Back</span>
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //           {/* Left Column - Forms */}
// //           <div className="space-y-6">
// //             {/* Contact Information */}
// //             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
// //               <h2 className="text-xl font-semibold text-gray-900 mb-6">
// //                 Contact Information
// //               </h2>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div>
// //                   <p className="text-sm font-medium text-gray-700 mb-1">Name</p>
// //                   <p className="text-[#cb202d] font-medium">
// //                     {userName || "Not provided"}
// //                   </p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm font-medium text-gray-700 mb-1">
// //                     Email
// //                   </p>
// //                   <p className="text-[#cb202d] font-medium">
// //                     {userEmail || "Not provided"}
// //                   </p>
// //                 </div>
// //               </div>
// //               <div className="mt-4">
// //                 <p className="text-sm font-medium text-gray-700 mb-1">
// //                   Phone Number
// //                 </p>
// //                 <p className="text-[#cb202d] font-medium">
// //                   {userPhone || "Not provided"}
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Delivery Address */}
// //             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
// //               <div className="flex items-center justify-between mb-6">
// //                 <h2 className="text-xl font-semibold text-gray-900">
// //                   Delivery Address
// //                 </h2>
// //                 <button
// //                   onClick={() => {
// //                     setShowNewAddress(!showNewAddress);
// //                     setShowCurrentLocationOption(false);
// //                   }}
// //                   className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 text-sm font-medium"
// //                 >
// //                   <Plus className="w-4 h-4 cursor-pointer" />
// //                   <span className="cursor-pointer">Add New Address</span>
// //                 </button>
// //               </div>

// //               {/* Saved Addresses */}
// //               <div className="space-y-3 mb-6">
// //                 {savedAddresses.map((address, index) => (
// //                   <div
// //                     key={index}
// //                     className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
// //                   >
// //                     <div className="flex items-start space-x-3">
// //                       <input
// //                         type="radio"
// //                         name="selectedAddress"
// //                         value={address} // store the whole address string
// //                         checked={defaultAddress === address}
// //                         onChange={handleInputChange}
// //                         className="w-4 h-4 text-orange-600 focus:ring-orange-500 mt-1"
// //                       />
// //                       <div className="flex-1">
// //                         <div className="flex items-center space-x-2 mb-2">
// //                           {getAddressIcon("home")}
// //                           <span className="text-sm font-medium text-gray-900 capitalize">
// //                             {address}
// //                           </span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>

// //               {/* Add New Address Form */}
// //               {showNewAddress && (
// //                 <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
// //                   <div className="flex items-center justify-between mb-4">
// //                     <h3 className="font-medium text-gray-900">
// //                       Add New Address
// //                     </h3>
// //                     {currentLocation && (
// //                       <button
// //                         onClick={() =>
// //                           setShowCurrentLocationOption(
// //                             !showCurrentLocationOption
// //                           )
// //                         }
// //                         className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
// //                       >
// //                         <Navigation className="w-4 h-4" />
// //                         <span>Use Current Location</span>
// //                       </button>
// //                     )}
// //                   </div>

// //                   {/* Current Location Option */}
// //                   {showCurrentLocationOption && currentLocation && (
// //                     <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
// //                       <div className="flex items-start space-x-3">
// //                         <MapPin className="w-5 h-5 text-blue-600 mt-1" />
// //                         <div className="flex-1">
// //                           <h4 className="font-medium text-blue-900 mb-2">
// //                             Current Location
// //                           </h4>

// //                           {/* Simple Map Visualization */}
// //                           <div className="rounded-lg h-48 overflow-hidden">
// //                             <iframe
// //                               src={`https://www.google.com/maps/embed/v1/view?key=${MAP_API}&center=${latitude},${longitude}&zoom=15&maptype=roadmap`}
// //                               width="100%"
// //                               height="100%"
// //                               style={{ border: 0 }}
// //                               allowFullScreen
// //                               loading="lazy"
// //                               referrerPolicy="no-referrer-when-downgrade"
// //                               title="Current Location Map"
// //                             />
// //                           </div>

// //                           <p className="text-sm text-gray-700 mb-3">
// //                             {currentLocation}
// //                           </p>
// //                           <div className="flex space-x-3">
// //                             <button
// //                               onClick={handleUseCurrentLocation}
// //                               className="bg-[#cb202d] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#cb205d] transition-colors cursor-pointer"
// //                             >
// //                               Use This Location
// //                             </button>
// //                             <button
// //                               onClick={() =>
// //                                 setShowCurrentLocationOption(false)
// //                               }
// //                               className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors cursor-pointer"
// //                             >
// //                               Cancel
// //                             </button>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   )}

// //                   {liveAddress && (
// //                     <div className="flex items-start space-x-3">
// //                       <input
// //                         id={`address-${currentLocation}`}
// //                         name="selectedAddress"
// //                         className="w-4 h-4 text-orange-600 focus:ring-orange-500 mt-1"
// //                       />
// //                       <div className="flex-1"></div>
// //                     </div>
// //                   )}
// //                   <div className="space-y-4">
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Full Address
// //                       </label>
// //                       <input
// //                         type="text"
// //                         name="customAddress"
// //                         value={currentAddress}
// //                         onChange={handleInputChange}
// //                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
// //                         placeholder="123 Main Street, Apartment 4B"
// //                       />
// //                     </div>

// //                     {/* no live address */}

// //                     {!liveAddress && (
// //                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-2">
// //                             City
// //                           </label>
// //                           <input
// //                             type="text"
// //                             name="city"
// //                             value={defaultAddress}
// //                             onChange={handleInputChange}
// //                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
// //                             placeholder="New York"
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-2">
// //                             State
// //                           </label>
// //                           <div className="relative">
// //                             <select
// //                               name="state"
// //                               value={defaultAddress}
// //                               onChange={handleInputChange}
// //                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none"
// //                             >
// //                               <option value="">Select State</option>
// //                               <option value="NY">New York</option>
// //                               <option value="CA">California</option>
// //                               <option value="TX">Texas</option>
// //                               <option value="FL">Florida</option>
// //                             </select>
// //                             <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// //                           </div>
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-2">
// //                             ZIP Code
// //                           </label>
// //                           <input
// //                             type="text"
// //                             name="zipCode"
// //                             value={defaultAddress}
// //                             onChange={handleInputChange}
// //                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
// //                             placeholder="10001"
// //                           />
// //                         </div>
// //                       </div>
// //                     )}

// //                     {/* no live address */}

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Landmark (Optional)
// //                       </label>
// //                       <input
// //                         type="text"
// //                         name="landmark"
// //                         //value={}
// //                         onChange={handleInputChange}
// //                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
// //                         placeholder="Near Central Park"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}

// //               <div className="mt-4">
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Delivery Instructions (Optional)
// //                 </label>
// //                 <textarea
// //                   name="deliveryInstructions"
// //                   // value={formData.deliveryInstructions}
// //                   onChange={handleInputChange}
// //                   rows={3}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
// //                   placeholder="e.g., Ring the doorbell, Leave at door, etc."
// //                 />
// //               </div>
// //             </div>

// //             {/* Payment Method */}
// //             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
// //               <h2 className="text-xl font-semibold text-gray-900 mb-6">
// //                 Payment Method
// //               </h2>

// //               <div className="space-y-4">
// //                 <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
// //                   <div className="flex items-center space-x-3">
// //                     <input
// //                       type="radio"
// //                       id="razorpay"
// //                       name="paymentMethod"
// //                       value="razorpay"
// //                       checked={paymentMethod === "razorpay"}
// //                       onChange={(e) =>
// //                         setPaymentMethod(e.target.value as "razorpay" | "cod")
// //                       }
// //                       className="w-4 h-4 text-orange-600 focus:ring-orange-500"
// //                     />
// //                     <label
// //                       htmlFor="razorpay"
// //                       className="flex items-center space-x-3 cursor-pointer flex-1"
// //                     >
// //                       <div className="w-8 h-8 bg-blue-600 rounded text-white flex items-center justify-center text-sm font-bold">
// //                         R
// //                       </div>
// //                       <div>
// //                         <div className="font-medium text-gray-900">
// //                           Razorpay
// //                         </div>
// //                         <div className="text-sm text-gray-600">
// //                           Pay securely with cards, UPI, wallets
// //                         </div>
// //                       </div>
// //                     </label>
// //                   </div>
// //                 </div>

// //                 <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
// //                   <div className="flex items-center space-x-3">
// //                     <input
// //                       type="radio"
// //                       id="cod"
// //                       name="paymentMethod"
// //                       value="cod"
// //                       checked={paymentMethod === "cod"}
// //                       onChange={(e) =>
// //                         setPaymentMethod(e.target.value as "razorpay" | "cod")
// //                       }
// //                       className="w-4 h-4 text-orange-600 focus:ring-orange-500"
// //                     />
// //                     <label
// //                       htmlFor="cod"
// //                       className="flex items-center space-x-3 cursor-pointer flex-1"
// //                     >
// //                       <CreditCard className="w-8 h-8 text-green-600" />
// //                       <div>
// //                         <div className="font-medium text-gray-900">
// //                           Cash on Delivery
// //                         </div>
// //                         <div className="text-sm text-gray-600">
// //                           Pay with cash when your order arrives
// //                         </div>
// //                       </div>
// //                     </label>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Column - Order Summary */}
// //           <div className="lg:sticky lg:top-8 h-fit">
// //             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
// //               <h2 className="text-xl font-semibold text-gray-900 mb-6">
// //                 Order Summary
// //               </h2>

// //               {/* Food Items */}
// //               <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
// //                 {itemsToCreateOrder.products.map((item, index) => (
// //                   <div
// //                     key={index}
// //                     className="flex justify-between items-center"
// //                   >
// //                     <span className="text-gray-700">{item}</span>
// //                   </div>
// //                 ))}
// //               </div>

// //               {/* Price Breakdown */}
// //               <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-gray-600">Subtotal</span>
// //                   <span className="text-gray-900">
// //                     {" "}
// //                     ₹{orderSummary.subtotal}
// //                   </span>
// //                 </div>
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-gray-600">Delivery Fee</span>
// //                   <span className="text-gray-900">
// //                     {" "}
// //                     ₹{orderSummary.deliveryFee}
// //                   </span>
// //                 </div>
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-gray-600">Tax</span>
// //                   <span className="text-gray-900"> ₹{orderSummary.tax}</span>
// //                 </div>
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-gray-600">Discount</span>
// //                   <span className="text-green-600">
// //                     - ₹{Math.abs(orderSummary.discount)}
// //                   </span>
// //                 </div>
// //               </div>

// //               {/* Total */}
// //               <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
// //                 <span>Total</span>
// //                 <span> ₹{orderSummary.total}</span>
// //               </div>

// //               {/* Place Order Button */}
// //               <button
// //                 onClick={handleCompleteOrder}
// //                 className="w-full bg-[#cb202d] text-white py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center space-x-2 mb-4 cursor-pointer"
// //               >
// //                 <Lock className="w-5 h-5" />
// //                 <span>Place Order</span>
// //               </button>

// //               {/* Security Features */}
// //               <div className="space-y-3">
// //                 <div className="flex items-center space-x-2 text-sm text-gray-600">
// //                   <Shield className="w-4 h-4 text-green-600" />
// //                   <span>Secure Payment</span>
// //                 </div>
// //                 <div className="flex items-center space-x-2 text-sm text-gray-600">
// //                   <Truck className="w-4 h-4 text-blue-600" />
// //                   <span>Fast Delivery</span>
// //                 </div>
// //                 <div className="flex items-center space-x-2 text-sm text-gray-600">
// //                   <Award className="w-4 h-4 text-purple-600" />
// //                   <span>Quality Guaranteed</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FoodDeliveryCheckout;

// import { useState, useEffect } from "react";
// import { MAP_API } from "../../../Constants/api";
// import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "../../../services/userServices/userServices";
// import { clearCartfromRedux } from "../../../redux/Slice/userSlice";

// import {
//   CreditCard,
//   Shield,
//   Lock,
//   Truck,
//   Award,
//   ArrowLeft,
//   MapPin,
//   ChevronDown,
//   Plus,
//   Home,
//   Briefcase,
//   Navigation,
// } from "lucide-react";
// import type { RootState } from "../../../redux/store";
// import {
//   fetchUserAddress,
//   placeOrder,
// } from "../../../services/userServices/userServices";
// import { setOrderAddress } from "../../../redux/Slice/userSlice";
// import { getCoordinatesFromAddress } from "../../../utils/Location Services/getCoordinatesFromAddress";
// import { useNavigate } from "react-router-dom";

// const FoodDeliveryCheckout: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const addressFromServer = useSelector(
//     (state: RootState) => state.user.orderAddress
//   );

//   const itemsToCreateOrder = useSelector(
//     (state: RootState) => state.user.orderFromCart
//   );

//   const [savedAddresses, setSavedAddresses] =
//     useState<string[]>(addressFromServer);

//   const userId = useSelector((state: RootState) => state.user.id);
//   const restaurentId = useSelector(
//     (state: RootState) => state.user.restaurentData.id
//   );

//   const hotelId = useSelector(
//     (state: RootState) => state.user.hotelIdForCheckout
//   );
//   console.log("Hotel id:::::::::", restaurentId);
//   const userName = useSelector((state: RootState) => state.user.name);
//   const userEmail = useSelector((state: RootState) => state.user.email);
//   const userPhone = useSelector((state: RootState) => state.user.mobile);

//   const currentLocation = useSelector(
//     (state: RootState) => state.user.addressOnLocation
//   );
//   const latitude = useSelector((state: RootState) => state.user.latitude);
//   const longitude = useSelector((state: RootState) => state.user.longitude);

//   const fetchAddress = async () => {
//     const response = await fetchUserAddress(userId);

//     if (response) {
//       console.log(response.addresses);
//       dispatch(setOrderAddress(response.addresses));
//     }
//   };

//   useEffect(() => {
//     fetchAddress();
//   }, []);

//   // State for selected address - this will be a single string for checkout
//   const [selectedAddressForCheckout, setSelectedAddressForCheckout] =
//     useState<string>("");

//   // Form data for new address
//   const [newAddressForm, setNewAddressForm] = useState({
//     fullAddress: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     landmark: "",
//     addressType: "home" as "home" | "work" | "other",
//   });

//   const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">(
//     "razorpay"
//   );
//   const [showNewAddress, setShowNewAddress] = useState<boolean>(false);
//   const [showCurrentLocationOption, setShowCurrentLocationOption] =
//     useState<boolean>(false);
//   const [deliveryInstructions, setDeliveryInstructions] = useState<string>("");

//   // Handle saved address selection
//   const handleSavedAddressSelect = (address: string) => {
//     setSelectedAddressForCheckout(address);
//     setShowNewAddress(false);
//     setShowCurrentLocationOption(false);
//   };

//   // Handle current location selection
//   const handleUseCurrentLocation = () => {
//     if (currentLocation) {
//       setSelectedAddressForCheckout(currentLocation);
//       setShowNewAddress(false);
//       setShowCurrentLocationOption(false);
//     }
//   };

//   // Handle new address form changes
//   const handleNewAddressChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setNewAddressForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Save new address and select it
//   const handleSaveNewAddress = () => {
//     const { fullAddress, city, state, zipCode, landmark } = newAddressForm;

//     if (!fullAddress.trim()) {
//       alert("Please enter a full address");
//       return;
//     }

//     // Create a complete address string
//     let completeAddress = fullAddress;

//     if (city || state || zipCode) {
//       const locationParts = [city, state, zipCode].filter(Boolean);
//       if (locationParts.length > 0) {
//         completeAddress += ", " + locationParts.join(", ");
//       }
//     }

//     if (landmark.trim()) {
//       completeAddress += ` (Near ${landmark})`;
//     }

//     // Add to saved addresses (in real app this would call an API)
//     const updatedAddresses = [...savedAddresses, completeAddress];
//     setSavedAddresses(updatedAddresses);

//     // Select this new address for checkout
//     setSelectedAddressForCheckout(completeAddress);

//     // Reset form and close
//     setNewAddressForm({
//       fullAddress: "",
//       city: "",
//       state: "",
//       zipCode: "",
//       landmark: "",
//       addressType: "home",
//     });
//     setShowNewAddress(false);
//   };

//   // Handle order completion
//   const handleCompleteOrder = async () => {
//     // Validate address selection
//     if (!selectedAddressForCheckout.trim()) {
//       alert("Please select a delivery address");
//       return;
//     }

//     console.log("Payment method:", paymentMethod);

//     const data_for_checkout = {
//       ...itemsToCreateOrder,
//       userId: userId,
//       hotelId: restaurentId,
//       paymentMethod: paymentMethod,
//       address: selectedAddressForCheckout,
//       deliveryInstructions: deliveryInstructions,
//       totalAmount: orderSummary.total,
//     };

//     const lat = await getCoordinatesFromAddress(data_for_checkout.address);

//     const data = {
//       ...data_for_checkout,
//       ...lat,
//       hotelId: hotelId,
//     };

//     const response = await placeOrder(data);
//     if (response.success) {
//       alert(response.message);
//     } else {
//       alert(response.message);
//     }
//     await clearCart(userId);
//     dispatch(clearCartfromRedux());
//     navigate("/user/restaurent_Details");
//   };

//   const getAddressIcon = (type: string) => {
//     switch (type) {
//       case "home":
//         return <Home className="w-4 h-4" />;
//       case "work":
//         return <Briefcase className="w-4 h-4" />;
//       default:
//         return <MapPin className="w-4 h-4" />;
//     }
//   };

//   const calculateAmount = (
//     subtotal: number,
//     deliveryFee: number,
//     tax: number,
//     discount: number
//   ): number => {
//     return Number((subtotal + deliveryFee + tax - discount).toFixed(2));
//   };

//   const subtotal = Number(itemsToCreateOrder.subtotal);
//   const deliveryFee = Number(itemsToCreateOrder.deliveryfee);
//   const tax = Number(itemsToCreateOrder.tax);
//   const discount = Number(5.0 * itemsToCreateOrder.products.length);

//   const totalAmount = calculateAmount(subtotal, deliveryFee, tax, discount);

//   const orderSummary = {
//     subtotal,
//     deliveryFee,
//     tax,
//     discount,
//     total: totalAmount,
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
//                 <ArrowLeft className="w-5 h-5 mr-2" />
//                 <span className="font-medium">Back</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Left Column - Forms */}
//           <div className="space-y-6">
//             {/* Contact Information */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">
//                 Contact Information
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm font-medium text-gray-700 mb-1">Name</p>
//                   <p className="text-[#cb202d] font-medium">
//                     {userName || "Not provided"}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </p>
//                   <p className="text-[#cb202d] font-medium">
//                     {userEmail || "Not provided"}
//                   </p>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <p className="text-sm font-medium text-gray-700 mb-1">
//                   Phone Number
//                 </p>
//                 <p className="text-[#cb202d] font-medium">
//                   {userPhone || "Not provided"}
//                 </p>
//               </div>
//             </div>

//             {/* Delivery Address */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-semibold text-gray-900">
//                   Delivery Address
//                 </h2>
//                 <button
//                   onClick={() => {
//                     setShowNewAddress(!showNewAddress);
//                     setShowCurrentLocationOption(false);
//                   }}
//                   className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 text-sm font-medium"
//                 >
//                   <Plus className="w-4 h-4 cursor-pointer" />
//                   <span className="cursor-pointer">Add New Address</span>
//                 </button>
//               </div>

//               {/* Selected Address Display */}
//               {selectedAddressForCheckout && (
//                 <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
//                   <div className="flex items-start space-x-3">
//                     <MapPin className="w-5 h-5 text-green-600 mt-1" />
//                     <div>
//                       <p className="text-sm font-medium text-green-800">
//                         Selected Address:
//                       </p>
//                       <p className="text-sm text-green-700">
//                         {selectedAddressForCheckout}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Saved Addresses */}
//               <div className="space-y-3 mb-6">
//                 {savedAddresses.map((address, index) => (
//                   <div
//                     key={index}
//                     className={`border rounded-lg p-4 hover:border-orange-300 transition-colors cursor-pointer ${
//                       selectedAddressForCheckout === address
//                         ? "border-orange-500 bg-orange-50"
//                         : "border-gray-200"
//                     }`}
//                     onClick={() => handleSavedAddressSelect(address)}
//                   >
//                     <div className="flex items-start space-x-3">
//                       <input
//                         type="radio"
//                         name="selectedAddress"
//                         value={address}
//                         checked={selectedAddressForCheckout === address}
//                         onChange={() => handleSavedAddressSelect(address)}
//                         className="w-4 h-4 text-orange-600 focus:ring-orange-500 mt-1"
//                       />
//                       <div className="flex-1">
//                         <div className="flex items-center space-x-2 mb-2">
//                           {getAddressIcon("home")}
//                           <span className="text-sm font-medium text-gray-900">
//                             Saved Address
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-600">{address}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Add New Address Form */}
//               {showNewAddress && (
//                 <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="font-medium text-gray-900">
//                       Add New Address
//                     </h3>
//                     {currentLocation && (
//                       <button
//                         onClick={() =>
//                           setShowCurrentLocationOption(
//                             !showCurrentLocationOption
//                           )
//                         }
//                         className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
//                       >
//                         <Navigation className="w-4 h-4" />
//                         <span>Use Current Location</span>
//                       </button>
//                     )}
//                   </div>

//                   {/* Current Location Option */}
//                   {showCurrentLocationOption && currentLocation && (
//                     <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
//                       <div className="flex items-start space-x-3">
//                         <MapPin className="w-5 h-5 text-blue-600 mt-1" />
//                         <div className="flex-1">
//                           <h4 className="font-medium text-blue-900 mb-2">
//                             Current Location
//                           </h4>

//                           {/* Map Display */}
//                           {latitude && longitude && (
//                             <div className="rounded-lg h-48 overflow-hidden mb-3">
//                               <iframe
//                                 src={`https://www.google.com/maps/embed/v1/view?key=${MAP_API}&center=${latitude},${longitude}&zoom=15&maptype=roadmap`}
//                                 width="100%"
//                                 height="100%"
//                                 style={{ border: 0 }}
//                                 allowFullScreen
//                                 loading="lazy"
//                                 referrerPolicy="no-referrer-when-downgrade"
//                                 title="Current Location Map"
//                               />
//                             </div>
//                           )}

//                           <p className="text-sm text-gray-700 mb-3">
//                             {currentLocation}
//                           </p>
//                           <div className="flex space-x-3">
//                             <button
//                               onClick={handleUseCurrentLocation}
//                               className="bg-[#cb202d] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#b01d26] transition-colors"
//                             >
//                               Use This Location
//                             </button>
//                             <button
//                               onClick={() =>
//                                 setShowCurrentLocationOption(false)
//                               }
//                               className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {/* New Address Form Fields */}
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Full Address *
//                       </label>
//                       <input
//                         type="text"
//                         name="fullAddress"
//                         value={newAddressForm.fullAddress}
//                         onChange={handleNewAddressChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
//                         placeholder="123 Main Street, Apartment 4B"
//                       />
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           City
//                         </label>
//                         <input
//                           type="text"
//                           name="city"
//                           value={newAddressForm.city}
//                           onChange={handleNewAddressChange}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
//                           placeholder="New York"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           State
//                         </label>
//                         <div className="relative">
//                           <select
//                             name="state"
//                             value={newAddressForm.state}
//                             onChange={handleNewAddressChange}
//                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none"
//                           >
//                             <option value="">Select State</option>
//                             <option value="NY">New York</option>
//                             <option value="CA">California</option>
//                             <option value="TX">Texas</option>
//                             <option value="FL">Florida</option>
//                           </select>
//                           <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         </div>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           ZIP Code
//                         </label>
//                         <input
//                           type="text"
//                           name="zipCode"
//                           value={newAddressForm.zipCode}
//                           onChange={handleNewAddressChange}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
//                           placeholder="10001"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Landmark (Optional)
//                       </label>
//                       <input
//                         type="text"
//                         name="landmark"
//                         value={newAddressForm.landmark}
//                         onChange={handleNewAddressChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
//                         placeholder="Near Central Park"
//                       />
//                     </div>

//                     <div className="flex space-x-3">
//                       <button
//                         onClick={handleSaveNewAddress}
//                         className="bg-[#cb202d] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#b01d26] transition-colors"
//                       >
//                         Save Address
//                       </button>
//                       <button
//                         onClick={() => setShowNewAddress(false)}
//                         className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="mt-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Delivery Instructions (Optional)
//                 </label>
//                 <textarea
//                   value={deliveryInstructions}
//                   onChange={(e) => setDeliveryInstructions(e.target.value)}
//                   rows={3}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
//                   placeholder="e.g., Ring the doorbell, Leave at door, etc."
//                 />
//               </div>
//             </div>

//             {/* Payment Method */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">
//                 Payment Method
//               </h2>

//               <div className="space-y-4">
//                 <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
//                   <div className="flex items-center space-x-3">
//                     <input
//                       type="radio"
//                       id="razorpay"
//                       name="paymentMethod"
//                       value="razorpay"
//                       checked={paymentMethod === "razorpay"}
//                       onChange={(e) =>
//                         setPaymentMethod(e.target.value as "razorpay" | "cod")
//                       }
//                       className="w-4 h-4 text-orange-600 focus:ring-orange-500"
//                     />
//                     <label
//                       htmlFor="razorpay"
//                       className="flex items-center space-x-3 cursor-pointer flex-1"
//                     >
//                       <div className="w-8 h-8 bg-blue-600 rounded text-white flex items-center justify-center text-sm font-bold">
//                         R
//                       </div>
//                       <div>
//                         <div className="font-medium text-gray-900">
//                           Razorpay
//                         </div>
//                         <div className="text-sm text-gray-600">
//                           Pay securely with cards, UPI, wallets
//                         </div>
//                       </div>
//                     </label>
//                   </div>
//                 </div>

//                 <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
//                   <div className="flex items-center space-x-3">
//                     <input
//                       type="radio"
//                       id="cod"
//                       name="paymentMethod"
//                       value="cod"
//                       checked={paymentMethod === "cod"}
//                       onChange={(e) =>
//                         setPaymentMethod(e.target.value as "razorpay" | "cod")
//                       }
//                       className="w-4 h-4 text-orange-600 focus:ring-orange-500"
//                     />
//                     <label
//                       htmlFor="cod"
//                       className="flex items-center space-x-3 cursor-pointer flex-1"
//                     >
//                       <CreditCard className="w-8 h-8 text-green-600" />
//                       <div>
//                         <div className="font-medium text-gray-900">
//                           Cash on Delivery
//                         </div>
//                         <div className="text-sm text-gray-600">
//                           Pay with cash when your order arrives
//                         </div>
//                       </div>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Order Summary */}
//           <div className="lg:sticky lg:top-8 h-fit">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">
//                 Order Summary
//               </h2>

//               {/* Food Items */}
//               <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
//                 {itemsToCreateOrder.products.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-between items-center"
//                   >
//                     <div className="flex flex-col items-start">
//                       <span className="font-medium">Item</span>
//                       <span className="text-red-700">{item[0]}</span>
//                     </div>
//                     <div className="flex flex-col items-start">
//                       <span className="font-medium">Qty</span>
//                       <span className="text-red-700">{item[1]}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Price Breakdown */}
//               <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span className="text-gray-900">
//                     ₹{orderSummary.subtotal}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Delivery Fee</span>
//                   <span className="text-gray-900">
//                     ₹{orderSummary.deliveryFee}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Tax</span>
//                   <span className="text-gray-900">₹{orderSummary.tax}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Discount</span>
//                   <span className="text-green-600">
//                     -₹{Math.abs(orderSummary.discount)}
//                   </span>
//                 </div>
//               </div>

//               {/* Total */}
//               <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
//                 <span>Total</span>
//                 <span>₹{orderSummary.total}</span>
//               </div>

//               {/* Place Order Button */}
//               <button
//                 onClick={handleCompleteOrder}
//                 disabled={!selectedAddressForCheckout}
//                 className={`w-full py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 mb-4 ${
//                   selectedAddressForCheckout
//                     ? "bg-[#cb202d] text-white hover:bg-[#b01d26] cursor-pointer"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }`}
//               >
//                 <Lock className="w-5 h-5" />
//                 <span>Place Order</span>
//               </button>

//               {!selectedAddressForCheckout && (
//                 <p className="text-sm text-red-600 text-center mb-4">
//                   Please select a delivery address to continue
//                 </p>
//               )}

//               {/* Security Features */}
//               <div className="space-y-3">
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <Shield className="w-4 h-4 text-green-600" />
//                   <span>Secure Payment</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <Truck className="w-4 h-4 text-blue-600" />
//                   <span>Fast Delivery</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <Award className="w-4 h-4 text-purple-600" />
//                   <span>Quality Guaranteed</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FoodDeliveryCheckout;

// new checkout page>>>>>>>>>>>>>>>>>>

// import { useState, useEffect } from "react";
// import { MAP_API } from "../../../Constants/api";
// import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "../../../services/userServices/userServices";
// import { clearCartfromRedux, setOrderAddress } from "../../../redux/Slice/userSlice";
// import {
//   CreditCard,
//   Shield,
//   Lock,
//   Truck,
//   Award,
//   ArrowLeft,
//   MapPin,
//   ChevronDown,
//   Plus,
//   Home,
//   Briefcase,
//   Navigation,
// } from "lucide-react";
// import type { RootState } from "../../../redux/store";
// import { fetchUserAddress, placeOrder } from "../../../services/userServices/userServices";
// import { getCoordinatesFromAddress } from "../../../utils/Location Services/getCoordinatesFromAddress";
// import { useNavigate } from "react-router-dom";

// // Define types for order items and address
// interface OrderItem {
//   productName: string;
//   quantity: number;
//   productPrice: number;
// }

// interface Address {
//   address: string;
//   type: "home" | "work" | "other";
// }

// interface OrderFromCart {
//   items: OrderItem[];
//   subtotal: string;
//   deliveryfee: string;
//   tax: string;
//   totalAmountToPay: string;
// }

// const FoodDeliveryCheckout: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Redux state
//   const addressFromServer = useSelector((state: RootState) => state.user.orderAddress);
//   const itemsToCreateOrder = useSelector((state: RootState) => state.user.orderFromCart) as OrderFromCart;
//   console.log("Items to create order from redux:>>>>>",itemsToCreateOrder.items)
//   const defaultAddress = useSelector((state: RootState) => state.user.defaultAddress);
//   const userId = useSelector((state: RootState) => state.user.id);
//   const restaurentId = useSelector((state: RootState) => state.user.restaurentData.id);
//   const hotelId = useSelector((state: RootState) => state.user.hotelIdForCheckout);
//   const userName = useSelector((state: RootState) => state.user.name);
//   const userEmail = useSelector((state: RootState) => state.user.email);
//   const userPhone = useSelector((state: RootState) => state.user.mobile);
//   const currentLocation = useSelector((state: RootState) => state.user.addressOnLocation);
//   const latitude = useSelector((state: RootState) => state.user.latitude);
//   const longitude = useSelector((state: RootState) => state.user.longitude);

//   // Fetch saved addresses
//   const fetchAddress = async () => {
//     try {
//       const response = await fetchUserAddress(userId);
//       if (response) {
//         dispatch(setOrderAddress(response.addresses));
//       }
//     } catch (error) {
//       console.error("Failed to fetch addresses:", error);
//       alert("Failed to load saved addresses. Please try again.");
//     }
//   };

//   useEffect(() => {
//     fetchAddress();
//   }, []);

//   // Initialize saved addresses and preselect default if available
//   const [savedAddresses, setSavedAddresses] = useState<Address[]>(
//     addressFromServer.map((addr) => ({ address: addr, type: "home" }))
//   );
//   const [selectedAddressForCheckout, setSelectedAddressForCheckout] = useState<string>(
//     defaultAddress.fullAddress ? `${defaultAddress.fullAddress}, ${defaultAddress.city}, ${defaultAddress.state} ${defaultAddress.zipcode}` : ""
//   );
//   const [newAddressForm, setNewAddressForm] = useState({
//     fullAddress: defaultAddress.fullAddress || "",
//     city: defaultAddress.city || "",
//     state: defaultAddress.state || "",
//     zipCode: defaultAddress.zipcode || "",
//     landmark: "",
//     addressType: "home" as "home" | "work" | "other",
//   });
//   const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");
//   const [showNewAddress, setShowNewAddress] = useState<boolean>(false);
//   const [showCurrentLocationOption, setShowCurrentLocationOption] = useState<boolean>(false);
//   const [deliveryInstructions, setDeliveryInstructions] = useState<string>("");

//   // Handle saved address selection
//   const handleSavedAddressSelect = (address: string) => {
//     setSelectedAddressForCheckout(address);
//     setShowNewAddress(false);
//     setShowCurrentLocationOption(false);
//   };

//   // Handle current location selection
//   const handleUseCurrentLocation = () => {
//     if (currentLocation) {
//       setSelectedAddressForCheckout(currentLocation);
//       setShowNewAddress(false);
//       setShowCurrentLocationOption(false);
//     }
//   };

//   // Handle new address form changes
//   const handleNewAddressChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setNewAddressForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Save new address and select it
//   const handleSaveNewAddress = () => {
//     const { fullAddress, city, state, zipCode, landmark, addressType } = newAddressForm;
//     if (!fullAddress.trim()) {
//       alert("Please enter a full address");
//       return;
//     }

//     let completeAddress = `${addressType.toUpperCase()}: ${fullAddress}`;
//     if (city || state || zipCode) {
//       const locationParts = [city, state, zipCode].filter(Boolean);
//       if (locationParts.length > 0) {
//         completeAddress += ", " + locationParts.join(", ");
//       }
//     }
//     if (landmark.trim()) {
//       completeAddress += ` (Near ${landmark})`;
//     }

//     const newAddress: Address = { address: completeAddress, type: addressType };
//     setSavedAddresses([...savedAddresses, newAddress]);
//     setSelectedAddressForCheckout(completeAddress);
//     setNewAddressForm({
//       fullAddress: "",
//       city: "",
//       state: "",
//       zipCode: "",
//       landmark: "",
//       addressType: "home",
//     });
//     setShowNewAddress(false);
//     // Optionally save to server
//     // saveAddressToServer(completeAddress);
//   };

//   // Handle order completion
//   const handleCompleteOrder = async () => {
//     if (!selectedAddressForCheckout.trim()) {
//       alert("Please select a delivery address");
//       return;
//     }

//     try {
//       const lat = await getCoordinatesFromAddress(selectedAddressForCheckout);
//       const data = {
//         items: itemsToCreateOrder.items,
//         userId,
//         hotelId: hotelId || restaurentId,
//         paymentMethod,
//         address: selectedAddressForCheckout,
//         deliveryInstructions,
//         totalAmount: Number(itemsToCreateOrder.totalAmountToPay),
//         subtotal: Number(itemsToCreateOrder.subtotal),
//         deliveryfee: Number(itemsToCreateOrder.deliveryfee),
//         tax: Number(itemsToCreateOrder.tax),
//         ...lat,
//       };

//       const response = await placeOrder(data);
//       if (response.success) {
//         alert(response.message);
//         await clearCart(userId);
//         dispatch(clearCartfromRedux());
//         navigate("/user/restaurent_Details");
//       } else {
//         alert(response.message || "Failed to place order. Please try again.");
//       }
//     } catch (error) {
//       console.error("Order placement error:", error);
//       alert("An error occurred while placing the order. Please try again.");
//     }
//   };

//   const getAddressIcon = (address: string) => {
//     const type = address.toLowerCase().startsWith("home") ? "home" :
//                  address.toLowerCase().startsWith("work") ? "work" : "other";
//     switch (type) {
//       case "home":
//         return <Home className="w-4 h-4" />;
//       case "work":
//         return <Briefcase className="w-4 h-4" />;
//       default:
//         return <MapPin className="w-4 h-4" />;
//     }
//   };

//   // Order summary (using Redux state directly)
//   const orderSummary = {
//     subtotal: Number(itemsToCreateOrder.subtotal),
//     deliveryFee: Number(itemsToCreateOrder.deliveryfee),
//     tax: Number(itemsToCreateOrder.tax),
//     discount: Number(5.0 * itemsToCreateOrder.items.length), // Kept as is; consider moving to server
//     total: Number(itemsToCreateOrder.totalAmountToPay),
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <button
//                 onClick={() => navigate("/user/restaurent_Details")}
//                 className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5 mr-2" />
//                 <span className="font-medium">Back</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Left Column - Forms */}
//           <div className="space-y-6">
//             {/* Contact Information */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">
//                 Contact Information
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm font-medium text-gray-700 mb-1">Name</p>
//                   <p className="text-[#cb202d] font-medium">
//                     {userName || "Not provided"}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-700 mb-1">Email</p>
//                   <p className="text-[#cb202d] font-medium">
//                     {userEmail || "Not provided"}
//                   </p>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <p className="text-sm font-medium text-gray-700 mb-1">Phone Number</p>
//                 <p className="text-[#cb202d] font-medium">
//                   {userPhone || "Not provided"}
//                 </p>
//               </div>
//             </div>

//             {/* Delivery Address */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-semibold text-gray-900">Delivery Address</h2>
//                 <button
//                   onClick={() => {
//                     setShowNewAddress(!showNewAddress);
//                     setShowCurrentLocationOption(false);
//                   }}
//                   className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 text-sm font-medium"
//                 >
//                   <Plus className="w-4 h-4 cursor-pointer" />
//                   <span className="cursor-pointer">Add New Address</span>
//                 </button>
//               </div>

//               {/* Selected Address Display */}
//               {selectedAddressForCheckout && (
//                 <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
//                   <div className="flex items-start space-x-3">
//                     <MapPin className="w-5 h-5 text-green-600 mt-1" />
//                     <div>
//                       <p className="text-sm font-medium text-green-800">Selected Address:</p>
//                       <p className="text-sm text-green-700">{selectedAddressForCheckout}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Saved Addresses */}
//               <div className="space-y-3 mb-6">
//                 {savedAddresses.map((address, index) => (
//                   <div
//                     key={index}
//                     className={`border rounded-lg p-4 hover:border-orange-300 transition-colors cursor-pointer ${
//                       selectedAddressForCheckout === address.address
//                         ? "border-orange-500 bg-orange-50"
//                         : "border-gray-200"
//                     }`}
//                     onClick={() => handleSavedAddressSelect(address.address)}
//                   >
//                     <div className="flex items-start space-x-3">
//                       <input
//                         type="radio"
//                         name="selectedAddress"
//                         value={address.address}
//                         checked={selectedAddressForCheckout === address.address}
//                         onChange={() => handleSavedAddressSelect(address.address)}
//                         className="w-4 h-4 text-orange-600 focus:ring-orange-500 mt-1"
//                       />
//                       <div className="flex-1">
//                         <div className="flex items-center space-x-2 mb-2">
//                           {getAddressIcon(address.address)}
//                           <span className="text-sm font-medium text-gray-900">
//                             {address.type.charAt(0).toUpperCase() + address.type.slice(1)}
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-600">{address.address}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Add New Address Form */}
//               {showNewAddress && (
//                 <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="font-medium text-gray-900">Add New Address</h3>
//                     {currentLocation && (
//                       <button
//                         onClick={() => setShowCurrentLocationOption(!showCurrentLocationOption)}
//                         className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
//                       >
//                         <Navigation className="w-4 h-4" />
//                         <span>Use Current Location</span>
//                       </button>
//                     )}
//                   </div>

//                   {/* Current Location Option */}
//                   {showCurrentLocationOption && currentLocation && (
//                     <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
//                       <div className="flex items-start space-x-3">
//                         <MapPin className="w-5 h-5 text-blue-600 mt-1" />
//                         <div className="flex-1">
//                           <h4 className="font-medium text-blue-900 mb-2">Current Location</h4>
//                           {latitude && longitude && (
//                             <div className="rounded-lg h-48 overflow-hidden mb-3">
//                               <iframe
//                                 src={`https://www.google.com/maps/embed/v1/view?key=${MAP_API}&center=${latitude},${longitude}&zoom=15&maptype=roadmap`}
//                                 width="100%"
//                                 height="100%"
//                                 style={{ border: 0 }}
//                                 allowFullScreen
//                                 loading="lazy"
//                                 referrerPolicy="no-referrer-when-downgrade"
//                                 title="Current Location Map"
//                               />
//                             </div>
//                           )}
//                           <p className="text-sm text-gray-700 mb-3">{currentLocation}</p>
//                           <div className="flex space-x-3">
//                             <button
//                               onClick={handleUseCurrentLocation}
//                               className="bg-[#cb202d] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#b01d26] transition-colors"
//                             >
//                               Use This Location
//                             </button>
//                             <button
//                               onClick={() => setShowCurrentLocationOption(false)}
//                               className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {/* New Address Form Fields */}
//                   <div className="space-y-4">
//                     <div>
//                       <label
//                         htmlFor="fullAddress"
//                         className="block text-sm font-medium text-gray-700 mb-2"
//                       >
//                         Full Address *
//                       </label>
//                       <input
//                         id="fullAddress"
//                         type="text"
//                         name="fullAddress"
//                         value={newAddressForm.fullAddress}
//                         onChange={handleNewAddressChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
//                         placeholder="123 Main Street, Apartment 4B"
//                         aria-required="true"
//                       />
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div>
//                         <label
//                           htmlFor="city"
//                           className="block text-sm font-medium text-gray-700 mb-2"
//                         >
//                           City
//                         </label>
//                         <input
//                           id="city"
//                           type="text"
//                           name="city"
//                           value={newAddressForm.city}
//                           onChange={handleNewAddressChange}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
//                           placeholder="New York"
//                         />
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="state"
//                           className="block text-sm font-medium text-gray-700 mb-2"
//                         >
//                           State
//                         </label>
//                         <div className="relative">
//                           <select
//                             id="state"
//                             name="state"
//                             value={newAddressForm.state}
//                             onChange={handleNewAddressChange}
//                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none"
//                           >
//                             <option value="">Select State</option>
//                             {/* Update with Indian states */}
//                             <option value="MH">Maharashtra</option>
//                             <option value="DL">Delhi</option>
//                             <option value="KA">Karnataka</option>
//                             <option value="TN">Tamil Nadu</option>
//                           </select>
//                           <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         </div>
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="zipCode"
//                           className="block text-sm font-medium text-gray-700 mb-2"
//                         >
//                           ZIP Code
//                         </label>
//                         <input
//                           id="zipCode"
//                           type="text"
//                           name="zipCode"
//                           value={newAddressForm.zipCode}
//                           onChange={handleNewAddressChange}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
//                           placeholder="400001"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="landmark"
//                         className="block text-sm font-medium text-gray-700 mb-2"
//                       >
//                         Landmark (Optional)
//                       </label>
//                       <input
//                         id="landmark"
//                         type="text"
//                         name="landmark"
//                         value={newAddressForm.landmark}
//                         onChange={handleNewAddressChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
//                         placeholder="Near Central Park"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Address Type
//                       </label>
//                       <div className="flex space-x-4">
//                         {["home", "work", "other"].map((type) => (
//                           <label key={type} className="flex items-center space-x-2 cursor-pointer">
//                             <input
//                               type="radio"
//                               name="addressType"
//                               value={type}
//                               checked={newAddressForm.addressType === type}
//                               onChange={handleNewAddressChange}
//                               className="w-4 h-4 text-orange-600 focus:ring-orange-500"
//                             />
//                             <span className="text-sm text-gray-700 capitalize">{type}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="flex space-x-3">
//                       <button
//                         onClick={handleSaveNewAddress}
//                         className="bg-[#cb202d] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#b01d26] transition-colors"
//                       >
//                         Save Address
//                       </button>
//                       <button
//                         onClick={() => setShowNewAddress(false)}
//                         className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="mt-4">
//                 <label
//                   htmlFor="deliveryInstructions"
//                   className="block text-sm font-medium text-gray-700 mb-2"
//                 >
//                   Delivery Instructions (Optional)
//                 </label>
//                 <textarea
//                   id="deliveryInstructions"
//                   value={deliveryInstructions}
//                   onChange={(e) => setDeliveryInstructions(e.target.value)}
//                   rows={3}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
//                   placeholder="e.g., Ring the doorbell, Leave at door, etc."
//                 />
//               </div>
//             </div>

//             {/* Payment Method */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
//               <div className="space-y-4">
//                 <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
//                   <div className="flex items-center space-x-3">
//                     <input
//                       type="radio"
//                       id="razorpay"
//                       name="paymentMethod"
//                       value="razorpay"
//                       checked={paymentMethod === "razorpay"}
//                       onChange={(e) => setPaymentMethod(e.target.value as "razorpay" | "cod")}
//                       className="w-4 h-4 text-orange-600 focus:ring-orange-500"
//                     />
//                     <label
//                       htmlFor="razorpay"
//                       className="flex items-center space-x-3 cursor-pointer flex-1"
//                     >
//                       <div className="w-8 h-8 bg-blue-600 rounded text-white flex items-center justify-center text-sm font-bold">
//                         R
//                       </div>
//                       <div>
//                         <div className="font-medium text-gray-900">Razorpay</div>
//                         <div className="text-sm text-gray-600">
//                           Pay securely with cards, UPI, wallets
//                         </div>
//                       </div>
//                     </label>
//                   </div>
//                 </div>

//                 <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
//                   <div className="flex items-center space-x-3">
//                     <input
//                       type="radio"
//                       id="cod"
//                       name="paymentMethod"
//                       value="cod"
//                       checked={paymentMethod === "cod"}
//                       onChange={(e) => setPaymentMethod(e.target.value as "razorpay" | "cod")}
//                       className="w-4 h-4 text-orange-600 focus:ring-orange-500"
//                     />
//                     <label
//                       htmlFor="cod"
//                       className="flex items-center space-x-3 cursor-pointer flex-1"
//                     >
//                       <CreditCard className="w-8 h-8 text-green-600" />
//                       <div>
//                         <div className="font-medium text-gray-900">Cash on Delivery</div>
//                         <div className="text-sm text-gray-600">
//                           Pay with cash when your order arrives
//                         </div>
//                       </div>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Order Summary */}
//           <div className="lg:sticky lg:top-8 h-fit">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

//               {/* Food Items */}
//             <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
//                 {itemsToCreateOrder.items.map((item: OrderItem, index: number) => (
//                   <div key={index} className="flex justify-between items-center">
//                     <div className="flex flex-col items-start">
//                       <span className="font-medium">Item</span>
//                       <span className="text-red-700">{item.productName}</span>
//                     </div>
//                     <div className="flex flex-col items-start">
//                       <span className="font-medium">Qty</span>
//                       <span className="text-red-700">{item.quantity}</span>
//                     </div>
//                     <div className="flex flex-col items-end">
//                       <span className="font-medium">Price</span>
//                       <span className="text-red-700">₹{item.productPrice}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Price Breakdown */}
//               <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span className="text-gray-900">₹{orderSummary.subtotal}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Delivery Fee</span>
//                   <span className="text-gray-900">₹{orderSummary.deliveryFee}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Tax</span>
//                   <span className="text-gray-900">₹{orderSummary.tax}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Discount</span>
//                   <span className="text-green-600">-₹{Math.abs(orderSummary.discount)}</span>
//                 </div>
//               </div>

//               {/* Total */}
//               <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
//                 <span>Total</span>
//                 <span>₹{orderSummary.total.toFixed(2)}</span>
//               </div>

//               {/* Place Order Button */}
//               <button
//                 onClick={handleCompleteOrder}
//                 disabled={!selectedAddressForCheckout}
//                 className={`w-full py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 mb-4 ${
//                   selectedAddressForCheckout
//                     ? "bg-[#cb202d] text-white hover:bg-[#b01d26] cursor-pointer"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }`}
//               >
//                 <Lock className="w-5 h-5" />
//                 <span>Place Order</span>
//               </button>

//               {!selectedAddressForCheckout && (
//                 <p className="text-sm text-red-600 text-center mb-4">
//                   Please select a delivery address to continue
//                 </p>
//               )}

//               {/* Security Features */}
//               <div className="space-y-3">
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <Shield className="w-4 h-4 text-green-600" />
//                   <span>Secure Payment</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <Truck className="w-4 h-4 text-blue-600" />
//                   <span>Fast Delivery</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <Award className="w-4 h-4 text-purple-600" />
//                   <span>Quality Guaranteed</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FoodDeliveryCheckout;

// checkout page final>>>>>>>>>>>>>>>>>>>>>>>

import { useState, useEffect } from "react";
import { MAP_API } from "../../../Constants/api";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../../services/userServices/userServices";
import {
  clearCartfromRedux,
  setOrderAddress,
} from "../../../redux/Slice/userSlice";
import {
  CreditCard,
  Shield,
  Lock,
  Truck,
  Award,
  ArrowLeft,
  MapPin,
  ChevronDown,
  Plus,
  Home,
  Briefcase,
  Navigation,
} from "lucide-react";
import type { RootState } from "../../../redux/store";
import {
  fetchUserAddress,
  placeOrder,
} from "../../../services/userServices/userServices";
import { getCoordinatesFromAddress } from "../../../utils/Location Services/getCoordinatesFromAddress";
import { useNavigate } from "react-router-dom";


// Define types for order items and address
interface OrderItem {
  productName: string;
  quantity: number;
  selectedVariant?: {
    name?: string;
  };
  productPrice: number;
  variants?: string[]; // Added to support variants
}

interface Address {
  address: string;
  type: "home" | "work" | "other";
}

interface OrderFromCart {
  items: OrderItem[];
  subtotal: string;
  deliveryfee: string;
  tax: string;
  totalAmountToPay: string;
}

const FoodDeliveryCheckout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const addressFromServer = useSelector(
    (state: RootState) => state.user.orderAddress
  );
  const itemsToCreateOrder = useSelector(
    (state: RootState) => state.user.orderFromCart
  ) as OrderFromCart;
  const defaultAddress = useSelector(
    (state: RootState) => state.user.defaultAddress
  );
  const userId = useSelector((state: RootState) => state.user.id);
  const restaurantId = useSelector(
    (state: RootState) => state.user.restaurentData.id
  ); // Fixed typo
  const hotelId = useSelector(
    (state: RootState) => state.user.hotelIdForCheckout
  );
  const userName = useSelector((state: RootState) => state.user.name);
  const userEmail = useSelector((state: RootState) => state.user.email);
  const userPhone = useSelector((state: RootState) => state.user.mobile);
  const currentLocation = useSelector(
    (state: RootState) => state.user.addressOnLocation
  );
  const latitude = useSelector((state: RootState) => state.user.latitude);
  const longitude = useSelector((state: RootState) => state.user.longitude);

  // Fetch saved addresses
  const fetchAddress = async () => {
    try {
      const response = await fetchUserAddress(userId);
      if (response) {
        dispatch(setOrderAddress(response.addresses));
      }
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
      alert("Failed to load saved addresses. Please try again.");
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  // Initialize saved addresses and preselect default if available
  const [savedAddresses, setSavedAddresses] = useState<Address[]>(
    addressFromServer.map((addr) => ({ address: addr, type: "home" }))
  );
  const [selectedAddressForCheckout, setSelectedAddressForCheckout] =
    useState<string>(
      defaultAddress.fullAddress
        ? `${defaultAddress.fullAddress}, ${defaultAddress.city}, ${defaultAddress.state} ${defaultAddress.zipcode}`
        : ""
    );
  const [newAddressForm, setNewAddressForm] = useState({
    fullAddress: defaultAddress.fullAddress || "",
    city: defaultAddress.city || "",
    state: defaultAddress.state || "",
    zipCode: defaultAddress.zipcode || "",
    landmark: "",
    addressType: "home" as "home" | "work" | "other",
  });
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">(
    "razorpay"
  );
  const [showNewAddress, setShowNewAddress] = useState<boolean>(false);
  const [showCurrentLocationOption, setShowCurrentLocationOption] =
    useState<boolean>(false);
  const [deliveryInstructions, setDeliveryInstructions] = useState<string>("");

  // Handle saved address selection
  const handleSavedAddressSelect = (address: string) => {
    setSelectedAddressForCheckout(address);
    setShowNewAddress(false);
    setShowCurrentLocationOption(false);
  };

  // Handle current location selection
  const handleUseCurrentLocation = () => {
    if (currentLocation) {
      setSelectedAddressForCheckout(currentLocation);
      setShowNewAddress(false);
      setShowCurrentLocationOption(false);
    }
  };

  // Handle new address form changes
  const handleNewAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  // Save new address and select it
  const handleSaveNewAddress = () => {
    const { fullAddress, city, state, zipCode, landmark, addressType } =
      newAddressForm;
    if (!fullAddress.trim()) {
      alert("Please enter a full address");
      return;
    }

    let completeAddress = `${addressType.toUpperCase()}: ${fullAddress}`;
    if (city || state || zipCode) {
      const locationParts = [city, state, zipCode].filter(Boolean);
      if (locationParts.length > 0) {
        completeAddress += ", " + locationParts.join(", ");
      }
    }
    if (landmark.trim()) {
      completeAddress += ` (Near ${landmark})`;
    }

    const newAddress: Address = { address: completeAddress, type: addressType };
    setSavedAddresses([...savedAddresses, newAddress]);
    setSelectedAddressForCheckout(completeAddress);
    setNewAddressForm({
      fullAddress: "",
      city: "",
      state: "",
      zipCode: "",
      landmark: "",
      addressType: "home",
    });
    setShowNewAddress(false);
    // Optionally save to server
    // saveAddressToServer(completeAddress);
  };

  // Handle order completion
  const handleCompleteOrder = async () => {

    


    if (!selectedAddressForCheckout.trim()) {
      alert("Please select a delivery address");
      return;
    }
    if (itemsToCreateOrder.items.length === 0) {
      alert("Your cart is empty. Please add items to proceed.");
      return;
    }

    try {
      const lat = await getCoordinatesFromAddress(selectedAddressForCheckout);
      const data = {
        items: itemsToCreateOrder.items,
        userId,
        hotelId: hotelId || restaurantId,
        paymentMethod,
        address: selectedAddressForCheckout,
        deliveryInstructions,
        totalAmount: Number(itemsToCreateOrder.totalAmountToPay),
        subtotal: Number(itemsToCreateOrder.subtotal),
        deliveryfee: Number(itemsToCreateOrder.deliveryfee),
        tax: Number(itemsToCreateOrder.tax),
        ...lat,
      };

      console.log("Data for creating the order:",data)

      const response = await placeOrder(data);
      if (response.success) {
        alert(response.message);
        await clearCart(userId);
        dispatch(clearCartfromRedux());
        navigate("/user/restaurent_Details"); // Fixed typo
      } else {
        alert(response.message || "Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("An error occurred while placing the order. Please try again.");
    }
  };

  const getAddressIcon = (address: string) => {
    const type = address.toLowerCase().startsWith("home")
      ? "home"
      : address.toLowerCase().startsWith("work")
      ? "work"
      : "other";
    switch (type) {
      case "home":
        return <Home className="w-4 h-4" />;
      case "work":
        return <Briefcase className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  // Order summary (using Redux state directly)
  const orderSummary = {
    subtotal: Number(itemsToCreateOrder.subtotal) || 0,
    deliveryFee: Number(itemsToCreateOrder.deliveryfee) || 0,
    tax: Number(itemsToCreateOrder.tax) || 0,
    discount: Number(5.0 * itemsToCreateOrder.items.length) || 0, // Consider moving to server
    total: Number(itemsToCreateOrder.totalAmountToPay) || 0,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/user/restaurant_Details")} // Fixed typo
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="font-medium">Back</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Name</p>
                  <p className="text-[#cb202d] font-medium">
                    {userName || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Email
                  </p>
                  <p className="text-[#cb202d] font-medium">
                    {userEmail || "Not provided"}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </p>
                <p className="text-[#cb202d] font-medium">
                  {userPhone || "Not provided"}
                </p>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Delivery Address
                </h2>
                <button
                  onClick={() => {
                    setShowNewAddress(!showNewAddress);
                    setShowCurrentLocationOption(false);
                  }}
                  className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 text-sm font-medium"
                >
                  <Plus className="w-4 h-4 cursor-pointer" />
                  <span className="cursor-pointer">Add New Address</span>
                </button>
              </div>

              {/* Selected Address Display */}
              {selectedAddressForCheckout && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Selected Address:
                      </p>
                      <p className="text-sm text-green-700">
                        {selectedAddressForCheckout}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Saved Addresses */}
              <div className="space-y-3 mb-6">
                {savedAddresses.map((address, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 hover:border-orange-300 transition-colors cursor-pointer ${
                      selectedAddressForCheckout === address.address
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200"
                    }`}
                    onClick={() => handleSavedAddressSelect(address.address)}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        name="selectedAddress"
                        value={address.address}
                        checked={selectedAddressForCheckout === address.address}
                        onChange={() =>
                          handleSavedAddressSelect(address.address)
                        }
                        className="w-4 h-4 text-orange-600 focus:ring-orange-500 mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getAddressIcon(address.address)}
                          <span className="text-sm font-medium text-gray-900">
                            {address.type.charAt(0).toUpperCase() +
                              address.type.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {address.address}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Address Form */}
              {showNewAddress && (
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">
                      Add New Address
                    </h3>
                    {currentLocation && (
                      <button
                        onClick={() =>
                          setShowCurrentLocationOption(
                            !showCurrentLocationOption
                          )
                        }
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        <Navigation className="w-4 h-4" />
                        <span>Use Current Location</span>
                      </button>
                    )}
                  </div>

                  {/* Current Location Option */}
                  {showCurrentLocationOption && currentLocation && (
                    <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-medium text-blue-900 mb-2">
                            Current Location
                          </h4>
                          {latitude && longitude && (
                            <div className="rounded-lg h-48 overflow-hidden mb-3">
                              <iframe
                                src={`https://www.google.com/maps/embed/v1/view?key=${MAP_API}&center=${latitude},${longitude}&zoom=15&maptype=roadmap`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Current Location Map"
                              />
                            </div>
                          )}
                          <p className="text-sm text-gray-700 mb-3">
                            {currentLocation}
                          </p>
                          <div className="flex space-x-3">
                            <button
                              onClick={handleUseCurrentLocation}
                              className="bg-[#cb202d] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#b01d26] transition-colors"
                            >
                              Use This Location
                            </button>
                            <button
                              onClick={() =>
                                setShowCurrentLocationOption(false)
                              }
                              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* New Address Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="fullAddress"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Address *
                      </label>
                      <input
                        id="fullAddress"
                        type="text"
                        name="fullAddress"
                        value={newAddressForm.fullAddress}
                        onChange={handleNewAddressChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="123 Main Street, Apartment 4B"
                        aria-required="true"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          City
                        </label>
                        <input
                          id="city"
                          type="text"
                          name="city"
                          value={newAddressForm.city}
                          onChange={handleNewAddressChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          placeholder="Mumbai"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          State
                        </label>
                        <div className="relative">
                          <select
                            id="state"
                            name="state"
                            value={newAddressForm.state}
                            onChange={handleNewAddressChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none"
                          >
                            <option value="">Select State</option>
                            <option value="MH">Maharashtra</option>
                            <option value="DL">Delhi</option>
                            <option value="KA">Karnataka</option>
                            <option value="TN">Tamil Nadu</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="zipCode"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          ZIP Code
                        </label>
                        <input
                          id="zipCode"
                          type="text"
                          name="zipCode"
                          value={newAddressForm.zipCode}
                          onChange={handleNewAddressChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          placeholder="400001"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="landmark"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Landmark (Optional)
                      </label>
                      <input
                        id="landmark"
                        type="text"
                        name="landmark"
                        value={newAddressForm.landmark}
                        onChange={handleNewAddressChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Near Central Park"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Type
                      </label>
                      <div className="flex space-x-4">
                        {["home", "work", "other"].map((type) => (
                          <label
                            key={type}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="addressType"
                              value={type}
                              checked={newAddressForm.addressType === type}
                              onChange={handleNewAddressChange}
                              className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                            />
                            <span className="text-sm text-gray-700 capitalize">
                              {type}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={handleSaveNewAddress}
                        className="bg-[#cb202d] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#b01d26] transition-colors"
                      >
                        Save Address
                      </button>
                      <button
                        onClick={() => setShowNewAddress(false)}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4">
                <label
                  htmlFor="deliveryInstructions"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Delivery Instructions (Optional)
                </label>
                <textarea
                  id="deliveryInstructions"
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="e.g., Ring the doorbell, Leave at door, etc."
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Payment Method
              </h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="razorpay"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === "razorpay"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as "razorpay" | "cod")
                      }
                      className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                    />
                    <label
                      htmlFor="razorpay"
                      className="flex items-center space-x-3 cursor-pointer flex-1"
                    >
                      <div className="w-8 h-8 bg-blue-600 rounded text-white flex items-center justify-center text-sm font-bold">
                        R
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Razorpay
                        </div>
                        <div className="text-sm text-gray-600">
                          Pay securely with cards, UPI, wallets
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as "razorpay" | "cod")
                      }
                      className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                    />
                    <label
                      htmlFor="cod"
                      className="flex items-center space-x-3 cursor-pointer flex-1"
                    >
                      <CreditCard className="w-8 h-8 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900">
                          Cash on Delivery
                        </div>
                        <div className="text-sm text-gray-600">
                          Pay with cash when your order arrives
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Food Items Table */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th
                          scope="col"
                          className="px-4 py-3 font-semibold text-sm text-gray-900"
                        >
                          Item
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 font-semibold text-sm text-gray-900"
                        ></th>
                        <th
                          scope="col"
                          className="px-4 py-3 font-semibold text-sm text-gray-900 text-center"
                        >
                          Qty
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 font-semibold text-sm text-gray-900 text-right"
                        >
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemsToCreateOrder.items.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-4 py-4 text-center text-gray-600"
                          >
                            Your cart is empty
                          </td>
                        </tr>
                      ) : (
                        <>
                          {itemsToCreateOrder.items.map(
                            (item: OrderItem, index: number) => (
                              <tr
                                key={index}
                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                              >
                                <td className="px-4 py-3 text-[#cb202d] font-medium truncate max-w-[200px]">
                                  {item.selectedVariant.name +
                                    " " +
                                    item.productName}
                                </td>
                                <td className="px-4 py-3 text-[#cb202d] font-medium truncate max-w-[150px]">
                                  {item.variants && item.variants.length > 0
                                    ? item.variants.join(", ")
                                    : ""}
                                </td>
                                <td className="px-4 py-3 text-[#cb202d] font-medium text-center">
                                  {item.quantity}
                                </td>
                                <td className="px-4 py-3 text-[#cb202d] font-medium text-right">
                                  ₹{(item.productPrice || 0).toFixed(2)}
                                </td>
                              </tr>
                            )
                          )}
                          {/* Total Row */}
                          <tr className="font-bold bg-gray-50">
                            <td className="px-4 py-3 text-gray-900">Total</td>
                            <td className="px-4 py-3 text-gray-900"></td>
                            <td className="px-4 py-3 text-gray-900 text-center">
                              {itemsToCreateOrder.items.reduce(
                                (sum, item) => sum + item.quantity,
                                0
                              )}
                            </td>
                            <td className="px-4 py-3 text-gray-900 text-right">
                              ₹{orderSummary.total.toFixed(2)}
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">
                    ₹{orderSummary.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-900">
                    ₹{orderSummary.deliveryFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">
                    ₹{orderSummary.tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">
                    −₹{Math.abs(orderSummary.discount).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span>₹{orderSummary.total.toFixed(2)}</span>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handleCompleteOrder}
                disabled={
                  !selectedAddressForCheckout ||
                  itemsToCreateOrder.items.length === 0
                }
                className={`w-full py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 mb-4 ${
                  selectedAddressForCheckout &&
                  itemsToCreateOrder.items.length > 0
                    ? "bg-[#cb202d] text-white hover:bg-[#b01d26] cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Lock className="w-5 h-5" />
                <span>Place Order</span>
              </button>

              {(!selectedAddressForCheckout ||
                itemsToCreateOrder.items.length === 0) && (
                <p className="text-sm text-red-600 text-center mb-4">
                  {itemsToCreateOrder.items.length === 0
                    ? "Your cart is empty. Please add items to proceed."
                    : "Please select a delivery address to continue"}
                </p>
              )}

              {/* Security Features */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span>Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDeliveryCheckout;
