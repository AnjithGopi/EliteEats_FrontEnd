// import { useEffect, useState } from "react";
// import {
//   ShoppingCart,
//   Trash2,
//   Clock,
//   MapPin,
//   CreditCard,
//   Truck,
//   Shield,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import {
//   getCart,
//   incrementCartItem,
//   decrementCartItem,
//   deleteItemFromCart,
//   clearCart,
// } from "../../../services/userServices/userServices";
// import { useSelector, useDispatch } from "react-redux";
// import type { RootState } from "../../../redux/store";
// import {
//   addCart,
//   orderFromCart,
//   setHotelIdForCheckout,
// } from "../../../redux/Slice/userSlice";
// import NavBar from "../../Home/NavBar";

// interface CartItem {
//   _id?: string;
//   productName?: string;
//   description?: string;
//   productImage?: string;
//   price?: number;
//   quantity?: number;
//   prepTime?: string;
//   calories?: number;
//   spicy?: boolean;
//   totalPrice?: number;
//   productPrice?: number;
// }

// function UserCart() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const userId = useSelector((state: RootState) => state.user.id);
//   const isAuthenticated = useSelector(
//     (state: RootState) => state.user.isAuthenticated
//   );
//   const [quantity, setQuantity] = useState(0);

//   const user = useSelector((state: RootState) => state.user.name);
//   const handleIncrement = async (itemId: string) => {
//     console.log("increment clicked for item:", itemId);

//     let productQuantity = cartItems.find(
//       (item) => item._id === itemId
//     )?.quantity;

//     const data = {
//       userId,
//       itemId,
//       quantity: (productQuantity += 1),
//     };
//     const response = await incrementCartItem(data);
//     console.log(response);
//     const updatedCart = await fetchCart(userId);
//     dispatch(addCart(updatedCart));
//   };

//   const handleDecrement = async (itemId: string) => {
//     console.log("Decrement clicked for item:", itemId);
//     let productQuantity = cartItems.find(
//       (item) => item._id === itemId
//     )?.quantity;

//     const data = {
//       userId,
//       itemId,
//       quantity: (productQuantity -= 1),
//     };
//     const response = await decrementCartItem(data);
//     console.log(response);
//     const updatedCart = await fetchCart(userId);
//     dispatch(addCart(updatedCart));
//   };

//   const fetchCart = async (userId: string) => {
//     try {
//       const response = await getCart(userId);
//       console.log("Cart response :>>>>", response);

//       if (!response.items.length) {
//         const clearCartresponse = await clearCart(userId);
//         console.log("Cart cleared:", clearCartresponse);
//       }
//       if (!response) {
//         console.log("Cart is empty ! no response");
//       } else {
//         console.log("cart items:", response.hotelId);
//         dispatch(addCart(response));
//         dispatch(setHotelIdForCheckout(response.hotelId));
//       }
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchCart(userId);
//     }
//   }, [userId]);

//   const cartItems: CartItem[] = useSelector(
//     (state: RootState) => state.user.cart
//   );
//   console.log("Cart items from redux=", cartItems);

//   const handleClick = () => {
//     navigate("/user/home");
//   };

//   const removeItem = async (itemId: string) => {
//     const data = {
//       userId,
//       itemId,
//     };

//     const response = await deleteItemFromCart(data);
//     if (response) {
//       const cartResponse = await fetchCart(userId);
//       dispatch(addCart(cartResponse));
//     }
//   };

//   const productname = cartItems.map((item) => [
//     item.productName,
//     item.quantity,
//   ]);

//   const handleCheckout = () => {
//     dispatch(
//       orderFromCart({
//         productname: productname,
//         subtotal: subtotal,
//         deliveryfee: deliveryFee,
//         tax: tax,
//         totalAmoutToPay: total,
//       })
//     );
//     navigate("/user/checkout");
//   };

//   // Calculate totals

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.productPrice * item.quantity,
//     0
//   );
//   const deliveryFee = subtotal > 1000 ? 0 : 4.99;
//   const tax = subtotal * 0.08;
//   const total = subtotal + deliveryFee + tax;

//   const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
//   // const estimatedTime =
//   //   cartItems.length > 0
//   //     ? Math.max(...cartItems.map((item) => parseInt(item.prepTime))) + 5
//   //     : 0;

//   if (!cartItems || cartItems.length === 0) {
//     return (
//       <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="fixed top-0 left-0 right-0 z-50">
//           <NavBar isAuthenticated={isAuthenticated} user={user} />
//         </div>

