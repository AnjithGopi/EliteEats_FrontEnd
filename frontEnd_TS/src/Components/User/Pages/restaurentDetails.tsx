

import  { useState } from 'react';
import { Star, Clock, MapPin, Plus, Heart, ShoppingCart, User, Search, Filter, ArrowLeft, Share2, Phone, Navigation, Award, Truck, ChefHat, Flame, Zap, Shield } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';
import NavBar from '../../Home/NavBar';


function RestaurantDetails() {
     const isAuthenticated = useSelector(
    (state:RootState) => state.user.isAuthenticated
  );

 
  const user = useSelector((state: RootState) => state.user.name);
  const restaurentState=useSelector((state:RootState)=>state.user.restaurentData)
//   const menuItems=restaurentState?.menu ||[]
//   const categories=restaurentState?.categories ||[]

  console.log("State:::",restaurentState)
  console.log("menu items::::",menuItems)
  console.log("Categories::::",categories)


 
  

  const [selectedCategory, setSelectedCategory] = useState('Burgers');
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);


  const premiumOffers = [
    {
      id: 1,
      title: 'VIP First Order',
      subtitle: '25% OFF + Free Delivery',
      description: 'Welcome to premium dining',
      image: '/api/placeholder/300/200',
      bgGradient: 'from-purple-600 via-purple-700 to-indigo-800',
      validUntil: '2 days left',
      minOrder: 50
    },
    {
      id: 2,
      title: 'Chef\'s Special Weekend',
      subtitle: 'Buy 2 Get 1 Free',
      description: 'On all signature items',
      image: '/api/placeholder/300/200',
      bgGradient: 'from-amber-500 via-orange-600 to-red-600',
      validUntil: '3 days left',
      minOrder: 75
    },
    {
      id: 3,
      title: 'Premium Member Exclusive',
      subtitle: '20% OFF Everything',
      description: 'Plus priority delivery',
      image: '/api/placeholder/300/200',
      bgGradient: 'from-emerald-500 via-teal-600 to-cyan-600',
      validUntil: '5 days left',
      minOrder: 40
    }
  ];

//   const addToCart = (item) => {
//     setCartItems(prev => [...prev, { ...item, quantity: 1, id: Date.now() }]);
//     setShowNotification(true);
//     setTimeout(() => setShowNotification(false), 3000);
//   };

//   const toggleFavorite = (itemId) => {
//     setFavoriteItems(prev => {
//       const newFavorites = new Set(prev);
//       if (newFavorites.has(itemId)) {
//         newFavorites.delete(itemId);
//       } else {
//         newFavorites.add(itemId);
//       }
//       return newFavorites;
//     });
//   };

//   const filteredItems = menuItems[selectedCategory]?.filter(item =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.description.toLowerCase().includes(searchQuery.toLowerCase())
//   ) || [];
const filteredItems = menuItems.filter(item => 
  item.categoryId === selectedCategory &&
  (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
   item.description.toLowerCase().includes(searchQuery.toLowerCase()))
);

//   const totalCartValue = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Premium Header */}

       <NavBar isAuthenticated={isAuthenticated} user={user} />
     
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-500/10 rounded-full animate-bounce"></div>
        
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl text-white">
          
            <h1 className="text-6xl font-bold mb-4 leading-tight">
              {restaurentState.name}
              <span className="block text-4xl text-gray-300 font-light">Kochi</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
             {restaurentState.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Truck className="w-5 h-5 text-green-400" />
                <span className="font-medium">Free delivery in 18-22 min</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="font-medium">100% Quality Guaranteed</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <ChefHat className="w-5 h-5 text-yellow-400" />
                <span className="font-medium">Chef Curated Menu</span>
              </div>
            </div>

            {/* <div className="flex items-center space-x-4">
              <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-xl hover:shadow-2xl font-semibold">
                Order Now
              </button>
              <button className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 font-semibold border border-white/20">
                View Menu
              </button>
            </div> */}
          </div>
          
          <div className="ml-auto hidden lg:block">
            <div className="relative">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-800 mb-2">4.9</div>
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 font-medium">2,847 reviews</p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <div className="text-center">
                        <Clock className="w-4 h-4 text-gray-500 mx-auto mb-1" />
                        <span className="text-gray-600">18-22 min</span>
                      </div>
                      <div className="text-center">
                        <MapPin className="w-4 h-4 text-gray-500 mx-auto mb-1" />
                        <span className="text-gray-600">2.5 km</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Flame className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">50+</div>
              <div className="text-sm text-gray-600">Signature Items</div>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">18min</div>
              <div className="text-sm text-gray-600">Avg Delivery</div>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">4.9★</div>
              <div className="text-sm text-gray-600">Customer Rating</div>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">100%</div>
              <div className="text-sm text-gray-600">Quality Promise</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Premium Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Search */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Premium Offers */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">Exclusive Offers</h3>
              {premiumOffers.map((offer) => (
                <div key={offer.id} className={`bg-gradient-to-br ${offer.bgGradient} rounded-2xl p-6 text-white relative overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl`}>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">
                        {offer.validUntil}
                      </span>
                    </div>
                    <h4 className="font-bold text-lg mb-1">{offer.title}</h4>
                    <p className="text-2xl font-bold mb-1">{offer.subtitle}</p>
                    <p className="text-sm opacity-90 mb-3">{offer.description}</p>
                    <div className="text-xs opacity-75">Min order: ${offer.minOrder}</div>
                  </div>
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-white/5 rounded-full"></div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            {/* {cartItems.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-32">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Your Order</h3>
                <div className="space-y-2 mb-4">
                  {cartItems.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate">{item.name}</span>
                      <span className="font-medium">${item.price}</span>
                    </div>
                  ))}
                  {cartItems.length > 3 && (
                    <div className="text-xs text-gray-500">+{cartItems.length - 3} more items</div>
                  )}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg mb-4">
                    <span>Total</span>
                    <span>${totalCartValue.toFixed(2)}</span>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )} */}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Navigation */}
            <div className="flex flex-wrap gap-4 mb-8">
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
                    selectedCategory === category._id
                      ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm border border-gray-100'
                  }`}
                >
                  {/* <span className="text-2xl">{category.icon}</span> */}
                  <div className="text-left">
                    <div className="font-semibold">{category.name}</div>
                    {/* <div className="text-xs opacity-75">{category.count} items</div> */}
                  </div>
                </button>
              ))}
            </div>

            {/* Menu Section Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {categories.find(cat => cat._id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">Handcrafted with premium ingredients</p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filter</span>
              </button>
            </div>

            {/* Menu Items Grid */}
            <div className="grid gap-6">
              {filteredItems.map((item,index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                  <div className="p-6">
                    <div className="flex items-start space-x-6">
                      {/* Item Image */}
                      <div className="relative w-32 h-32 flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                          🍔
                        </div>
                        {/* {item.popular && (
                          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                            POPULAR
                          </div>
                        )} */}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                                {item.name}
                              </h3>
                              {item.spicy && <span className="text-red-500">🌶️</span>}
                              {item.vegetarian && <span className="text-green-500">🌱</span>}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                              {item.description}
                            </p>
                            
                            {/* Tags */}
                            {/* <div className="flex flex-wrap gap-2 mb-4">
                              {item.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                                  {tag}
                                </span>
                              ))}
                            </div> */}

                            {/* Item Stats */}
                            {/* <div className="grid grid-cols-3 gap-4 text-xs text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{item.prepTime}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Flame className="w-3 h-3" />
                                <span>{item.calories} cal</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 fill-current text-yellow-400" />
                                <span>{item.rating} ({item.reviews})</span>
                              </div>
                            </div> */}
                          </div>

                          {/* Price and Actions */}
                          <div className="text-right">
                            <div className="mb-4">
                              {item.originalPrice && (
                                <div className="text-sm text-gray-400 line-through">
                                  ${item.originalPrice}
                                </div>
                              )}
                              <div className="text-2xl font-bold text-gray-800">
                                ${item.price}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => toggleFavorite(item._id)}
                                className={`p-3 rounded-xl transition-all duration-300 ${
                                  favoriteItems.has(item.id)
                                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-red-500'
                                }`}
                              >
                                <Heart className={`w-5 h-5 ${favoriteItems.has(item.id) ? 'fill-current' : ''}`} />
                              </button>
                              <button
                                onClick={() => addToCart(item)}
                                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
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

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md">
                Load More Items
              </button>
            </div>
          </div>
        </div>
      </div>


      </div>


      );
      }

      export default RestaurantDetails

