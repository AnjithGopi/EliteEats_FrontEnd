import React, { useEffect, useState } from "react";
import {
  CreditCard,
  Shield,
  Lock,
  Truck,
  Award,
  // Star,
  ArrowLeft,
  MapPin,
  ChevronDown,
  Plus,
  // Clock,
  Home,
  Briefcase,
} from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { fetchProductDetails } from "../../../services/userServices/userServices";
import { createOrder } from "../../../services/userServices/userServices";
import { useNavigate } from "react-router-dom";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  selectedAddress: string;
  customAddress: string;
  city: string;
  state: string;
  zipCode: string;
  landmark: string;
  addressType: "home" | "work" | "other";
  deliveryInstructions: string;
}

interface Address {
  id: string;
  type: "home" | "work" | "other";
  address: string;
  landmark?: string;
  isDefault: boolean;
}

interface OrderSummary {
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
}

const FoodDeliveryCheckout: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    selectedAddress: "",
    customAddress: "",
    city: "",
    state: "",
    zipCode: "",
    landmark: "",
    addressType: "home",
    deliveryInstructions: "",
  });

  const userId = useSelector((state: RootState) => state.user.id);
  const userName = useSelector((state: RootState) => state.user.name);
  const userEmail = useSelector((state: RootState) => state.user.email);
  const userPhone = useSelector((state: RootState) => state.user.mobile);
  const productId = useSelector(
    (state: RootState) => state.user.instantOrderProduct
  );
  const restaurentId=useSelector((state:RootState)=>state.user.restaurentData.id)
  const navigate = useNavigate();

  const [foodItems, setFoodItems] = useState({
    name: "",
    category: "",
    amount: "",
    description: "",
    image: "",
  });

  const [quantity, setQuantity] = useState(1);

  const fetchProductData = async (id: string) => {
    const response = await fetchProductDetails(id);

    if (response) {
      console.log("response:", response);
      setFoodItems({
        name: response.itemName || "",
        category: response.category || "",
        amount: response.price || "",
        description: response.description || "",
        image: response.images || "",
      });
    }
  };

  useEffect(() => {
    fetchProductData(productId);
  }, []);

  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">(
    "razorpay"
  );
  const [showNewAddress, setShowNewAddress] = useState<boolean>(false);

  const savedAddresses: Address[] = [
    {
      id: "1",
      type: "home",
      address: "123 Main Street, Downtown Area, New York, NY 10001",
      landmark: "Near Central Park",
      isDefault: true,
    },
    {
      id: "2",
      type: "work",
      address: "456 Business Ave, Corporate District, New York, NY 10002",
      landmark: "Next to Metro Station",
      isDefault: false,
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCompleteOrder = async () => {
    console.log("Payment method:", paymentMethod);

    const data = {
      productId,
      restaurentId,
      itemName: foodItems.name,
      quantity,
      amount: orderSummary.total,
      userId,
      paymentMethod,
    };

    const response = await createOrder(data);
    if (response) {
      console.log(response);
      alert(response.message);
      navigate("/user/restaurent_Details");
    }
  };

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="w-4 h-4" />;
      case "work":
        return <Briefcase className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const calculateAmount = (
    subtotal: number,
    deliveryFee: number,
    tax: number,
    discount: number
  ): number => {
    return Number((subtotal + deliveryFee + tax - discount).toFixed(2));
  };

  const subtotal = Number(foodItems.amount) * quantity;
  const deliveryFee = Number((3.99 * quantity).toFixed(2));
  const tax = Number((3.84 * quantity).toFixed(2));
  const discount = 5.0 * quantity;

  const orderSummary: OrderSummary = {
    subtotal,
    deliveryFee,
    tax,
    discount,
    total: calculateAmount(subtotal, deliveryFee, tax, discount),
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <a href="/user/restaurent_Details" className="font-medium">
                  Back
                </a>
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
                  onClick={() => setShowNewAddress(!showNewAddress)}
                  className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Address</span>
                </button>
              </div>

              {/* Saved Addresses */}
              <div className="space-y-3 mb-6">
                {savedAddresses.map((address) => (
                  <div
                    key={address.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        id={`address-${address.id}`}
                        name="selectedAddress"
                        value={address.id}
                        checked={formData.selectedAddress === address.id}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-orange-600 focus:ring-orange-500 mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getAddressIcon(address.type)}
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {address.type}
                          </span>
                          {address.isDefault && (
                            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700">
                          {address.address}
                        </p>
                        {address.landmark && (
                          <p className="text-xs text-gray-500 mt-1">
                            Landmark: {address.landmark}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Address Form */}
              {showNewAddress && (
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Add New Address
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Address
                      </label>
                      <input
                        type="text"
                        name="customAddress"
                        value={formData.customAddress}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="123 Main Street, Apartment 4B"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <div className="relative">
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none"
                          >
                            <option value="">Select State</option>
                            <option value="NY">New York</option>
                            <option value="CA">California</option>
                            <option value="TX">Texas</option>
                            <option value="FL">Florida</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          placeholder="10001"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
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
                              checked={formData.addressType === type}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                            />
                            <span className="text-sm text-gray-700 capitalize">
                              {type}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Instructions (Optional)
                </label>
                <textarea
                  name="deliveryInstructions"
                  value={formData.deliveryInstructions}
                  onChange={handleInputChange}
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
                {/* <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
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
                </div> */}

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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Food Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-start space-x-4">
                  <img
                    src={foodItems.image}
                    alt={foodItems.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {foodItems.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {foodItems.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      {/* Rating stars can be added here if needed */}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        ${foodItems.amount}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <button
                        onClick={() =>
                          setQuantity((prev) => Math.max(1, prev - 1))
                        }
                        className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-700"
                      >
                        −
                      </button>
                      <span className="w-6 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity((prev) => prev + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Estimated Delivery Time */}
            {/* <div className="flex items-center space-x-2 mb-6 p-3 bg-green-50 rounded-lg">
                <Clock className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-800 font-medium">
                  Estimated delivery: 25-35 minutes
                </span>
              </div> */}

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 mt-10">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${orderSummary.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="text-gray-900">
                  ${orderSummary.deliveryFee}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">${orderSummary.tax}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount</span>
                <span className="text-green-600">
                  -${Math.abs(orderSummary.discount)}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
              <span>Total</span>
              <span>${orderSummary.total}</span>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handleCompleteOrder}
              className="w-full bg-[#cb202d] text-white py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center space-x-2 mb-4 cursor-pointer"
            >
              <Lock className="w-5 h-5" />
              <span>Place Order</span>
            </button>

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
  );
};

export default FoodDeliveryCheckout;
