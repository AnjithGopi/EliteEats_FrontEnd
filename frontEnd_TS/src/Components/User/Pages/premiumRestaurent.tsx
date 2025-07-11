import { useState, useEffect } from "react";
import {
  Star,
  Clock,
  MapPin,
  Plus,
  Heart,
  ShoppingCart,
  Search,
  Filter,
  ArrowLeft,
  Share2,
  Phone,
  Truck,
  ChefHat,
  Flame,
  Zap,
  Shield,
  Award,
} from "lucide-react";
import NavBar from "../../Home/NavBar";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { createCart } from "../../../services/userServices/userServices";
import RestaurantHero from "./restuarentMain";

function PremiumRestaurantMenu() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.user.name);
  const userId = useSelector((state: RootState) => state.user.id);

  const restaurentState = useSelector(
    (state: RootState) => state.user.restaurentData || {}
  );
  const categories = useSelector(
    (state: RootState) => state.user.restaurentData?.categories || []
  );
  const menuItems = useSelector(
    (state: RootState) => state.user.restaurentData?.menu || []
  );

  if (categories.length > 0 && !selectedCategory) {
    setSelectedCategory(categories[0]._id);
  }

  const premiumOffers = [
    {
      id: 1,
      title: "First Taste Exclusive",
      subtitle: "30% OFF First Order",
      description: "Experience gourmet dining",
      image: "/api/placeholder/300/200",
      bgGradient: "from-indigo-600 via-purple-700 to-pink-800",
      validUntil: "3 days left",
      minOrder: 60,
    },
    {
      id: 2,
      title: "Chef's Tasting Menu",
      subtitle: "Complimentary Dessert",
      description: "With any main course",
      image: "/api/placeholder/300/200",
      bgGradient: "from-amber-600 via-orange-700 to-red-800",
      validUntil: "5 days left",
      minOrder: 80,
    },
  ];

  const addToCart = async (id: string, userId: string) => {
    console.log("Add to cart worked for item:", id);

    const response = await createCart(id, userId);
    console.log(response.message)
    alert(response.message)
    return response
  };

  const toggleFavorite = (itemId) => {
    setFavoriteItems((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.has(itemId)
        ? newFavorites.delete(itemId)
        : newFavorites.add(itemId);
      return newFavorites;
    });
  };

  const filteredItems = menuItems.filter(
    (item) => item.category == selectedCategory
  );
  console.log("Selected:", selectedCategory);
  console.log("filetered:", filteredItems);

  // Find the current category for the heading
  const currentCategory = categories.find(
    (cat) => cat._id === selectedCategory
  );

  const totalCartValue = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
     
       <div className="fixed top-0 left-0 right-0 z-50">
    <NavBar isAuthenticated={isAuthenticated} user={user} />
  </div>

      
      {showNotification && (
        <div className="fixed top-20 right-6 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          ✅ Item added to cart!
        </div>
      )}

     
      <RestaurantHero restaurentState={restaurentState}/>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search gourmet dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">
                Exclusive Offers
              </h3>
              {premiumOffers.map((offer) => (
                <div
                  key={offer.id}
                  className={`bg-gradient-to-br ${offer.bgGradient} rounded-2xl p-6 text-white relative overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl`}
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">
                        {offer.validUntil}
                      </span>
                    </div>
                    <h4 className="font-bold text-lg mb-1">{offer.title}</h4>
                    <p className="text-2xl font-bold mb-1">{offer.subtitle}</p>
                    <p className="text-sm opacity-90 mb-3">
                      {offer.description}
                    </p>
                    <div className="text-xs opacity-75">
                      Min order: ${offer.minOrder}
                    </div>
                  </div>
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-white/5 rounded-full"></div>
                </div>
              ))}
            </div>
            {cartItems.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-32">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Your Order
                </h3>
                <div className="space-y-2 mb-4">
                  {cartItems.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate">
                        {item.name}
                      </span>
                      <span className="font-medium">${item.price}</span>
                    </div>
                  ))}
                  {cartItems.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{cartItems.length - 3} more items
                    </div>
                  )}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg mb-4">
                    <span>Total</span>
                    <span>${totalCartValue.toFixed(2)}</span>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Menu Content */}
          <div className="lg:col-span-3">
            <div className="flex flex-wrap gap-4 mb-8">
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
                    selectedCategory === category._id
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm border border-gray-100"
                  }`}
                >
                  <div className="text-left">
                    <div className="font-semibold">{category.name}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-[#cb202d] mb-2">
                  {currentCategory?.name || "Menu"}
                </h2>
                <p className="text-gray-600">
                  Crafted with passion and precision
                </p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filter</span>
              </button>
            </div>
            <div className="grid gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-6">
                      {/* Image container */}
                      <div className="relative w-32 h-32 flex-shrink-0">
                        <img
                          src={item.images}
                          alt={item.itemName}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-xl font-bold text-[#cb202d] transition-colors">
                                {item.itemName}
                              </h3>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                              {item.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => toggleFavorite(item._id)}
                                className={`p-3 rounded-xl transition-all duration-300 ${
                                  favoriteItems.has(item._id)
                                    ? "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                                    : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-indigo-500"
                                }`}
                              >
                                <Heart
                                  className={`w-5 h-5 ${
                                    favoriteItems.has(item._id)
                                      ? "fill-current"
                                      : ""
                                  }`}
                                />
                              </button>
                              <button
                                onClick={() => addToCart(item._id, userId)}
                                className="px-6 py-3 bg-gradient-to-r from-[#cb202d] to-[#cb202d] text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2 cursor-pointer"
                              >
                                <Plus className="w-5 h-5" />
                                <span>Add</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button className="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md">
                Load More Items
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">La Gourmet</h3>
              <p className="text-gray-400 leading-relaxed">
                A culinary journey through exquisite flavors and premium
                ingredients.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-gray-400">
                <div>About Us</div>
                <div>Menu</div>
                <div>Locations</div>
                <div>Contact</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 91234 56789</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Bandra, Mumbai, India</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>11:00 AM - 10:00 PM</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              © 2025 La Gourmet. All rights reserved. | Crafted with culinary
              excellence.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center hover:scale-110">
          <Phone className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default PremiumRestaurantMenu;
