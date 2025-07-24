import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Clock,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Tag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../../services/userServices/userServices";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../redux/store";
import { addCart } from "../../../redux/Slice/userSlice";
import NavBar from "../../Home/NavBar";

function UserCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.id);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.user.name);

  const fetchCart = async (userId: string) => {
    const response = await getCart(userId);
    if (!response) {
      console.log("Cart is empty ! no response");
    } else {
      console.log(response);
      dispatch(addCart(response));
    }
  };

  useEffect(() => {
    fetchCart(userId);
  }, []);

  const cartItems = useSelector((state: RootState) => state.user.cart);
  if (cartItems.length <= 0) {
    alert("Cart is Empty");
  } else {
    console.log(cartItems);
  }

  const handleClick = () => {
    navigate("/user/home");
  };

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showNotificationMessage("Item removed from cart!");
  };

  const clearCart = () => {
    setCartItems([]);
    showNotificationMessage("Cart cleared!");
  };

  const applyPromoCode = () => {
    const validPromos = {
      SAVE20: { discount: 20, type: "percentage" },
      FIRST10: { discount: 10, type: "fixed" },
      WELCOME25: { discount: 25, type: "percentage" },
    };

    if (validPromos[promoCode.toUpperCase()]) {
      setAppliedPromo({
        code: promoCode.toUpperCase(),
        ...validPromos[promoCode.toUpperCase()],
      });
      showNotificationMessage("Promo code applied successfully!");
      setPromoCode("");
    } else {
      showNotificationMessage("Invalid promo code!");
    }
  };

  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = appliedPromo
    ? appliedPromo.type === "percentage"
      ? subtotal * (appliedPromo.discount / 100)
      : appliedPromo.discount
    : 0;
  const deliveryFee = subtotal > 50 ? 0 : 4.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + deliveryFee + tax;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const estimatedTime =
    Math.max(...cartItems.map((item) => parseInt(item.prepTime))) + 5;

  if (cartItems.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="fixed top-0 left-0 right-0 z-50">
          <NavBar isAuthenticated={isAuthenticated} user={user} />
        </div>

        <div className="container mx-auto px-6 py-10 mt-10">
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
                Start Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="fixed top-0 left-0 right-0 z-50 ">
        <NavBar isAuthenticated={isAuthenticated} user={user} />
      </div>

      {/* Header */}

      <div className="container mx-auto mt-10 px-6 py-10 ">
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
                  <h3 className="font-bold text-gray-800">Free Delivery</h3>
                  <p className="text-sm text-gray-600">
                    Your order qualifies for free delivery!
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>
                    Estimated: {estimatedTime}-{estimatedTime + 5} min
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>2.5 km away</span>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {cartItems.map((item) => (
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
                                {item.productName}
                              </h3>
                              {item.spicy && (
                                <span className="text-red-500 text-sm">🌶️</span>
                              )}
                              {/* {item.vegetarian && (
                    <span className="text-green-500 text-sm">🌱</span>
                  )} */}
                            </div>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {item.description}
                            </p>

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
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 flex-shrink-0 group"
                          >
                            <Trash2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                          </button>
                        </div>

                        {/* Price and Quantity Controls */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1 bg-gray-50 rounded-xl p-1 border border-gray-200/50">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-2 hover:bg-white rounded-lg transition-all duration-200 hover:shadow-sm group"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
                              </button>
                              <div className="px-3 py-2 min-w-[3rem] text-center">
                                <span className="font-bold text-gray-900 text-sm">
                                  {item.quantity}
                                </span>
                              </div>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="p-2 hover:bg-white rounded-lg transition-all duration-200 hover:shadow-sm group"
                              >
                                <Plus className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
                              </button>
                            </div>
                          </div>

                          <div className="text-right">
                            {item.originalPrice && (
                              <div className="text-sm text-gray-400 line-through mb-1">
                                $
                                {(item.originalPrice * item.quantity).toFixed(
                                  2
                                )}
                              </div>
                            )}
                            <div className="text-xl font-bold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>

                        {/* Buy Now Button */}
                        <div className="flex justify-end ">
                          <button
                            onClick={() => buyNow(item.id)}
                            className="group relative px-6 py-2.5 bg-gradient-to-r from-[#cb202d] to-[#a01a26] text-white rounded-lg font-semibold text-sm uppercase tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-red-500/25 hover:from-[#a01a26] hover:to-[#8b1621] active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-white overflow-hidden cursor-pointer"
                          >
                            <span className="relative z-10 flex items-center space-x-2">
                              <span>Buy Now</span>
                              <svg
                                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Items List */}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h3>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="flex items-center space-x-2 text-green-600 text-sm">
                    <Tag className="w-4 h-4" />
                    <span>Promo "{appliedPromo.code}" applied!</span>
                  </div>
                )}
              </div>

              {/* Order Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-xl text-gray-800">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl mb-4">
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
                  <span>
                    Ready in {estimatedTime}-{estimatedTime + 5} minutes
                  </span>
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