//         <div className="container mx-auto px-6 py-10 mt-20">
//           <div className="max-w-2xl mx-auto text-center">
//             <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
//               <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
//                 <ShoppingCart className="w-16 h-16 text-gray-400" />
//               </div>
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">
//                 Your cart is empty
//               </h2>
//               <p className="text-gray-600 text-lg mb-8">
//                 Looks like you haven't added any delicious items to your cart
//                 yet.
//               </p>
//               <button
//                 onClick={handleClick}
//                 className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
//               >
//                 Start Shopping
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="fixed top-0 left-0 right-0 z-50">
//         <NavBar isAuthenticated={isAuthenticated} user={user} />
//       </div>

//       <div className="container mx-auto mt-20 px-6 py-10">
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Delivery Info */}
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//               <div className="flex items-center space-x-4 mb-4">
//                 <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
//                   <Truck className="w-6 h-6 text-green-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-gray-800">
//                     {subtotal > 50 ? "Free Delivery" : "Delivery Available"}
//                   </h3>
//                   {/* <p className="text-sm text-gray-600">
//                     {subtotal > 50
//                       ? "Your order qualifies for free delivery!"
//                       : `Add $${(50 - subtotal).toFixed(2)} more for free delivery`}
//                   </p> */}
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div className="flex items-center space-x-2 text-gray-600">
//                   <Clock className="w-4 h-4" />
//                   {/* <span>
//                     Estimated: {estimatedTime}-{estimatedTime + 5} min
//                   </span> */}
//                 </div>
//                 <div className="flex items-center space-x-2 text-gray-600">
//                   <MapPin className="w-4 h-4" />
//                   <span>2.5 km away</span>
//                 </div>
//               </div>
//             </div>

//             {/* Cart Items List */}
//             <div className="space-y-5">
//               {cartItems.map((item) => (
//                 <div
//                   key={item._id}
//                   className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100/50 backdrop-blur-sm"
//                 >
//                   <div className="p-6">
//                     <div className="flex items-start space-x-6">
//                       {/* Item Image */}
//                       <div className="flex-shrink-0 relative group">
//                         <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 ring-1 ring-gray-200/50">
//                           <img
//                             src={item.productImage}
//                             alt={item.productName}
//                             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                           />
//                         </div>
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
//                       </div>

//                       {/* Item Details */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-start justify-between mb-4">
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center space-x-2 mb-2">
//                               <h3 className="text-lg font-bold text-gray-900 truncate">
//                                 {item.selectedVariant?.name +" " || ""}
//                                 {item.productName}
//                               </h3>
//                               {item.spicy && (
//                                 <span className="text-red-500 text-sm">🌶️</span>
//                               )}
//                             </div>
//                             <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                               {item.description}
//                             </p>

//                             <div className="flex items-center space-x-4 text-xs text-gray-500">
//                               <div className="flex items-center space-x-1">
//                                 <Clock className="w-3.5 h-3.5" />
//                                 <span className="font-medium">
//                                   {item.prepTime}
//                                 </span>
//                               </div>
//                               <div className="flex items-center space-x-1">
//                                 <span className="font-medium">
//                                   {item.calories} cal
//                                 </span>
//                               </div>
//                             </div>
//                           </div>

//                           <button
//                             onClick={() => removeItem(item._id)}
//                             className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 flex-shrink-0 group"
//                           >
//                             <Trash2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
//                           </button>
//                         </div>

//                         {/* Price and Quantity */}
//                         <div className="flex items-center justify-between mb-4">
//                           <div className="flex items-center space-x-4">
//                             <div className="flex items-center space-x-1 bg-gray-50 rounded-xl p-1 border border-gray-200/50">
//                               <button
//                                 className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//                                 onClick={() => handleDecrement(item._id)}
//                                 disabled={item.quantity <= 1} // Disable if quantity is 1
//                               >
//                                 <span className="font-bold text-sm">-</span>
//                               </button>

//                               <div className="px-3 py-2 min-w-[3rem] text-center">
//                                 <span className="font-bold text-gray-900 text-sm">
//                                   Qty: {item.quantity}
//                                 </span>
//                               </div>

//                               <button
//                                 className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//                                 onClick={() => handleIncrement(item._id)}
//                               >
//                                 <span className="font-bold text-sm">+</span>
//                               </button>
//                             </div>
//                           </div>

//                           <div className="text-right">
//                             <div className="text-xl font-bold text-gray-900">
//                               ₹{item.productPrice * item.quantity || 0} 
//                             </div>
//                             <div className="text-sm text-gray-500">
//                               ₹{item.productPrice} each
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-24">
//               <h3 className="text-xl font-bold text-gray-800 mb-6">
//                 Order Summary
//               </h3>

