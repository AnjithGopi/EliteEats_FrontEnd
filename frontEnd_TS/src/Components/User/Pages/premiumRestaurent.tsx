// import { useState, useEffect } from "react";
// import { Clock, MapPin, Filter, Phone, Minus, Plus } from "lucide-react";
// import NavBar from "../../Home/NavBar";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../../redux/store";
// import { createCart } from "../../../services/userServices/userServices";
// import RestaurantHero from "./restuarentMain";


//  function PremiumRestaurantMenu() {
//   const [selectedCategory, setSelectedCategory] = useState<string>("");
//   const [itemQuantities, setItemQuantities] = useState<Record<string, number>>(
//     {}
//   );

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   const isAuthenticated = useSelector(
//     (state: RootState) => state.user.isAuthenticated
//   );
//   const user = useSelector((state: RootState) => state.user.name);
//   const userId = useSelector((state: RootState) => state.user.id);
//   const hotelId = useSelector(
//     (state: RootState) => state.user.restaurentData.id
//   );

//   const restaurentState = useSelector(
//     (state: RootState) => state.user.restaurentData || {}
//   );
//   const categories = useSelector(
//     (state: RootState) => state.user.restaurentData?.categories || []
//   );
//   const menuItems = useSelector(
    
//     (state: RootState) => state.user.restaurentData?.menu || []
//   );

//   console.log("menu of perticular restaurent:>>>>>",menuItems)

//   useEffect(() => {
//     if (categories.length > 0 && !selectedCategory) {
//       setSelectedCategory(categories[0]._id);
//     }
//   }, [categories, selectedCategory]);

//   const getItemQuantity = (itemId: string): number => {
//     return itemQuantities[itemId] || 0;
//   };

//   const updateItemQuantity = (itemId: string, newQuantity: number): void => {
//     if (newQuantity >= 0) {
//       setItemQuantities((prev) => ({
//         ...prev,
//         [itemId]: newQuantity,
//       }));
//     }
//   };

//   const incrementQuantity = (itemId: string): void => {
//     const currentQuantity = getItemQuantity(itemId);
//     updateItemQuantity(itemId, currentQuantity + 1);
//   };

//   const decrementQuantity = (itemId: string): void => {
//     const currentQuantity = getItemQuantity(itemId);
//     if (currentQuantity > 0) {
//       updateItemQuantity(itemId, currentQuantity - 1);
//     }
//   };

//   // Update the addToCart function
//   const addToCart = async (id: string, userId: string) => {
//     const quantity = getItemQuantity(id);
//     if (quantity <= 0) {
//       alert("Please select a quantity first!");
//       return;
//     }

//     const item = menuItems.find((menuItem: any) => menuItem._id === id);
//     if (!item) {
//       alert("Item not found!");
//       return;
//     }

//     try {
//       const response = await createCart({
//         productId: id,
//         userId,
//         hotelId,
//         quantity,
//         price: item.price,
//       });

//       if (response) {
//         alert(`Added ${quantity} item(s) to cart!`);
//       } else {
//         alert("Cannot add items");
//       }



//       return response;
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       alert("Failed to add item to cart. Please try again.");
//     }
//   };

//   const filteredItems = menuItems.filter(
//     (item: any) => item.category === selectedCategory
//   );
//   console.log("Selected:", selectedCategory);
//   console.log("filtered:", filteredItems);

//   // Find the current category for the heading
//   const currentCategory = categories.find(
//     (cat: any) => cat._id === selectedCategory
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
//       <div className="fixed top-0 left-0 right-0 z-50">
//         <NavBar isAuthenticated={isAuthenticated} user={user} />
//       </div>

//       <RestaurantHero restaurentState={restaurentState} />

//       {/* Main Content */}
//       <div className="container mx-auto px-6 py-10">
//         <div className="grid lg:grid-cols-4 gap-8">
//           {/* Menu Content */}
//           <div className="lg:col-span-4">
//             <div className="flex flex-wrap gap-4 mb-8">
//               {categories.map((category: any) => (
//                 <button
//                   key={category._id}
//                   onClick={() => setSelectedCategory(category._id)}
//                   className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
//                     selectedCategory === category._id
//                       ? "bg-gradient-to-r from-[#cb202d] to-[#a01a26] text-white shadow-lg cursor-pointer"
//                       : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm border border-gray-100 cursor-pointer"
//                   }`}
//                 >
//                   <div className="text-left">
//                     <div className="font-semibold">{category.name}</div>
//                   </div>
//                 </button>
//               ))}
//             </div>
//             <div className="flex items-center justify-between mb-8">
//               <div>
//                 <h2 className="text-3xl font-bold text-[#cb202d] mb-2">
//                   {currentCategory?.name || "Menu"}
//                 </h2>
//                 <p className="text-gray-600">
//                   Crafted with passion and precision
//                 </p>
//               </div>
//               <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
//                 <Filter className="w-4 h-4" />
//                 <span className="font-medium">Filter</span>
//               </button>
//             </div>
//             <div className="grid gap-6">
//               {filteredItems.map((item: any) => (
//                 <div
//                   key={item._id}
//                   className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
//                 >
//                   <div className="p-6">
//                     <div className="flex items-start space-x-6">
//                       {/* Image container */}
//                       <div className="relative w-32 h-32 flex-shrink-0">
//                         <img
//                           src={item.images}
//                           alt={item.itemName}
//                           className="w-full h-full object-cover rounded-lg"
//                         />
//                       </div>

//                       {/* quantity controls */}
//                       <div className="flex items-center justify-start mb-4">
//                         <span className="text-sm font-semibold text-gray-600 mr-3">
//                           Quantity:
//                         </span>
//                         <div className="flex items-center bg-gray-100 rounded-lg border border-gray-200">
//                           <button
//                             onClick={() => decrementQuantity(item._id)}
//                             className="p-2 hover:bg-gray-200 transition-colors rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                             disabled={getItemQuantity(item._id) <= 0}
//                             type="button"
//                           >
//                             <Minus className="w-4 h-4 text-gray-600" />
//                           </button>
//                           <span className="px-4 py-2 min-w-[50px] text-center font-semibold text-gray-800 bg-white border-l border-r border-gray-200">
//                             {getItemQuantity(item._id)}
//                           </span>
//                           <button
//                             onClick={() => incrementQuantity(item._id)}
//                             className="p-2 hover:bg-gray-200 transition-colors rounded-r-lg"
//                             type="button"
//                           >
//                             <Plus className="w-4 h-4 text-gray-600" />
//                           </button>
//                         </div>
//                       </div>

//                       <div className="flex-1">
//                         <div className="flex items-start justify-between mb-3">
//                           <div>
//                             <div className="flex items-center space-x-2 mb-2">
//                               <h3 className="text-xl font-bold text-[#cb202d] transition-colors">
//                                 {item.itemName}
//                               </h3>
//                             </div>
//                             <p className="text-gray-600 text-sm leading-relaxed mb-3">
//                               {item.description}
//                             </p>
//                             <p className="text-red-600 text-sm leading-relaxed font-bold mb-3">
//                               ₹ {item.price}
//                             </p>
//                           </div>
//                           <div className="text-right">
//                             <div className="flex items-center justify-end space-x-3">
//                               {/* Add to Cart Button - Secondary Action */}
//                               <button
//                                 onClick={() => addToCart(item._id, userId)}
//                                 disabled={getItemQuantity(item._id) <= 0}
//                                 className="group relative px-8 py-3.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-semibold text-sm uppercase tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300 hover:bg-gray-50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:ring-offset-2 focus:ring-offset-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//                               >
//                                 <span className="flex items-center space-x-2">
//                                   <svg
//                                     className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     viewBox="0 0 24 24"
//                                   >
//                                     <path
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                       strokeWidth={2}
//                                       d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h7M9.5 18a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
//                                     />
//                                   </svg>
//                                   <span>Add to Cart</span>
//                                 </span>
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="text-center mt-12">
//               <button className="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md">
//                 Load More Items
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12 mt-16">
//         <div className="container mx-auto px-6">
//           <div className="grid md:grid-cols-3 gap-8">
//             <div>
//               <h3 className="text-2xl font-bold mb-4">La Gourmet</h3>
//               <p className="text-gray-400 leading-relaxed">
//                 A culinary journey through exquisite flavors and premium
//                 ingredients.
//               </p>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Quick Links</h4>
//               <div className="space-y-2 text-gray-400">
//                 <div>About Us</div>
//                 <div>Menu</div>
//                 <div>Locations</div>
//                 <div>Contact</div>
//               </div>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Contact Info</h4>
//               <div className="space-y-2 text-gray-400">
//                 <div className="flex items-center space-x-2">
//                   <Phone className="w-4 h-4" />
//                   <span>+91 91234 56789</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <MapPin className="w-4 h-4" />
//                   <span>Bandra, Mumbai, India</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Clock className="w-4 h-4" />
//                   <span>11:00 AM - 10:00 PM</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//             <p>
//               © 2025 La Gourmet. All rights reserved. | Crafted with culinary
//               excellence.
//             </p>
//           </div>
//         </div>
//       </footer>
      
//     </div>
//   );


//  }

//  export default PremiumRestaurantMenu;



import { useState, useEffect } from "react";
import { Clock, MapPin, Filter, Phone, Minus, Plus, ChevronDown, ChevronUp } from "lucide-react";
import NavBar from "../../Home/NavBar";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { createCart } from "../../../services/userServices/userServices";
import RestaurantHero from "./restuarentMain";

// Types for better TypeScript support
interface Variant {
  name: string;
  price: string;
}

interface Addon {
  name: string;
  price: string;
}

interface MenuItem {
  _id: string;
  itemName: string;
  images: string;
  category: string;
  description: string;
  price: string;
  variants?: Variant[];
  addons?: Addon[];
}

function PremiumRestaurantMenu() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});
  
  // New state for variants and addons
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [selectedAddons, setSelectedAddons] = useState<Record<string, string[]>>({});
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.user.name);
  const userId = useSelector((state: RootState) => state.user.id);
  const hotelId = useSelector(
    (state: RootState) => state.user.restaurentData.id
  );

  const restaurentState = useSelector(
    (state: RootState) => state.user.restaurentData || {}
  );
  const categories = useSelector(
    (state: RootState) => state.user.restaurentData?.categories || []
  );
  const menuItems: MenuItem[] = useSelector(
    (state: RootState) => state.user.restaurentData?.menu || []
  );

  console.log("menu of perticular restaurent:>>>>>", menuItems);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]._id);
    }
  }, [categories, selectedCategory]);

  const getItemQuantity = (itemId: string): number => {
    return itemQuantities[itemId] || 0;
  };

  const updateItemQuantity = (itemId: string, newQuantity: number): void => {
    if (newQuantity >= 0) {
      setItemQuantities((prev) => ({
        ...prev,
        [itemId]: newQuantity,
      }));
    }
  };

  const incrementQuantity = (itemId: string): void => {
    const currentQuantity = getItemQuantity(itemId);
    updateItemQuantity(itemId, currentQuantity + 1);
  };

  const decrementQuantity = (itemId: string): void => {
    const currentQuantity = getItemQuantity(itemId);
    if (currentQuantity > 0) {
      updateItemQuantity(itemId, currentQuantity - 1);
    }
  };

  // Toggle item expansion for variants/addons
  const toggleItemExpansion = (itemId: string): void => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Handle variant selection
  const handleVariantChange = (itemId: string, variantName: string): void => {
    setSelectedVariants((prev) => ({
      ...prev,
      [itemId]: variantName,
    }));
  };

  // Handle addon selection
  const handleAddonToggle = (itemId: string, addonName: string): void => {
    setSelectedAddons((prev) => {
      const currentAddons = prev[itemId] || [];
      const isSelected = currentAddons.includes(addonName);
      
      return {
        ...prev,
        [itemId]: isSelected
          ? currentAddons.filter(addon => addon !== addonName)
          : [...currentAddons, addonName],
      };
    });
  };
  
  let basePrice=0
  // Calculate total price for an item including variants and addons
  const calculateItemPrice = (item: MenuItem): number => {
     basePrice = parseFloat(item.price);
    
    // Add variant price if selected
    const selectedVariant = selectedVariants[item._id];
    console.log("Selected variant:::>>>",selectedVariant)
    if (selectedVariant && item.variants) {
      const variant = item.variants.find(v => v.name === selectedVariant);
      if (variant) {
        basePrice = parseFloat(variant.price);
      }
    }
    
    // Add addon prices if selected
    const itemAddons = selectedAddons[item._id] || [];
    if (itemAddons.length > 0 && item.addons) {
      itemAddons.forEach(addonName => {
        const addon = item.addons!.find(a => a.name === addonName);
        if (addon) {
          basePrice += parseFloat(addon.price);
        }
      });
    }

    console.log("Base price returned===>>",basePrice)
    
    return basePrice;
  };

  // Updated addToCart function
  const addToCart = async (id: string, userId: string) => {
    const quantity = getItemQuantity(id);
    if (quantity <= 0) {
      alert("Please select a quantity first!");
      return;
    }

    const item = menuItems.find((menuItem: MenuItem) => menuItem._id === id);
    if (!item) {
      alert("Item not found!");
      return;
    }

    // Check if variants are required but not selected
    if (item.variants && item.variants.length > 0 && !selectedVariants[id]) {
      alert("Please select a variant!");
      return;
    }

    const totalPrice = calculateItemPrice(item)
    console.log("Total Price:::::>>>>",totalPrice);
    const selectedVariant = selectedVariants[id];
    const itemAddons = selectedAddons[id] || [];

    try {
      const response = await createCart({
        productId: id,
        userId,
        hotelId,
        quantity,
        price: totalPrice,
        variant: selectedVariant,
        addons: itemAddons,
      });

      if (response) {
        alert(`Added ${quantity} item(s) to cart!`);
     
      } else {
        alert("Cannot add items");
      }

      return response;
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  const filteredItems = menuItems.filter(
    (item: MenuItem) => item.category === selectedCategory
  );

  // Find the current category for the heading
  const currentCategory = categories.find(
    (cat: any) => cat._id === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar isAuthenticated={isAuthenticated} user={user} />
      </div>

      <RestaurantHero restaurentState={restaurentState} />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Menu Content */}
          <div className="lg:col-span-4">
            <div className="flex flex-wrap gap-4 mb-8">
              {categories.map((category: any) => (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
                    selectedCategory === category._id
                      ? "bg-gradient-to-r from-[#cb202d] to-[#a01a26] text-white shadow-lg cursor-pointer"
                      : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm border border-gray-100 cursor-pointer"
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
              {filteredItems.map((item: MenuItem) => {
                const hasVariants = item.variants && item.variants.length > 0;
                const hasAddons = item.addons && item.addons.length > 0;
                const isExpanded = expandedItems[item._id];
                const totalPrice = calculateItemPrice(item);

                return (
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
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-xl font-bold text-[#cb202d] transition-colors">
                                  {item.itemName}
                                </h3>
                                {(hasVariants || hasAddons) && (
                                  <button
                                    onClick={() => toggleItemExpansion(item._id)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                  >
                                    {isExpanded ? (
                                      <ChevronUp className="w-5 h-5" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5" />
                                    )}
                                  </button>
                                )}
                              </div>
                              
                              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                {item.description}
                              </p>
                              
                              <div className="flex items-center space-x-4 mb-4">
                                <p className="text-red-600 text-lg font-bold">
                                  ₹ {totalPrice.toFixed(2)}
                                  {totalPrice !== parseFloat(item.price) && (
                                    <span className="text-gray-400 text-sm line-through ml-2">
                                      ₹ {item.price}
                                    </span>
                                  )}
                                </p>
                              </div>

                              {/* Variants and Addons - Expanded View */}
                              {isExpanded && (hasVariants || hasAddons) && (
                                <div className="border-t border-gray-100 pt-4 mb-4 space-y-4">
                                  {/* Variants Section */}
                                  {hasVariants && (
                                    <div>
                                      <h4 className="font-semibold text-gray-800 mb-2">
                                        Choose Variant {item.variants!.length > 0 && "*"}
                                      </h4>
                                      <div className="space-y-2">
                                        {item.variants!.map((variant, index) => (
                                          <label
                                            key={index}
                                            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                          >
                                            <input
                                              type="radio"
                                              name={`variant-${item._id}`}
                                              value={variant.name}
                                              checked={selectedVariants[item._id] === variant.name}
                                              onChange={() => handleVariantChange(item._id, variant.name)}
                                              className="text-[#cb202d] focus:ring-[#cb202d]"
                                            />
                                            <span className="flex-1 text-sm text-gray-700">
                                              {variant.name}
                                            </span>
                                            <span className="text-sm font-semibold text-[#cb202d]">
                                              +₹ {variant.price}
                                            </span>
                                          </label>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Addons Section */}
                                  {hasAddons && (
                                    <div>
                                      <h4 className="font-semibold text-gray-800 mb-2">
                                        Add-ons (Optional)
                                      </h4>
                                      <div className="space-y-2">
                                        {item.addons!.map((addon, index) => (
                                          <label
                                            key={index}
                                            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                          >
                                            <input
                                              type="checkbox"
                                              checked={(selectedAddons[item._id] || []).includes(addon.name)}
                                              onChange={() => handleAddonToggle(item._id, addon.name)}
                                              className="text-[#cb202d] focus:ring-[#cb202d]"
                                            />
                                            <span className="flex-1 text-sm text-gray-700">
                                              {addon.name}
                                            </span>
                                            <span className="text-sm font-semibold text-[#cb202d]">
                                              +₹ {addon.price}
                                            </span>
                                          </label>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Quantity controls */}
                              <div className="flex items-center justify-start mb-4">
                                <span className="text-sm font-semibold text-gray-600 mr-3">
                                  Quantity:
                                </span>
                                <div className="flex items-center bg-gray-100 rounded-lg border border-gray-200">
                                  <button
                                    onClick={() => decrementQuantity(item._id)}
                                    className="p-2 hover:bg-gray-200 transition-colors rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={getItemQuantity(item._id) <= 0}
                                    type="button"
                                  >
                                    <Minus className="w-4 h-4 text-gray-600" />
                                  </button>
                                  <span className="px-4 py-2 min-w-[50px] text-center font-semibold text-gray-800 bg-white border-l border-r border-gray-200">
                                    {getItemQuantity(item._id)}
                                  </span>
                                  <button
                                    onClick={() => incrementQuantity(item._id)}
                                    className="p-2 hover:bg-gray-200 transition-colors rounded-r-lg"
                                    type="button"
                                  >
                                    <Plus className="w-4 h-4 text-gray-600" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right ml-4">
                              <div className="flex items-center justify-end space-x-3">
                                {/* Add to Cart Button */}
                                <button
                                  onClick={() => addToCart(item._id, userId)}
                                  disabled={getItemQuantity(item._id) <= 0}
                                  className="group relative px-8 py-3.5 bg-[#cb202d] border-2 border-[#cb202d] text-white rounded-lg font-semibold text-sm uppercase tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:bg-[#a01a26] hover:border-[#a01a26] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#cb202d]/50 focus:ring-offset-2 focus:ring-offset-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:border-gray-400"
                                >
                                  <span className="flex items-center space-x-2">
                                    <svg
                                      className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h7M9.5 18a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                                      />
                                    </svg>
                                    <span>Add to Cart</span>
                                  </span>
                                </button>
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
    </div>
  );
}

export default PremiumRestaurantMenu;