//               {/* Order Breakdown */}
//               <div className="space-y-3 mb-6">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Subtotal ({totalItems} items)</span>
//                   <span> ₹{subtotal}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Delivery Fee</span>
//                   <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Tax</span>
//                   <span> ₹{tax}</span>
//                 </div>
//                 <div className="border-t pt-3">
//                   <div className="flex justify-between font-bold text-xl text-gray-800">
//                     <span>Total</span>
//                     <span> ₹{total}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Checkout Button */}
//               <button
//                 onClick={handleCheckout}
//                 className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
//               >
//                 Proceed to Checkout
//               </button>

//               {/* Additional Info */}
//               <div className="space-y-3 text-sm text-gray-600">
//                 <div className="flex items-center space-x-2">
//                   <Shield className="w-4 h-4 text-green-500" />
//                   <span>100% Quality Guaranteed</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Clock className="w-4 h-4 text-blue-500" />
//                   {/* <span>
//                     Ready in {estimatedTime}-{estimatedTime + 5} minutes
//                   </span> */}
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <CreditCard className="w-4 h-4 text-purple-500" />
//                   <span>Secure payment processing</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserCart;




// new one....................................>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Trash2,
  Clock,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  incrementCartItem,
  decrementCartItem,
  deleteItemFromCart,
  clearCart,
} from "../../../services/userServices/userServices";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../redux/store";
import {
  addCart,
  orderFromCart,
  setHotelIdForCheckout,
} from "../../../redux/Slice/userSlice";
import NavBar from "../../Home/NavBar";

interface Variant {
  name: string;
  price: number;
}

interface Addon {
  name: string;
  price: number;
}

interface CartItem {
  _id?: string;
  productName?: string;
  description?: string;
  productImage?: string;
  price?: number;
  quantity?: number;
  prepTime?: string;
  calories?: number;
  spicy?: boolean;
  totalPrice?: number;
  productPrice?: number;
  selectedVariant?: Variant;
  selectedAddons?: Addon[];
  itemTotalPrice?: number;
  originalItemPrice?: number;
}

function UserCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.id);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const [quantity, setQuantity] = useState(0);

  const user = useSelector((state: RootState) => state.user.name);
  
  const handleIncrement = async (itemId: string) => {
    console.log("increment clicked for item:", itemId);

    let productQuantity = cartItems.find(
      (item) => item._id === itemId
    )?.quantity;

    const data = {
      userId,
      itemId,
      quantity: (productQuantity += 1),
    };
    const response = await incrementCartItem(data);
    console.log(response);
    const updatedCart = await fetchCart(userId);
    dispatch(addCart(updatedCart));
  };

  const handleDecrement = async (itemId: string) => {
    console.log("Decrement clicked for item:", itemId);
    let productQuantity = cartItems.find(
      (item) => item._id === itemId
    )?.quantity;

    console.log("productQuantity:",productQuantity)

    const data = {
      userId,
      itemId,
      quantity: (productQuantity -= 1),
    };
    const response = await decrementCartItem(data);
    console.log(response);
    const updatedCart = await fetchCart(userId);
    dispatch(addCart(updatedCart));
  };

  const fetchCart = async (userId: string) => {
    try {
      const response = await getCart(userId);
      console.log("Cart response :>>>>", response);

      if (!response.items.length) {
        const clearCartresponse = await clearCart(userId);
        console.log("Cart cleared:", clearCartresponse);
      }
      if (!response) {
        console.log("Cart is empty ! no response");
      } else {
        console.log("cart items:", response.hotelId);
        dispatch(addCart(response));
        dispatch(setHotelIdForCheckout(response.hotelId));
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    }
  }, [userId]);

  const cartItems: CartItem[] = useSelector(
    (state: RootState) => state.user.cart
  );
  console.log("Cart items from redux=", cartItems);

  const handleClick = () => {
    navigate("/user/home");
  };

  const removeItem = async (itemId: string) => {
    const data = {
      userId,
      itemId,
    };

    const response = await deleteItemFromCart(data);
    if (response) {
      const cartResponse = await fetchCart(userId);
      dispatch(addCart(cartResponse));
    }
  };

  // Updated to include variants and addons in order data
  const prepareOrderItems = () => {
    return cartItems.map((item) => ({
      productId: item._id,
      productName: item.productName,
      quantity: item.quantity,
      productPrice: item.originalItemPrice || item.productPrice, // Use original price
      selectedVariant: item.selectedVariant || null,
      selectedAddons: item.selectedAddons || [],
      itemTotalPrice: item.itemTotalPrice || (item.productPrice * item.quantity),
    }));
  };

  const handleCheckout = () => {
    const orderItems = prepareOrderItems();

    console.log("Order Items>>>>>>",orderItems)
    
    dispatch(
      orderFromCart({
        items: orderItems, // Send complete item data with variants and addons
        subtotal: subtotal,
        deliveryfee: deliveryFee,
        tax: tax,
        totalAmountToPay: total,
      })
    );
    navigate("/user/checkout");
  };


  
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0
  );
  const deliveryFee = subtotal > 1000 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  // const estimatedTime =
  //   cartItems.length > 0
  //     ? Math.max(...cartItems.map((item) => parseInt(item.prepTime))) + 5
  //     : 0;


  // Helper function to calculate individual item price including variants and addons
  const getItemDisplayPrice = (item: CartItem) => {
    let basePrice = item.originalItemPrice || item.productPrice || 0;
    
    // Add variant price if exists
    if (item.selectedVariant?.price) {
      basePrice += item.selectedVariant.price;
    }
    
    // Add addon prices if exist
    if (item.selectedAddons?.length) {
      const addonsTotal = item.selectedAddons.reduce((sum, addon) => sum + (addon.price || 0), 0);
      basePrice += addonsTotal;
    }
    
    return basePrice;
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="fixed top-0 left-0 right-0 z-50">
          <NavBar isAuthenticated={isAuthenticated} user={user} />
        </div>

        <div className="container mx-auto px-6 py-10 mt-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-16 h-16 text-gray-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Looks like you haven't added any delicious items to your cart
                yet.
              </p>
              <button
                onClick={handleClick}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar isAuthenticated={isAuthenticated} user={user} />
      </div>

      <div className="container mx-auto mt-20 px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">
                    {subtotal > 50 ? "Free Delivery" : "Delivery Available"}
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Fast delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>2.5 km away</span>
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="space-y-5">
              {cartItems.map((item) => {
                const itemPrice = getItemDisplayPrice(item);
                const itemTotal = item.itemTotalPrice || (itemPrice * item.quantity);
                
                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100/50 backdrop-blur-sm"
                  >
                    <div className="p-6">
                      <div className="flex items-start space-x-6">
                        {/* Item Image */}
                        <div className="flex-shrink-0 relative group">
                          <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 ring-1 ring-gray-200/50">
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-lg font-bold text-gray-900 truncate">
                                  {item.selectedVariant?.name ? `${item.selectedVariant.name} ` : ""}
                                  {item.productName}
                                </h3>
                                {item.spicy && (
                                  <span className="text-red-500 text-sm">🌶️</span>
                                )}
                              </div>
                              
                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {item.description}
                              </p>

                              {/* Variant Information */}
                              {item.selectedVariant && (
                                <div className="mb-2">
                                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                                    {item.selectedVariant.name}
                                    {item.selectedVariant.price > 0 && ` (+₹${item.selectedVariant.price})`}
                                  </span>
                                </div>
                              )}

                              {/* Addons Information */}
                              {item.selectedAddons && item.selectedAddons.length > 0 && (
                                <div className="mb-2">
                                  <div className="flex flex-wrap gap-1">
                                    {item.selectedAddons.map((addon, index) => (
                                      <span
                                        key={index}
                                        className="inline-flex items-center px-2 py-1 rounded-md bg-green-50 text-green-700 text-xs font-medium"
                                      >
                                        <Plus className="w-3 h-3 mr-1" />
                                        {addon.name}
                                        {addon.price > 0 && ` (+₹${addon.price})`}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span className="font-medium">
                                    {item.prepTime}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span className="font-medium">
                                    {item.calories} cal
                                  </span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => removeItem(item._id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 flex-shrink-0 group"
                            >
                              <Trash2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                            </button>
                          </div>

                          {/* Price and Quantity */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1 bg-gray-50 rounded-xl p-1 border border-gray-200/50">
                                <button
                                  className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                  onClick={() => handleDecrement(item._id)}
                                  disabled={item.quantity <= 1}
                                >
                                  <span className="font-bold text-sm">-</span>
                                </button>

                                <div className="px-3 py-2 min-w-[3rem] text-center">
                                  <span className="font-bold text-gray-900 text-sm">
                                    Qty: {item.quantity}
                                  </span>
                                </div>

                                <button
                                  className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                  onClick={() => handleIncrement(item._id)}
                                >
                                  <span className="font-bold text-sm">+</span>
                                </button>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-xl font-bold text-gray-900">
                                 ₹{item.productPrice * item.quantity || 0} 
                              </div>
                              <div className="text-sm text-gray-500">
                                 ₹{item.productPrice} each
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h3>

              {/* Order Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-xl text-gray-800">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
              >
                Proceed to Checkout
              </button>

              {/* Additional Info */}
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>100% Quality Guaranteed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Fast delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-purple-500" />
                  <span>Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCart;