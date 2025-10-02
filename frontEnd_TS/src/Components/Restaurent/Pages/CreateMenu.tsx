// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import {
//   Plus,
//   Trash2,
//   Upload,
//   AlertCircle,
//   Search,
//   Filter,
//   Edit3,
//   Eye,
//   Star,
//   ChefHat,
//   Tag,
// } from "lucide-react";

// import {
//   addCategory,
//   deleteCategory,
// } from "../../../services/restaurentServices/registration";
// import { useSelector, useDispatch } from "react-redux";
// import type { RootState } from "../../../redux/store";
//  import { getAllCategories } from "../../../services/restaurentServices/registration";
//  import { addNewCategory } from "../../../redux/Slice/restaurentSlice";
//  import { createMenu } from "../../../services/restaurentServices/registration";
//  import { getMenu } from "../../../services/restaurentServices/registration";
//  import { addNewMenu } from "../../../redux/Slice/restaurentSlice";
//  import axios from "axios";

// function CreateMenu() {
//   const dispatch = useDispatch();
//   const restaurentId = useSelector(
//     (state: RootState) => state.restaurentSlice.hotelDetails.id
//   );

//   const categories = useSelector(
//     (state: RootState) => state.restaurentSlice.categories || []
//   );
//   const menuItems = useSelector(
//     (state: RootState) => state.restaurentSlice.menu
//   );

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await getAllCategories(restaurentId);
//         if (response) {
//           dispatch(addNewCategory(response));
//         } else {
//           console.log("No categories returned");
//         }
//       } catch (error) {
//         console.error("Failed to fetch categories:", error);
//       }
//     };

//     const fetchMenu = async () => {
//       try {
//         const response = await getMenu(restaurentId);

//         if (response) {
//           console.log("Menu:", response);
//           dispatch(addNewMenu(response));
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     Promise.all([fetchCategories(), fetchMenu()]);
//   }, [dispatch, restaurentId]);

//   const [newItem, setNewItem] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     image: null,
//     featured: false,
//   });

//   const categoryList = useSelector(
//     (state: RootState) => state.restaurentSlice.categories
//   );

//   const [previewImage, setPreviewImage] = useState("");
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");
//   const [activeTab, setActiveTab] = useState("overview");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterCategory, setFilterCategory] = useState("");
//   //const [editingItem, setEditingItem] = useState(null);
//   const [image, setImage] = useState(null); // my image
//   const [imageresponse, setImageresponse] = useState(""); // my image response
//   const [imageresponseLoading, setImageresponseLoading] = useState(false);
//   const [category, setCategory] = useState(""); // my category

//   // Form validation
//   const validateForm = () => {
//     const newErrors = {};
//     if (!newItem.name.trim()) newErrors.name = "Item name is required";
//     if (!newItem.price || newItem.price <= 0)
//       newErrors.price = "Valid price is required";
//     if (!newItem.category) newErrors.category = "Category is required";
//     if (!newItem.description.trim())
//       newErrors.description = "Description is required";
//     return newErrors;
//   };

//   // Handle category addition
//   const handleAddCategory = async (e: React.FormEvent<HTMLInputElement>) => {
//     e.preventDefault();

//     const response = await addCategory({
//       name: category,
//       hotelId: restaurentId,
//     });
//     console.log(response);
//     if (response) {
//       setCategory("");
//       const updated = await getAllCategories(restaurentId);
//       dispatch(addNewCategory(updated));
//     }
//     alert(response.message);
//   };

//   const handleAddItem = async () => {
//     try {
//       const data = {
//         hotelId: restaurentId,
//         itemName: newItem.name,
//         category: newItem.category,
//         featured: newItem.featured,
//         description: newItem.description,
//         price: newItem.price,
//       };

//       const categoryObject = categoryList.find(
//         (item) => item.name == newItem.category
//       );

//       console.log("category List:", categoryList);
//       console.log("categoryObject:", categoryObject);

//       const response = await createMenu({
//         ...data,
//         category: categoryObject?._id,
//         images: imageresponse,
//       });
//       if (response) {
//         console.log(response);
//         alert(response.message);
//         window.location.reload();
//       }
//     } catch (error) {
//       console.log("found some error ");
//       console.log(error);
//     }
//   };

//   //upload to cloudinary

//   const uploadToCloudinary = async (file) => {
//     try {
//       console.log("image uploading");
//       const imageFormData = new FormData();

//       imageFormData.append("file", file);
//       imageFormData.append("upload_preset", "Menu_images");
//       setImageresponseLoading(true);

//       const response = await axios.post(
//         "https://api.cloudinary.com/v1_1/dsheqlajm/image/upload",
//         imageFormData
//       );

//       if (response.data.secure_url) {
//         setImageresponseLoading(false);
//       } else {
//         alert("Something went wrong! unable to add image");
//       }

//       return response.data.secure_url;
//     } catch (error) {
//       console.log("uploading error");
//       console.log(error);
//     }
//   };

//   // Handle image upload
//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         setErrors({ ...errors, image: "Image size must be less than 5MB" });
//         return;
//       }

//       setImage(file);
//       const previewUrl = URL.createObjectURL(file);
//       setPreviewImage(previewUrl);

//       const imageResponse = await uploadToCloudinary(file);

//       if (imageResponse) {
//         console.log("image response:", imageResponse);
//         setImageresponse(imageResponse);
//       }

//       setErrors({ ...errors, image: "" });
//     }
//   };

//   // Handle category deletion
//   const handleDeleteCategory = async (categoryId: string) => {
//     const category = categoryList.find((item) => item._id == categoryId);

//     console.log("CategoryList:", categoryList);
//     const result = await Swal.fire({
//       title: "Delete Category?",
//       html: `Are you sure you want to Delete <strong style="color: #cb202d">${category?.name}</strong>?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#00b074",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Delete",
//       cancelButtonText: "Cancel",
//       reverseButtons: true,
//     });

//     if (result.isConfirmed) {
//       const response = await deleteCategory(categoryId);

//       if (response) {
//         console.log("Response from deletion:", response);
//         alert(response.message);

//         const updatedCategories = await getAllCategories(restaurentId);
//         dispatch(addNewCategory(updatedCategories))
//         const updatedMenu=await getMenu(restaurentId)
//         dispatch(addNewMenu(updatedMenu));
//       }
//     }
//   };

//   // Handle menu item deletion
//   const handleDeleteItem = (id: string) => {
//     console.log("Delete item worked:", id);
//   };

//   // Utility functions
//   const resetForm = () => {
//     setNewItem({
//       name: "",
//       description: "",
//       price: "",
//       category: "",
//       image: null,
//       featured: false,
//     });
//     setPreviewImage(null);
//     setErrors({});
//     //setEditingItem(null);
//   };

//   const showSuccessMessage = (message) => {
//     setSuccessMessage(message);
//     setTimeout(() => setSuccessMessage(""), 4000);
//   };

//   // Filter menu items

//   const filteredItems = menuItems.filter((item) => {
//     const matchesSearch =
//       item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = !filterCategory || item.category === filterCategory;

//     console.log("MatchSearch:", matchesCategory);
//     console.log("MatchesCategory:", matchesCategory);
//     return matchesSearch && matchesCategory;
//   });
 

//   // category change handeling

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCategory(e.target.value);
//   };

//   const getCategoryItem = (categoryId: string) => {
//     const category = categories.find((item) => item._id == categoryId);

//     return category ? category.name : "Uncategorized";
//   };

//   // Clean up preview image URL
//   useEffect(() => {
//     return () => {
//       if (previewImage) URL.revokeObjectURL(previewImage);
//     };
//   }, [previewImage]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       <div className="container mx-auto p-6 max-w-7xl">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900 mb-2">
//                 Menu Management
//               </h1>
//               <p className="text-gray-600 text-lg">
//                 Manage your restaurant's menu items and categories
//               </p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="bg-white rounded-xl shadow-lg p-4 flex items-center space-x-3">
//                 <ChefHat className="text-red-600" size={24} />
//                 <div>
//                   <p className="text-sm text-gray-500">Total Items</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {menuItems.length}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Success Message */}
//           {successMessage && (
//             <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 rounded-xl shadow-sm animate-pulse">
//               <div className="flex items-center space-x-2">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <span className="font-medium">{successMessage}</span>
//               </div>
//             </div>
//           )}

//           {/* Tab Navigation */}
//           <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
//             {[
//               { id: "overview", label: "Overview", icon: Eye },
//               { id: "add-item", label: "Add Item", icon: Plus },
//               { id: "categories", label: "Categories", icon: Tag },
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
//                   activeTab === tab.id
//                     ? "bg-white text-red-600 shadow-md transform scale-105"
//                     : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
//                 }`}
//               >
//                 <tab.icon size={18} />
//                 <span>{tab.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Overview Tab */}
//         {activeTab === "overview" && (
//           <div className="space-y-8">
//             {/* Statistics Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               {[
//                 {
//                   label: "Total Items",
//                   value: menuItems.length,
//                   icon: ChefHat,
//                   color: "red",
//                 },
//                 {
//                   label: "Categories",
//                   value: categories.length,
//                   icon: Tag,
//                   color: "blue",
//                 },
//                 {
//                   label: "Featured Items",
//                   value: menuItems.filter((item) => item.featuredItem).length,
//                   icon: Star,
//                   color: "yellow",
//                 },
//               ].map((stat, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
//                 >
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
//                       <p className="text-3xl font-bold text-gray-900">
//                         {stat.value}
//                       </p>
//                     </div>
//                     <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
//                       <stat.icon
//                         className={`text-${stat.color}-600`}
//                         size={24}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Search and Filter */}
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <div className="flex flex-col md:flex-row gap-4 mb-6">
//                 <div className="flex-1 relative">
//                   <Search
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={20}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Search menu items..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
//                   />
//                 </div>
//                 <div className="relative">
//                   <Filter
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={20}
//                   />
//                   <select
//                     value={filterCategory}
//                     onChange={(e) => setFilterCategory(e.target.value)}
//                     className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none bg-white"
//                   >
//                     <option value="">All Categories</option>
//                     {categories.map((category) => (
//                       <option key={category._id} value={category.name}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Menu Items Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredItems.map((item) => (
//                   <div
//                     key={item._id}
//                     className="group bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
//                   >
//                     <div className="relative">
//                       {item.images ? (
//                         <img
                     
//                           src={item.images}
//                           alt={item.itemName}
//                           className="w-full h-48 object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
//                           <ChefHat className="text-gray-400" size={48} />
//                         </div>
//                       )}
//                       {item.featuredItem && (
//                         <div className="absolute top-3 left-3">
//                           <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
//                             <Star size={12} />
//                             <span>Featured</span>
//                           </div>
//                         </div>
//                       )}
//                       <button
//                         onClick={() => toggleFeatured(item._id)}
//                         className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
//                       >
//                         <Star
//                           className={
//                             item.featuredItem
//                               ? "text-yellow-500 fill-current"
//                               : "text-gray-400"
//                           }
//                           size={16}
//                         />
//                       </button>
//                     </div>
//                     <div className="p-6">
//                       <div className="flex items-start justify-between mb-3">
//                         <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
//                           {item.itemName}
//                         </h3>
//                         <span className="text-2xl font-bold text-red-600">
//                           ₹ {item.price}
//                         </span>
//                       </div>
//                       <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                         {item.description}
//                       </p>
//                       <div className="flex items-center justify-between">
//                         <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
//                           {getCategoryItem(item.category)}
//                         </span>
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() => setEditingItem(item)}
//                             className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
//                           >
//                             <Edit3 size={16} />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteItem(item.id)}
//                             className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
//                           >
//                             <Trash2 size={16} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Add Item Tab */}
//         {activeTab === "add-item" && (
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-8">
//               Add New Menu Item
//             </h2>
//             <div className="space-y-8">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Item Name
//                     </label>
//                     <input
//                       type="text"
//                       value={newItem.name}
//                       onChange={(e) =>
//                         setNewItem({ ...newItem, name: e.target.value })
//                       }
//                       placeholder="e.g., Grilled Salmon"
//                       className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
//                     />
//                     {errors.name && (
//                       <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
//                         <AlertCircle size={16} /> {errors.name}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Description
//                     </label>
//                     <textarea
//                       value={newItem.description}
//                       onChange={(e) =>
//                         setNewItem({ ...newItem, description: e.target.value })
//                       }
//                       placeholder="Describe your dish..."
//                       className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
//                       rows="4"
//                     />
//                     {errors.description && (
//                       <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
//                         <AlertCircle size={16} /> {errors.description}
//                       </p>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Price {'\u20B9'}
//                       </label>
//                       <input
//                         type="text"
//                         value={newItem.price}
//                         onChange={(e) =>
//                           setNewItem({ ...newItem, price: e.target.value })
//                         }
//                         placeholder="0.00"
//                         className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
//                         step="0.01"
//                         min="0"
//                       />
//                       {errors.price && (
//                         <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
//                           <AlertCircle size={16} /> {errors.price}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Category
//                       </label>
//                       <select
//                         value={newItem.category}
//                         onChange={(e) =>
//                           setNewItem({ ...newItem, category: e.target.value })
//                         }
//                         className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
//                       >
//                         <option value="">Select Category</option>
//                         {categories.map((category) => (
//                           <option key={category._id} value={category.name}>
//                             {category.name}
//                           </option>
//                         ))}
//                       </select>
//                       {errors.category && (
//                         <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
//                           <AlertCircle size={16} /> {errors.category}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-3">
//                     <input
//                       type="checkbox"
//                       id="featured"
//                       checked={newItem.featured}
//                       onChange={(e) =>
//                         setNewItem({ ...newItem, featured: e.target.checked })
//                       }
//                       className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
//                     />
//                     <label
//                       htmlFor="featured"
//                       className="text-sm font-semibold text-gray-700"
//                     >
//                       Mark as Featured Item
//                     </label>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Upload Image
//                   </label>
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 group">
//                       {previewImage ? (
//                         <div className="relative w-full h-full">
//                           <img
//                             src={previewImage}
//                             alt="Preview"
//                             className="w-full h-full object-cover rounded-xl"
//                           />
//                           <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-xl flex items-center justify-center">
//                             <Upload
//                               className="text-white opacity-0 group-hover:opacity-100 transition-all duration-200"
//                               size={32}
//                             />
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                           <Upload className="w-16 h-16 mb-4 text-gray-400 group-hover:text-red-500 transition-colors" />
//                           <p className="mb-2 text-lg text-gray-600 font-semibold group-hover:text-gray-900">
//                             Click to upload image
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             PNG, JPG up to 5MB
//                           </p>
//                         </div>
//                       )}
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                   {errors.image && (
//                     <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
//                       <AlertCircle size={16} /> {errors.image}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between pt-6 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
//                 >
//                   Reset Form
//                 </button>
//                 <button
//                   onClick={handleAddItem}
//                   disabled={imageresponseLoading}
//                   className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
//                 >
//                   <Plus size={20} />
//                   {imageresponseLoading ? "Uploading image" : "Add Menu Item"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Categories Tab */}
//         {activeTab === "categories" && (
//           <div className="space-y-8">
//             {/* Add Category Form */}
//             <div className="bg-white rounded-xl shadow-lg p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Add New Category
//               </h2>
//               <form onSubmit={handleAddCategory}>
//                 <div className="flex gap-4">
//                   <div className="flex-1">
//                     <input
//                       type="text"
//                       value={category}
//                       onChange={handleCategoryChange}
//                       placeholder="Enter category name"
//                       className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     //   onClick={handleAddCategory}
//                     className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center gap-2 shadow-lg"
//                   >
//                     <Plus size={20} />
//                     Add Category
//                   </button>
//                 </div>
//               </form>
//             </div>

//             {/* Categories List */}
//             <div className="bg-white rounded-xl shadow-lg p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Categories
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {categories.map((category) => (
//                   <div
//                     key={category._id}
//                     className="flex justify-between items-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 group"
//                   >
//                     <div className="flex items-center space-x-3">
//                       <Tag className="text-red-600" size={20} />
//                       <span className="text-gray-900 font-semibold">
//                         {category.name}
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => handleDeleteCategory(category._id)}
//                       className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 hover:bg-red-50 rounded-lg"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CreateMenu;

// import React, { useState, useEffect } from "react";
// import {
//   Plus,
//   Trash2,
//   Upload,
//   AlertCircle,
//   Search,
//   Filter,
//   Edit3,
//   Eye,
//   Star,
//   ChefHat,
//   Tag,
//   X,
//   Settings
// } from "lucide-react";

// function CreateMenu() {

//    const dispatch = useDispatch();
//   const restaurentId = useSelector(
//     (state: RootState) => state.restaurentSlice.hotelDetails.id
//   );

//   const categories = useSelector(
//     (state: RootState) => state.restaurentSlice.categories || []
//   );
//   const menuItems = useSelector(
//     (state: RootState) => state.restaurentSlice.menu
//   );

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await getAllCategories(restaurentId);
//         if (response) {
//           dispatch(addNewCategory(response));
//         } else {
//           console.log("No categories returned");
//         }
//       } catch (error) {
//         console.error("Failed to fetch categories:", error);
//       }
//     };

//     const fetchMenu = async () => {
//       try {
//         const response = await getMenu(restaurentId);

//         if (response) {
//           console.log("Menu:", response);
//           dispatch(addNewMenu(response));
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     Promise.all([fetchCategories(), fetchMenu()]);
//   }, [dispatch, restaurentId]);
  
//   const [newItem, setNewItem] = useState({
//     name: "",
//     description: "",
//     basePrice: "",
//     category: "",
//     image: null,
//     featured: false,
//     variants: [],
//     addons: []
//   });

//   const [previewImage, setPreviewImage] = useState("");
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");
//   const [activeTab, setActiveTab] = useState("overview");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterCategory, setFilterCategory] = useState("");
//   const [category, setCategory] = useState("");



//   // Variant management functions
//   const handleVariantChange = (index, field, value) => {
//     const newVariants = [...newItem.variants];
//     newVariants[index][field] = value;
//     setNewItem({ ...newItem, variants: newVariants });
//   };

//   const addVariant = () => {
//     setNewItem({
//       ...newItem,
//       variants: [...newItem.variants, { name: "", price: "" }]
//     });
//   };

//   const removeVariant = (index) => {
//     setNewItem({
//       ...newItem,
//       variants: newItem.variants.filter((_, i) => i !== index)
//     });
//   };

//   // Addon management functions
//   const handleAddonChange = (index, field, value) => {
//     const newAddons = [...newItem.addons];
//     newAddons[index][field] = value;
//     setNewItem({ ...newItem, addons: newAddons });
//   };

//   const addAddon = () => {
//     setNewItem({
//       ...newItem,
//       addons: [...newItem.addons, { name: "", price: "" }]
//     });
//   };

//   const removeAddon = (index) => {
//     setNewItem({
//       ...newItem,
//       addons: newItem.addons.filter((_, i) => i !== index)
//     });
//   };

//   // Form validation
//   const validateForm = () => {
//     const newErrors = {};
//     if (!newItem.name.trim()) newErrors.name = "Item name is required";
//     if (!newItem.category) newErrors.category = "Category is required";
//     if (!newItem.description.trim()) newErrors.description = "Description is required";
    
//     // Validate pricing - either base price or variants required
//     if (!newItem.basePrice && newItem.variants.length === 0) {
//       newErrors.pricing = "Either base price or variants are required";
//     }
    
//     // Validate variants
//     newItem.variants.forEach((variant, index) => {
//       if (!variant.name.trim()) {
//         newErrors[`variant_name_${index}`] = "Variant name is required";
//       }
//       if (!variant.price || variant.price <= 0) {
//         newErrors[`variant_price_${index}`] = "Valid variant price is required";
//       }
//     });

//     // Validate addons
//     newItem.addons.forEach((addon, index) => {
//       if (!addon.name.trim()) {
//         newErrors[`addon_name_${index}`] = "Addon name is required";
//       }
//       if (!addon.price || addon.price <= 0) {
//         newErrors[`addon_price_${index}`] = "Valid addon price is required";
//       }
//     });

//     return newErrors;
//   };

//   const handleAddItem = () => {
//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }

//     const finalItem = {
//       name: newItem.name,
//       description: newItem.description,
//       basePrice: newItem.basePrice ? parseFloat(newItem.basePrice) : null,
//       variants: newItem.variants.map(v => ({ 
//         name: v.name, 
//         price: parseFloat(v.price) 
//       })),
//       addons: newItem.addons.map(a => ({ 
//         name: a.name, 
//         price: parseFloat(a.price) 
//       })),
//       category: newItem.category,
//       featured: newItem.featured
//     };
    
//     console.log("Final Menu Item:", finalItem);
//     showSuccessMessage("Menu item added successfully!");
//     resetForm();
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         setErrors({ ...errors, image: "Image size must be less than 5MB" });
//         return;
//       }

//       const previewUrl = URL.createObjectURL(file);
//       setPreviewImage(previewUrl);
//       setNewItem({ ...newItem, image: file });
//       setErrors({ ...errors, image: "" });
//     }
//   };

//   const resetForm = () => {
//     setNewItem({
//       name: "",
//       description: "",
//       basePrice: "",
//       category: "",
//       image: null,
//       featured: false,
//       variants: [],
//       addons: []
//     });
//     setPreviewImage("");
//     setErrors({});
//   };

//   const showSuccessMessage = (message:string) => {
//     setSuccessMessage(message);
//     setTimeout(() => setSuccessMessage(""), 4000);
//   };

//   const getCategoryName = (categoryId:string) => {
//     const category = categories.find((item) => item._id === categoryId);
//     return category ? category.name : "Uncategorized";
//   };

//   const filteredItems = menuItems.filter((item) => {
//     const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = !filterCategory || item.category === filterCategory;
//     return matchesSearch && matchesCategory;
//   });

//   useEffect(() => {
//     return () => {
//       if (previewImage) URL.revokeObjectURL(previewImage);
//     };
//   }, [previewImage]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       <div className="container mx-auto p-6 max-w-7xl">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900 mb-2">
//                 Menu Management
//               </h1>
//               <p className="text-gray-600 text-lg">
//                 Manage your restaurant's menu items with variants and addons
//               </p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="bg-white rounded-xl shadow-lg p-4 flex items-center space-x-3">
//                 <ChefHat className="text-red-600" size={24} />
//                 <div>
//                   <p className="text-sm text-gray-500">Total Items</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {menuItems.length}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Success Message */}
//           {successMessage && (
//             <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 rounded-xl shadow-sm animate-pulse">
//               <div className="flex items-center space-x-2">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <span className="font-medium">{successMessage}</span>
//               </div>
//             </div>
//           )}

//           {/* Tab Navigation */}
//           <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
//             {[
//               { id: "overview", label: "Overview", icon: Eye },
//               { id: "add-item", label: "Add Item", icon: Plus },
//               { id: "categories", label: "Categories", icon: Tag },
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
//                   activeTab === tab.id
//                     ? "bg-white text-red-600 shadow-md transform scale-105"
//                     : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
//                 }`}
//               >
//                 <tab.icon size={18} />
//                 <span>{tab.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Overview Tab */}
//         {activeTab === "overview" && (
//           <div className="space-y-8">
//             {/* Statistics Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               {[
//                 {
//                   label: "Total Items",
//                   value: menuItems.length,
//                   icon: ChefHat,
//                   color: "red",
//                 },
//                 {
//                   label: "Categories",
//                   value: categories.length,
//                   icon: Tag,
//                   color: "blue",
//                 },
//                 {
//                   label: "Featured Items",
//                   value: menuItems.filter((item) => item.featuredItem).length,
//                   icon: Star,
//                   color: "yellow",
//                 },
//                 {
//                   label: "With Variants",
//                   value: menuItems.filter((item) => item.variants && item.variants.length > 0).length,
//                   icon: Settings,
//                   color: "green",
//                 },
//               ].map((stat, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
//                 >
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
//                       <p className="text-3xl font-bold text-gray-900">
//                         {stat.value}
//                       </p>
//                     </div>
//                     <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
//                       <stat.icon
//                         className={`text-${stat.color}-600`}
//                         size={24}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Search and Filter */}
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <div className="flex flex-col md:flex-row gap-4 mb-6">
//                 <div className="flex-1 relative">
//                   <Search
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={20}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Search menu items..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
//                   />
//                 </div>
//                 <div className="relative">
//                   <Filter
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={20}
//                   />
//                   <select
//                     value={filterCategory}
//                     onChange={(e) => setFilterCategory(e.target.value)}
//                     className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none bg-white"
//                   >
//                     <option value="">All Categories</option>
//                     {categories.map((category) => (
//                       <option key={category._id} value={category._id}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Menu Items Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredItems.map((item) => (
//                   <div
//                     key={item._id}
//                     className="group bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
//                   >
//                     <div className="relative">
//                       {item.images ? (
//                         <img
//                           src={item.images}
//                           alt={item.itemName}
//                           className="w-full h-48 object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
//                           <ChefHat className="text-gray-400" size={48} />
//                         </div>
//                       )}
//                       {item.featuredItem && (
//                         <div className="absolute top-3 left-3">
//                           <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
//                             <Star size={12} />
//                             <span>Featured</span>
//                           </div>
//                         </div>
//                       )}
//                       {/* Variants indicator */}
//                       {item.variants && item.variants.length > 0 && (
//                         <div className="absolute top-3 right-3">
//                           <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
//                             {item.variants.length} variants
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                     <div className="p-6">
//                       <div className="flex items-start justify-between mb-3">
//                         <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
//                           {item.itemName}
//                         </h3>
//                         <div className="text-right">
//                           {item.basePrice ? (
//                             <span className="text-2xl font-bold text-red-600">
//                               ₹{item.basePrice}
//                             </span>
//                           ) : (
//                             item.variants && item.variants.length > 0 && (
//                               <div className="text-sm text-gray-600">
//                                 <span className="text-lg font-bold text-red-600">
//                                   ₹{Math.min(...item.variants.map(v => v.price))}
//                                 </span>
//                                 <span> - </span>
//                                 <span className="text-lg font-bold text-red-600">
//                                   ₹{Math.max(...item.variants.map(v => v.price))}
//                                 </span>
//                               </div>
//                             )
//                           )}
//                         </div>
//                       </div>
//                       <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                         {item.description}
//                       </p>
                      
//                       {/* Variants preview */}
//                       {item.variants && item.variants.length > 0 && (
//                         <div className="mb-3">
//                           <p className="text-xs text-gray-500 mb-1">Variants:</p>
//                           <div className="flex flex-wrap gap-1">
//                             {item.variants.slice(0, 2).map((variant, index) => (
//                               <span
//                                 key={index}
//                                 className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
//                               >
//                                 {variant.name} - ₹{variant.price}
//                               </span>
//                             ))}
//                             {item.variants.length > 2 && (
//                               <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
//                                 +{item.variants.length - 2} more
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       )}

//                       {/* Addons preview */}
//                       {item.addons && item.addons.length > 0 && (
//                         <div className="mb-3">
//                           <p className="text-xs text-gray-500 mb-1">Addons available:</p>
//                           <div className="flex flex-wrap gap-1">
//                             {item.addons.slice(0, 2).map((addon, index) => (
//                               <span
//                                 key={index}
//                                 className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
//                               >
//                                 {addon.name} +₹{addon.price}
//                               </span>
//                             ))}
//                             {item.addons.length > 2 && (
//                               <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
//                                 +{item.addons.length - 2} more
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       )}

//                       <div className="flex items-center justify-between">
//                         <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
//                           {getCategoryName(item.category)}
//                         </span>
//                         <div className="flex space-x-2">
//                           <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
//                             <Edit3 size={16} />
//                           </button>
//                           <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
//                             <Trash2 size={16} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Add Item Tab */}
//         {activeTab === "add-item" && (
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-8">
//               Add New Menu Item
//             </h2>
//             <div className="space-y-8">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Item Name
//                     </label>
//                     <input
//                       type="text"
//                       value={newItem.name}
//                       onChange={(e) =>
//                         setNewItem({ ...newItem, name: e.target.value })
//                       }
//                       placeholder="e.g., Grilled Salmon"
//                       className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
//                     />
//                     {errors.name && (
//                       <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
//                         <AlertCircle size={16} /> {errors.name}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Description
//                     </label>
//                     <textarea
//                       value={newItem.description}
//                       onChange={(e) =>
//                         setNewItem({ ...newItem, description: e.target.value })
//                       }
//                       placeholder="Describe your dish..."
//                       className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
//                       rows="4"
//                     />
//                     {errors.description && (
//                       <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
//                         <AlertCircle size={16} /> {errors.description}
//                       </p>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Base Price ₹ <span className="text-gray-500 text-xs">(Optional if using variants)</span>
//                       </label>
//                       <input
//                         type="number"
//                         value={newItem.basePrice}
//                         onChange={(e) =>
//                           setNewItem({ ...newItem, basePrice: e.target.value })
//                         }
//                         placeholder="0.00"
//                         className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
//                         step="0.01"
//                         min="0"
//                       />
//                       {errors.pricing && (
//                         <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
//                           <AlertCircle size={16} /> {errors.pricing}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Category
//                       </label>
//                       <select
//                         value={newItem.category}
//                         onChange={(e) =>
//                           setNewItem({ ...newItem, category: e.target.value })
//                         }
//                         className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
//                       >
//                         <option value="">Select Category</option>
//                         {categories.map((category) => (
//                           <option key={category._id} value={category._id}>
//                             {category.name}
//                           </option>
//                         ))}
//                       </select>
//                       {errors.category && (
//                         <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
//                           <AlertCircle size={16} /> {errors.category}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Variants Section */}
//                   <div className="border-t pt-6">
//                     <h3 className="text-lg font-semibold mb-4 text-gray-900">Variants</h3>
//                     {newItem.variants.map((variant, index) => (
//                       <div
//                         key={index}
//                         className="flex gap-3 mb-3 items-start"
//                       >
//                         <div className="flex-1">
//                           <input
//                             placeholder="Variant Name (e.g. Half Portion)"
//                             value={variant.name}
//                             onChange={(e) => handleVariantChange(index, "name", e.target.value)}
//                             className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                           />
//                           {errors[`variant_name_${index}`] && (
//                             <p className="mt-1 text-sm text-red-600">{errors[`variant_name_${index}`]}</p>
//                           )}
//                         </div>
//                         <div className="w-32">
//                           <input
//                             type="number"
//                             placeholder="Price"
//                             value={variant.price}
//                             onChange={(e) => handleVariantChange(index, "price", e.target.value)}
//                             className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                           />
//                           {errors[`variant_price_${index}`] && (
//                             <p className="mt-1 text-sm text-red-600">{errors[`variant_price_${index}`]}</p>
//                           )}
//                         </div>
//                         <button
//                           onClick={() => removeVariant(index)}
//                           className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
//                         >
//                           <X size={20} />
//                         </button>
//                       </div>
//                     ))}
//                     <button
//                       onClick={addVariant}
//                       className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
//                     >
//                       <Plus size={16} />
//                       Add Variant
//                     </button>
//                   </div>

//                   {/* Addons Section */}
//                   <div className="border-t pt-6">
//                     <h3 className="text-lg font-semibold mb-4 text-gray-900">Addons</h3>
//                     {newItem.addons.map((addon, index) => (
//                       <div
//                         key={index}
//                         className="flex gap-3 mb-3 items-start"
//                       >
//                         <div className="flex-1">
//                           <input
//                             placeholder="Addon Name (e.g. Extra Cheese)"
//                             value={addon.name}
//                             onChange={(e) => handleAddonChange(index, "name", e.target.value)}
//                             className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                           />
//                           {errors[`addon_name_${index}`] && (
//                             <p className="mt-1 text-sm text-red-600">{errors[`addon_name_${index}`]}</p>
//                           )}
//                         </div>
//                         <div className="w-32">
//                           <input
//                             type="number"
//                             placeholder="Price"
//                             value={addon.price}
//                             onChange={(e) => handleAddonChange(index, "price", e.target.value)}
//                             className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                           />
//                           {errors[`addon_price_${index}`] && (
//                             <p className="mt-1 text-sm text-red-600">{errors[`addon_price_${index}`]}</p>
//                           )}
//                         </div>
//                         <button
//                           onClick={() => removeAddon(index)}
//                           className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
//                         >
//                           <X size={20} />
//                         </button>
//                       </div>
//                     ))}
//                     <button
//                       onClick={addAddon}
//                       className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center gap-2"
//                     >
//                       <Plus size={16} />
//                       Add Addon
//                     </button>
//                   </div>

//                   <div className="flex items-center space-x-3">
//                     <input
//                       type="checkbox"
//                       id="featured"
//                       checked={newItem.featured}
//                       onChange={(e) =>
//                         setNewItem({ ...newItem, featured: e.target.checked })
//                       }
//                       className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
//                     />
//                     <label
//                       htmlFor="featured"
//                       className="text-sm font-semibold text-gray-700"
//                     >
//                       Mark as Featured Item
//                     </label>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Upload Image
//                   </label>
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 group">
//                       {previewImage ? (
//                         <div className="relative w-full h-full">
//                           <img
//                             src={previewImage}
//                             alt="Preview"
//                             className="w-full h-full object-cover rounded-xl"
//                           />
//                           <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-xl flex items-center justify-center">
//                             <Upload
//                               className="text-white opacity-0 group-hover:opacity-100 transition-all duration-200"
//                               size={32}
//                             />
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                           <Upload className="w-16 h-16 mb-4 text-gray-400 group-hover:text-red-500 transition-colors" />
//                           <p className="mb-2 text-lg text-gray-600 font-semibold group-hover:text-gray-900">
//                             Click to upload image
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             PNG, JPG up to 5MB
//                           </p>
//                         </div>
//                       )}
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                   {errors.image && (
//                     <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
//                       <AlertCircle size={16} /> {errors.image}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between pt-6 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
//                 >
//                   Reset Form
//                 </button>
//                 <button
//                   onClick={handleAddItem}
//                   className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center gap-2 shadow-lg"
//                 >
//                   <Plus size={20} />
//                   Add Menu Item
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Categories Tab */}
//         {activeTab === "categories" && (
//           <div className="space-y-8">
//             {/* Add Category Form */}
//             <div className="bg-white rounded-xl shadow-lg p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Add New Category
//               </h2>
//               <div className="flex gap-4">
//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     placeholder="Enter category name"
//                     className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
//                   />
//                 </div>
//                 <button
//                   onClick={() => {
//                     if (category.trim()) {
//                       showSuccessMessage(`Category "${category}" added successfully!`);
//                       setCategory("");
//                     }
//                   }}
//                   className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center gap-2 shadow-lg"
//                 >
//                   <Plus size={20} />
//                   Add Category
//                 </button>
//               </div>
//             </div>

//             {/* Categories List */}
//             <div className="bg-white rounded-xl shadow-lg p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Categories
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {categories.map((category) => (
//                   <div
//                     key={category._id}
//                     className="flex justify-between items-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 group"
//                   >
//                     <div className="flex items-center space-x-3">
//                       <Tag className="text-red-600" size={20} />
//                       <span className="text-gray-900 font-semibold">
//                         {category.name}
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => {
//                         if (confirm(`Delete category "${category.name}"?`)) {
//                           showSuccessMessage(`Category "${category.name}" deleted successfully!`);
//                         }
//                       }}
//                       className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 hover:bg-red-50 rounded-lg"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CreateMenu;









// import React, { useState, useEffect } from "react";
// import {
//   Plus,
//   Trash2,
//   Upload,
//   AlertCircle,
//   Search,
//   Filter,
//   Edit3,
//   Eye,
//   Star,
//   ChefHat,
//   Tag,
//   X,
//   Settings
// } from "lucide-react";
// import {
//   addCategory,
//   deleteCategory,
// } from "../../../services/restaurentServices/registration";
// import { useSelector, useDispatch } from "react-redux";
// import type { RootState } from "../../../redux/store";
// import { getAllCategories } from "../../../services/restaurentServices/registration";
// import { addNewCategory } from "../../../redux/Slice/restaurentSlice";
// import { createMenu } from "../../../services/restaurentServices/registration";
// import { getMenu } from "../../../services/restaurentServices/registration";
// import { addNewMenu } from "../../../redux/Slice/restaurentSlice";
// import axios from "axios";
// import Swal from "sweetalert2";

// function CreateMenu() {
//   const dispatch = useDispatch();
//   const restaurentId = useSelector(
//     (state: RootState) => state.restaurentSlice.hotelDetails.id
//   );

//   const categories = useSelector(
//     (state: RootState) => state.restaurentSlice.categories || []
//   );
//   const menuItems = useSelector(
//     (state: RootState) => state.restaurentSlice.menu
//   );

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await getAllCategories(restaurentId);
//         if (response) {
//           dispatch(addNewCategory(response));
//         } else {
//           console.log("No categories returned");
//         }
//       } catch (error) {
//         console.error("Failed to fetch categories:", error);
//       }
//     };

//     const fetchMenu = async () => {
//       try {
//         const response = await getMenu(restaurentId);

//         if (response) {
//           console.log("Menu:", response);
//           dispatch(addNewMenu(response));
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     Promise.all([fetchCategories(), fetchMenu()]);
//   }, [dispatch, restaurentId]);
  
//   const [newItem, setNewItem] = useState({
//     name: "",
//     description: "",
//     price: "",
//     basePrice: "",
//     category: "",
//     image: null,
//     featured: false,
//     variants: [],
//     addons: []
//   });

//   const categoryList = useSelector(
//     (state: RootState) => state.restaurentSlice.categories
//   );

//   const [previewImage, setPreviewImage] = useState("");
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");
//   const [activeTab, setActiveTab] = useState("overview");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterCategory, setFilterCategory] = useState("");
//   const [editingItem, setEditingItem] = useState(null);
//   const [image, setImage] = useState(null); // my image
//   const [imageresponse, setImageresponse] = useState(""); // my image response
//   const [imageresponseLoading, setImageresponseLoading] = useState(false);
//   const [category, setCategory] = useState(""); // my category

//   // Variant management functions
//   const handleVariantChange = (index, field, value) => {
//     const newVariants = [...newItem.variants];
//     newVariants[index][field] = value;
//     setNewItem({ ...newItem, variants: newVariants });
//   };

//   const addVariant = () => {
//     setNewItem({
//       ...newItem,
//       variants: [...newItem.variants, { name: "", price: "" }]
//     });
//   };

//   const removeVariant = (index:number) => {
//     setNewItem({
//       ...newItem,
//       variants: newItem.variants.filter((_, i) => i !== index)
//     });
//   };

//   // Addon management functions
//   const handleAddonChange = (index, field, value) => {
//     const newAddons = [...newItem.addons];
//     newAddons[index][field] = value;
//     setNewItem({ ...newItem, addons: newAddons });
//   };

//   const addAddon = () => {
//     setNewItem({
//       ...newItem,
//       addons: [...newItem.addons, { name: "", price: "" }]
//     });
//   };

//   const removeAddon = (index) => {
//     setNewItem({
//       ...newItem,
//       addons: newItem.addons.filter((_, i) => i !== index)
//     });
//   };

//   // Form validation
//   const validateForm = () => {
//     const newErrors = {};
//     if (!newItem.name.trim()) newErrors.name = "Item name is required";
//     if (!newItem.price && !newItem.basePrice && newItem.variants.length === 0) {
//       newErrors.pricing = "Either base price or variants are required";
//     }
//     if (!newItem.category) newErrors.category = "Category is required";
//     if (!newItem.description.trim()) newErrors.description = "Description is required";
    
//     // Validate variants
//     newItem.variants.forEach((variant, index) => {
//       if (!variant.name.trim()) {
//         newErrors[`variant_name_${index}`] = "Variant name is required";
//       }
//       if (!variant.price || variant.price <= 0) {
//         newErrors[`variant_price_${index}`] = "Valid variant price is required";
//       }
//     });

//     // Validate addons
//     newItem.addons.forEach((addon, index) => {
//       if (!addon.name.trim()) {
//         newErrors[`addon_name_${index}`] = "Addon name is required";
//       }
//       if (!addon.price || addon.price <= 0) {
//         newErrors[`addon_price_${index}`] = "Valid addon price is required";
//       }
//     });

//     return newErrors;
//   };

//   // Handle category addition
//   const handleAddCategory = async (e: React.FormEvent<HTMLInputElement>) => {
//     e.preventDefault();

//     const response = await addCategory({
//       name: category,
//       hotelId: restaurentId,
//     });
//     console.log(response);
//     if (response) {
//       setCategory("");
//       const updated = await getAllCategories(restaurentId);
//       dispatch(addNewCategory(updated));
//     }
//     alert(response.message);
//   };

//   const handleAddItem = async () => {
//     try {
//       const data = {
//         hotelId: restaurentId,
//         itemName: newItem.name,
//         category: newItem.category,
//         featured: newItem.featured,
//         description: newItem.description,
//         price: newItem.price || newItem.basePrice,
//         variants: newItem.variants,
//         addons: newItem.addons
//       };

//       const categoryObject = categoryList.find(
//         (item) => item.name == newItem.category || item._id == newItem.category
//       );

//       console.log("category List:", categoryList);
//       console.log("categoryObject:", categoryObject);

//       const response = await createMenu({
//         ...data,
//         category: categoryObject?._id,
//         images: imageresponse,
//       });
//       if (response) {
//         console.log(response);
//         alert(response.message);
//         window.location.reload();
//       }
//     } catch (error) {
//       console.log("found some error ");
//       console.log(error);
//     }
//   };

//   //upload to cloudinary

  
//   const uploadToCloudinary = async (file:unknown) => {
//     try {
//       console.log("image uploading");
//       const imageFormData = new FormData();

//       imageFormData.append("file", file);
//       imageFormData.append("upload_preset", "Menu_images");
//       setImageresponseLoading(true);

//       const response = await axios.post(
//         "https://api.cloudinary.com/v1_1/dsheqlajm/image/upload",
//         imageFormData
//       );

//       if (response.data.secure_url) {
//         setImageresponseLoading(false);
//       } else {
//         alert("Something went wrong! unable to add image");
//       }

//       return response.data.secure_url;
//     } catch (error) {
//       console.log("uploading error");
//       console.log(error);
//     }
//   };

//   // Handle image upload
//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         setErrors({ ...errors, image: "Image size must be less than 5MB" });
//         return;
//       }

//       setImage(file);
//       const previewUrl = URL.createObjectURL(file);
//       setPreviewImage(previewUrl);

//       const imageResponse = await uploadToCloudinary(file);

//       if (imageResponse) {
//         console.log("image response:", imageResponse);
//         setImageresponse(imageResponse);
//       }

//       setErrors({ ...errors, image: "" });
//     }
//   };

//   // Handle category deletion
//   const handleDeleteCategory = async (categoryId: string) => {
//     const category = categoryList.find((item) => item._id == categoryId);

//     console.log("CategoryList:", categoryList);
//     const result = await Swal.fire({
//       title: "Delete Category?",
//       html: `Are you sure you want to Delete <strong style="color: #cb202d">${category?.name}</strong>?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#00b074",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Delete",
//       cancelButtonText: "Cancel",
//       reverseButtons: true,
//     });

//     if (result.isConfirmed) {
//       const response = await deleteCategory(categoryId);

//       if (response) {
//         console.log("Response from deletion:", response);
//         alert(response.message);

//         const updatedCategories = await getAllCategories(restaurentId);
//         dispatch(addNewCategory(updatedCategories))
//         const updatedMenu = await getMenu(restaurentId)
//         dispatch(addNewMenu(updatedMenu));
//       }
//     }
//   };

//   // Handle menu item deletion
//   const handleDeleteItem = (id: string) => {
//     console.log("Delete item worked:", id);
//   };

//   // Toggle featured status
//   const toggleFeatured = (itemId: string) => {
//     console.log("Toggle featured for item:", itemId);
//     // Add your toggle featured logic here
//   };

//   // Utility functions
//   const resetForm = () => {
//     setNewItem({
//       name: "",
//       description: "",
//       price: "",
//       basePrice: "",
//       category: "",
//       image: null,
//       featured: false,
//       variants: [],
//       addons: []
//     });
//     setPreviewImage("");
//     setErrors({});
//     setEditingItem(null);
//     setImageresponse("");
//     setImage(null);
//   };

//   // const showSuccessMessage = (message: string) => {
//   //   setSuccessMessage(message);
//   //   setTimeout(() => setSuccessMessage(""), 4000);
//   // };

//   // Filter menu items
//   const filteredItems = menuItems.filter((item) => {
//     const matchesSearch =
//       item.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.description?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = !filterCategory || item.category === filterCategory;

//     console.log("MatchSearch:", matchesSearch);
//     console.log("MatchesCategory:", matchesCategory);
//     return matchesSearch && matchesCategory;
//   });

//   // category change handling
//   const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCategory(e.target.value);
//   };

//   // const getCategoryItem = (categoryId: string) => {
//   //   const category = categories.find((item) => item._id == categoryId);
//   //   return category ? category.name : "Uncategorized";
//   // };

//   const getCategoryName = (categoryId: string) => {
//     const category = categories.find((item) => item._id === categoryId);
//     return category ? category.name : "Uncategorized";
//   };

//   // Clean up preview image URL
//   useEffect(() => {
//     return () => {
//       if (previewImage) URL.revokeObjectURL(previewImage);
//     };
//   }, [previewImage]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       <div className="container mx-auto p-6 max-w-7xl">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900 mb-2">
//                 Menu Management
//               </h1>
//               <p className="text-gray-600 text-lg">
//                 Manage your restaurant's menu items with variants and addons
//               </p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="bg-white rounded-xl shadow-lg p-4 flex items-center space-x-3">
//                 <ChefHat className="text-red-600" size={24} />
//                 <div>
//                   <p className="text-sm text-gray-500">Total Items</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {menuItems.length}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Success Message */}
//           {successMessage && (
//             <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 rounded-xl shadow-sm animate-pulse">
//               <div className="flex items-center space-x-2">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <span className="font-medium">{successMessage}</span>
//               </div>
//             </div>
//           )}

//           {/* Tab Navigation */}
//           <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
//             {[
//               { id: "overview", label: "Overview", icon: Eye },
//               { id: "add-item", label: "Add Item", icon: Plus },
//               { id: "categories", label: "Categories", icon: Tag },
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
//                   activeTab === tab.id
//                     ? "bg-white text-red-600 shadow-md transform scale-105"
//                     : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
//                 }`}
//               >
//                 <tab.icon size={18} />
//                 <span>{tab.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Overview Tab */}
//         {activeTab === "overview" && (
//           <div className="space-y-8">
//             {/* Statistics Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               {[
//                 {
//                   label: "Total Items",
//                   value: menuItems.length,
//                   icon: ChefHat,
//                   color: "red",
//                 },
//                 {
//                   label: "Categories",
//                   value: categories.length,
//                   icon: Tag,
//                   color: "blue",
//                 },
//                 {
//                   label: "Featured Items",
//                   value: menuItems.filter((item) => item.featuredItem).length,
//                   icon: Star,
//                   color: "yellow",
//                 },
//                 {
//                   label: "With Variants",
//                   value: menuItems.filter((item) => item.variants && item.variants.length > 0).length,
//                   icon: Settings,
//                   color: "green",
//                 },
//               ].map((stat, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
//                 >
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
//                       <p className="text-3xl font-bold text-gray-900">
//                         {stat.value}
//                       </p>
//                     </div>
//                     <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
//                       <stat.icon
//                         className={`text-${stat.color}-600`}
//                         size={24}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Search and Filter */}
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <div className="flex flex-col md:flex-row gap-4 mb-6">
//                 <div className="flex-1 relative">
//                   <Search
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={20}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Search menu items..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
//                   />
//                 </div>
//                 <div className="relative">
//                   <Filter
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={20}
//                   />
//                   <select
//                     value={filterCategory}
//                     onChange={(e) => setFilterCategory(e.target.value)}
//                     className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none bg-white"
//                   >
//                     <option value="">All Categories</option>
//                     {categories.map((category) => (
//                       <option key={category._id} value={category._id}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Menu Items Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredItems.map((item) => (
//                   <div
//                     key={item._id}
//                     className="group bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
//                   >
//                     <div className="relative">
//                       {item.images ? (
//                         <img
//                           src={item.images}
//                           alt={item.itemName}
//                           className="w-full h-48 object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
//                           <ChefHat className="text-gray-400" size={48} />
//                         </div>
//                       )}
//                       {item.featuredItem && (
//                         <div className="absolute top-3 left-3">
//                           <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
//                             <Star size={12} />
//                             <span>Featured</span>
//                           </div>
//                         </div>
//                       )}
//                       <button
//                         onClick={() => toggleFeatured(item._id)}
//                         className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
//                       >
//                         <Star
//                           className={
//                             item.featuredItem
//                               ? "text-yellow-500 fill-current"
//                               : "text-gray-400"
//                           }
//                           size={16}
//                         />
//                       </button>
//                       {/* Variants indicator */}
//                       {item.variants && item.variants.length > 0 && (
//                         <div className="absolute bottom-3 right-3">
//                           <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
//                             {item.variants.length} variants
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                     <div className="p-6">
//                       <div className="flex items-start justify-between mb-3">
//                         <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
//                           {item.itemName}
//                         </h3>
//                         <div className="text-right">
//                           {item.price ? (
//                             <span className="text-2xl font-bold text-red-600">
//                               ₹{item.price}
//                             </span>
//                           ) : (
//                             item.variants && item.variants.length > 0 && (
//                               <div className="text-sm text-gray-600">
//                                 <span className="text-lg font-bold text-red-600">
//                                   ₹{Math.min(...item.variants.map(v => v.price))}
//                                 </span>
//                                 <span> - </span>
//                                 <span className="text-lg font-bold text-red-600">
//                                   ₹{Math.max(...item.variants.map(v => v.price))}
//                                 </span>
//                               </div>
//                             )
//                           )}
//                         </div>
//                       </div>
//                       <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                         {item.description}
//                       </p>
                      
//                       {/* Variants preview */}
//                       {item.variants && item.variants.length > 0 && (
//                         <div className="mb-3">
//                           <p className="text-xs text-gray-500 mb-1">Variants:</p>
//                           <div className="flex flex-wrap gap-1">
//                             {item.variants.slice(0, 2).map((variant, index) => (
//                               <span
//                                 key={index}
//                                 className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
//                               >
//                                 {variant.name} - ₹{variant.price}
//                               </span>
//                             ))}
//                             {item.variants.length > 2 && (
//                               <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
//                                 +{item.variants.length - 2} more
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       )}

//                       {/* Addons preview */}
//                       {item.addons && item.addons.length > 0 && (
//                         <div className="mb-3">
//                           <p className="text-xs text-gray-500 mb-1">Addons available:</p>
//                           <div className="flex flex-wrap gap-1">
//                             {item.addons.slice(0, 2).map((addon, index) => (
//                               <span
//                                 key={index}
//                                 className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
//                               >
//                                 {addon.name} +₹{addon.price}
//                               </span>
//                             ))}
//                             {item.addons.length > 2 && (
//                               <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
//                                 +{item.addons.length - 2} more
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       )}

//                       <div className="flex items-center justify-between">
//                         <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
//                           {getCategoryName(item.category)}
//                         </span>
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() => setEditingItem(item)}
//                             className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
//                           >
//                             <Edit3 size={16} />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteItem(item._id)}
//                             className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
//                           >
//                             <Trash2 size={16} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Add Item Tab */}
//         {activeTab === "add-item" && (
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-8">
//               Add New Menu Item
//             </h2>
//             <div className="space-y-8">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Item Name
//                     </label>
//                     <input
//                       type="text"
//                       value={newItem.name}
//                       onChange={(e) =>
//                         setNewItem({ ...newItem, name: e.target.value })
//                       }
//                       placeholder="e.g., Grilled Salmon"
//                       className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
//                     />
//                     {errors.name && (
//                       <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
//                         <AlertCircle size={16} /> {errors.name}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Description
//                     </label>
//                     <textarea
//                       value={newItem.description}
//                       onChange={(e) =>
//                         setNewItem({ ...newItem, description: e.target.value })
//                       }
//                       placeholder="Describe your dish..."
//                       className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
//                       rows="4"
//                     />
//                     {errors.description && (
//                       <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
//                         <AlertCircle size={16} /> {errors.description}
//                       </p>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Base Price ₹ <span className="text-gray-500 text-xs">(Optional if using variants)</span>
//                       </label>
//                       <input
//                         type="text"
//                         value={newItem.price || newItem.basePrice}
//                         onChange={(e) =>
//                           setNewItem({ ...newItem, price: e.target.value, basePrice: e.target.value })
//                         }
//                         placeholder="0.00"
//                         className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
//                         step="0.01"
//                         min="0"
//                       />
//                       {errors.pricing && (
//                         <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
//                           <AlertCircle size={16} /> {errors.pricing}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Category
//                       </label>
//                       <select
//                         value={newItem.category}
//                         onChange={(e) =>
//                           setNewItem({ ...newItem, category: e.target.value })
//                         }
//                         className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
//                       >
//                         <option value="">Select Category</option>
//                         {categories.map((category) => (
//                           <option key={category._id} value={category.name}>
//                             {category.name}
//                           </option>
//                         ))}
//                       </select>
//                       {errors.category && (
//                         <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
//                           <AlertCircle size={16} /> {errors.category}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Variants Section */}
//                   <div className="border-t pt-6">
//                     <h3 className="text-lg font-semibold mb-4 text-gray-900">Variants</h3>
//                     {newItem.variants.map((variant, index) => (
//                       <div
//                         key={index}
//                         className="flex gap-3 mb-3 items-start"
//                       >
//                         <div className="flex-1">
//                           <input
//                             placeholder="Variant Name (e.g. Half Portion)"
//                             value={variant.name}
//                             onChange={(e) => handleVariantChange(index, "name", e.target.value)}
//                             className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                           />
//                           {errors[`variant_name_${index}`] && (
//                             <p className="mt-1 text-sm text-red-600">{errors[`variant_name_${index}`]}</p>
//                           )}
//                         </div>
//                         <div className="w-32">
//                           <input
//                             type="number"
//                             placeholder="Price"
//                             value={variant.price}
//                             onChange={(e) => handleVariantChange(index, "price", e.target.value)}
//                             className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                           />
//                           {errors[`variant_price_${index}`] && (
//                             <p className="mt-1 text-sm text-red-600">{errors[`variant_price_${index}`]}</p>
//                           )}
//                         </div>
//                         <button
//                           onClick={() => removeVariant(index)}
//                           className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
//                         >
//                           <X size={20} />
//                         </button>
//                       </div>
//                     ))}
//                     <button
//                       onClick={addVariant}
//                       className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
//                     >
//                       <Plus size={16} />
//                       Add Variant
//                     </button>
//                   </div>

//                   {/* Addons Section */}
//                   <div className="border-t pt-6">
//                     <h3 className="text-lg font-semibold mb-4 text-gray-900">Addons</h3>
//                     {newItem.addons.map((addon, index) => (
//                       <div
//                         key={index}
//                         className="flex gap-3 mb-3 items-start"
//                       >
//                         <div className="flex-1">
//                           <input
//                             placeholder="Addon Name (e.g. Extra Cheese)"
//                             value={addon.name}
//                             onChange={(e) => handleAddonChange(index, "name", e.target.value)}
//                             className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                           />
//                           {errors[`addon_name_${index}`] && (
//                             <p className="mt-1 text-sm text-red-600">{errors[`addon_name_${index}`]}</p>
//                           )}
//                         </div>
//                         <div className="w-32">
//                           <input
//                             type="number"
//                             placeholder="Price"
//                             value={addon.price}
//                             onChange={(e) => handleAddonChange(index, "price", e.target.value)}
//                             className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                           />
//                           {errors[`addon_price_${index}`] && (
//                             <p className="mt-1 text-sm text-red-600">{errors[`addon_price_${index}`]}</p>
//                           )}
//                         </div>
//                         <button
//                           onClick={() => removeAddon(index)}
//                           className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
//                         >
//                           <X size={20} />
//                         </button>
//                       </div>
//                     ))}
//                     <button
//                       onClick={addAddon}
//                       className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center gap-2"
//                     >
//                       <Plus size={16} />
//                       Add Addon
//                     </button>
//                   </div>

//                   <div className="flex items-center space-x-3">
//                     <input
//                       type="checkbox"
//                       id="featured"
//                       checked={newItem.featured}
//                       onChange={(e) =>
//                         setNewItem({ ...newItem, featured: e.target.checked })
//                       }
//                       className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
//                     />
//                     <label
//                       htmlFor="featured"
//                       className="text-sm font-semibold text-gray-700"
//                     >
//                       Mark as Featured Item
//                     </label>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Upload Image
//                   </label>
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 group">
//                       {previewImage ? (
//                         <div className="relative w-full h-full">
//                           <img
//                             src={previewImage}
//                             alt="Preview"
//                             className="w-full h-full object-cover rounded-xl"
//                           />
//                           <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-xl flex items-center justify-center">
//                             <Upload
//                               className="text-white opacity-0 group-hover:opacity-100 transition-all duration-200"
//                               size={32}
//                             />
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                           <Upload className="w-16 h-16 mb-4 text-gray-400 group-hover:text-red-500 transition-colors" />
//                           <p className="mb-2 text-lg text-gray-600 font-semibold group-hover:text-gray-900">
//                             Click to upload image
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             PNG, JPG up to 5MB
//                           </p>
//                         </div>
//                       )}
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                   {errors.image && (
//                     <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
//                       <AlertCircle size={16} /> {errors.image}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between pt-6 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
//                 >
//                   Reset Form
//                 </button>
//                 <button
//                   onClick={handleAddItem}
//                   disabled={imageresponseLoading}
//                   className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
//                 >
//                   <Plus size={20} />
//                   {imageresponseLoading ? "Uploading image" : "Add Menu Item"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Categories Tab */}
//         {activeTab === "categories" && (
//           <div className="space-y-8">
//             {/* Add Category Form */}
//             <div className="bg-white rounded-xl shadow-lg p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Add New Category
//               </h2>
//               <form onSubmit={handleAddCategory}>
//                 <div className="flex gap-4">
//                   <div className="flex-1">
//                     <input
//                       type="text"
//                       value={category}
//                       onChange={handleCategoryChange}
//                       placeholder="Enter category name"
//                       className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center gap-2 shadow-lg"
//                   >
//                     <Plus size={20} />
//                     Add Category
//                   </button>
//                 </div>
//               </form>
//             </div>

//             {/* Categories List */}
//             <div className="bg-white rounded-xl shadow-lg p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Categories
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {categories.map((category) => (
//                   <div
//                     key={category._id}
//                     className="flex justify-between items-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 group"
//                   >
//                     <div className="flex items-center space-x-3">
//                       <Tag className="text-red-600" size={20} />
//                       <span className="text-gray-900 font-semibold">
//                         {category.name}
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => handleDeleteCategory(category._id)}
//                       className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 hover:bg-red-50 rounded-lg"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CreateMenu;








import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Upload,
  AlertCircle,
  Search,
  Filter,
  Edit3,
  Eye,
  Star,
  ChefHat,
  Tag,
  X,
  Settings
} from "lucide-react";
import {
  addCategory,
  deleteCategory,
} from "../../../services/restaurentServices/registration";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../redux/store";
import { getAllCategories } from "../../../services/restaurentServices/registration";
import { addNewCategory } from "../../../redux/Slice/restaurentSlice";
import { createMenu } from "../../../services/restaurentServices/registration";
import { getMenu } from "../../../services/restaurentServices/registration";
import { addNewMenu } from "../../../redux/Slice/restaurentSlice";
import axios from "axios";
import Swal from "sweetalert2";

interface Variant {
  name: string;
  price: string;
}

interface Addon {
  name: string;
  price: string;
}

interface NewItem {
  name: string;
  description: string;
  price: string;
  basePrice: string;
  category: string;
  image: File | null;
  featured: boolean;
  variants: Variant[];
  addons: Addon[];
}

interface Category {
  _id: string;
  name: string;
}

interface MenuItem {
  _id: string;
  itemName: string;
  description: string;
  price?: number;
  category: string;
  featuredItem: boolean;
  images?: string;
  variants?: { name: string; price: number }[];
  addons?: { name: string; price: number }[];
}

function CreateMenu() {
  const dispatch = useDispatch();
  const restaurentId = useSelector(
    (state: RootState) => state.restaurentSlice.hotelDetails.id
  );

  const categories: Category[] = useSelector(
    (state: RootState) => state.restaurentSlice.categories || []
  );
  const menuItems: MenuItem[] = useSelector(
    (state: RootState) => state.restaurentSlice.menu
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories(restaurentId);
        if (response) {
          dispatch(addNewCategory(response));
        } else {
          console.log("No categories returned");
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    const fetchMenu = async () => {
      try {
        const response = await getMenu(restaurentId);

        if (response) {
          console.log("Menu:", response);
          dispatch(addNewMenu(response));
        }
      } catch (error) {
        console.log(error);
      }
    };

    Promise.all([fetchCategories(), fetchMenu()]);
  }, [dispatch, restaurentId]);
  
  const [newItem, setNewItem] = useState<NewItem>({
    name: "",
    description: "",
    price: "",
    basePrice: "",
    category: "",
    image: null,
    featured: false,
    variants: [],
    addons: []
  });

  const [previewImage, setPreviewImage] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imageresponse, setImageresponse] = useState<string>("");
  const [imageresponseLoading, setImageresponseLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");

  // Variant management functions
  const handleVariantChange = (index: number, field: 'name' | 'price', value: string) => {
    const newVariants = [...newItem.variants];
    newVariants[index][field] = value;
    setNewItem({ ...newItem, variants: newVariants });
  };

  const addVariant = () => {
    setNewItem({
      ...newItem,
      variants: [...newItem.variants, { name: "", price: "" }]
    });
  };

  const removeVariant = (index: number) => {
    setNewItem({
      ...newItem,
      variants: newItem.variants.filter((_, i) => i !== index)
    });
  };

  // Addon management functions
  const handleAddonChange = (index: number, field: 'name' | 'price', value: string) => {
    const newAddons = [...newItem.addons];
    newAddons[index][field] = value;
    setNewItem({ ...newItem, addons: newAddons });
  };

  const addAddon = () => {
    setNewItem({
      ...newItem,
      addons: [...newItem.addons, { name: "", price: "" }]
    });
  };

  const removeAddon = (index: number) => {
    setNewItem({
      ...newItem,
      addons: newItem.addons.filter((_, i) => i !== index)
    });
  };

  // Form validation
  const validateForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    if (!newItem.name.trim()) newErrors.name = "Item name is required";
    if (!newItem.price && !newItem.basePrice && newItem.variants.length === 0) {
      newErrors.pricing = "Either base price or variants are required";
    }
    if (!newItem.category) newErrors.category = "Category is required";
    if (!newItem.description.trim()) newErrors.description = "Description is required";
    
    // Validate variants
    newItem.variants.forEach((variant, index) => {
      if (!variant.name.trim()) {
        newErrors[`variant_name_${index}`] = "Variant name is required";
      }
      if (!variant.price || parseFloat(variant.price) <= 0) {
        newErrors[`variant_price_${index}`] = "Valid variant price is required";
      }
    });

    // Validate addons
    newItem.addons.forEach((addon, index) => {
      if (!addon.name.trim()) {
        newErrors[`addon_name_${index}`] = "Addon name is required";
      }
      if (!addon.price || parseFloat(addon.price) <= 0) {
        newErrors[`addon_price_${index}`] = "Valid addon price is required";
      }
    });

    return newErrors;
  };

  // Handle category addition
  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await addCategory({
      name: category,
      hotelId: restaurentId,
    });
    console.log(response);
    if (response) {
      setCategory("");
      const updated = await getAllCategories(restaurentId);
      dispatch(addNewCategory(updated));
    }
    alert(response.message);
  };

  const handleAddItem = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const data = {
        hotelId: restaurentId,
        itemName: newItem.name,
        category: newItem.category,
        featured: newItem.featured,
        description: newItem.description,
        price: parseFloat(newItem.price) || parseFloat(newItem.basePrice) || 0,
        variants: newItem.variants.map(v => ({ name: v.name, price: parseFloat(v.price) || 0 })),
        addons: newItem.addons.map(a => ({ name: a.name, price: parseFloat(a.price) || 0 }))
      };

      const response = await createMenu({
        ...data,
        images: imageresponse,
      });
      if (response) {
        console.log(response);
        alert(response.message);
        window.location.reload();
      }
    } catch (error) {
      console.log("found some error ");
      console.log(error);
    }
  };

  //upload to cloudinary
  
  const uploadToCloudinary = async (file: File) => {
    try {
      console.log("image uploading");
      const imageFormData = new FormData();

      imageFormData.append("file", file);
      imageFormData.append("upload_preset", "Menu_images");
      setImageresponseLoading(true);

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dsheqlajm/image/upload",
        imageFormData
      );

      if (response.data.secure_url) {
        setImageresponseLoading(false);
      } else {
        alert("Something went wrong! unable to add image");
      }

      return response.data.secure_url;
    } catch (error) {
      console.log("uploading error");
      console.log(error);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: "Image size must be less than 5MB" });
        return;
      }

      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);

      const imageResponse = await uploadToCloudinary(file);

      if (imageResponse) {
        console.log("image response:", imageResponse);
        setImageresponse(imageResponse);
      }

      setErrors({ ...errors, image: "" });
    }
  };

  // Handle category deletion
  const handleDeleteCategory = async (categoryId: string) => {
    const categoryItem = categories.find((item) => item._id === categoryId);

    const result = await Swal.fire({
      title: "Delete Category?",
      html: `Are you sure you want to Delete <strong style="color: #cb202d">${categoryItem?.name}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00b074",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      const response = await deleteCategory(categoryId);

      if (response) {
        console.log("Response from deletion:", response);
        alert(response.message);

        const updatedCategories = await getAllCategories(restaurentId);
        dispatch(addNewCategory(updatedCategories))
        const updatedMenu = await getMenu(restaurentId)
        dispatch(addNewMenu(updatedMenu));
      }
    }
  };

  // Handle menu item deletion
  const handleDeleteItem = (id: string) => {
    console.log("Delete item worked:", id);
  };

  // Toggle featured status
  const toggleFeatured = (itemId: string) => {
    console.log("Toggle featured for item:", itemId);
    // Add your toggle featured logic here
  };

  // Utility functions
  const resetForm = () => {
    setNewItem({
      name: "",
      description: "",
      price: "",
      basePrice: "",
      category: "",
      image: null,
      featured: false,
      variants: [],
      addons: []
    });
    setPreviewImage("");
    setErrors({});
    setEditingItem(null);
    setImageresponse("");
    setImage(null);
  };

  // Filter menu items
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || item.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // category change handling
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const getCategoryName = (categoryId: string): string => {
    const categoryItem = categories.find((item) => item._id === categoryId);
    return categoryItem ? categoryItem.name : "Uncategorized";
  };

  // Clean up preview image URL
  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Menu Management
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your restaurant's menu items with variants and addons
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-xl shadow-lg p-4 flex items-center space-x-3">
                <ChefHat className="text-red-600" size={24} />
                <div>
                  <p className="text-sm text-gray-500">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {menuItems.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 rounded-xl shadow-sm animate-pulse">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">{successMessage}</span>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
            {[
              { id: "overview", label: "Overview", icon: Eye },
              { id: "add-item", label: "Add Item", icon: Plus },
              { id: "categories", label: "Categories", icon: Tag },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white text-red-600 shadow-md transform scale-105"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  label: "Total Items",
                  value: menuItems.length,
                  icon: ChefHat,
                  color: "red",
                },
                {
                  label: "Categories",
                  value: categories.length,
                  icon: Tag,
                  color: "blue",
                },
                {
                  label: "Featured Items",
                  value: menuItems.filter((item) => item.featuredItem).length,
                  icon: Star,
                  color: "yellow",
                },
                {
                  label: "With Variants",
                  value: menuItems.filter((item) => item.variants && item.variants.length > 0).length,
                  icon: Settings,
                  color: "green",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                      <stat.icon
                        className={`text-${stat.color}-600`}
                        size={24}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div className="relative">
                  <Filter
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none bg-white"
                  >
                    <option value="">All Categories</option>
                    {categories.map((categoryItem) => (
                      <option key={categoryItem._id} value={categoryItem._id}>
                        {categoryItem.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Menu Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item._id}
                    className="group bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                  >
                    <div className="relative">
                      {item.images ? (
                        <img
                          src={item.images}
                          alt={item.itemName}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <ChefHat className="text-gray-400" size={48} />
                        </div>
                      )}
                      {item.featuredItem && (
                        <div className="absolute top-3 left-3">
                          <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                            <Star size={12} />
                            <span>Featured</span>
                          </div>
                        </div>
                      )}
                      <button
                        onClick={() => toggleFeatured(item._id)}
                        className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
                      >
                        <Star
                          className={
                            item.featuredItem
                              ? "text-yellow-500 fill-current"
                              : "text-gray-400"
                          }
                          size={16}
                        />
                      </button>
                      {/* Variants indicator */}
                      {item.variants && item.variants.length > 0 && (
                        <div className="absolute bottom-3 right-3">
                          <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            {item.variants.length} variants
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                          {item.itemName}
                        </h3>
                        <div className="text-right">
                          {item.price ? (
                            <span className="text-2xl font-bold text-red-600">
                              ₹{item.price}
                            </span>
                          ) : (
                            item.variants && item.variants.length > 0 && (
                              <div className="text-sm text-gray-600">
                                <span className="text-lg font-bold text-red-600">
                                  ₹{Math.min(...item.variants.map(v => v.price))}
                                </span>
                                <span> - </span>
                                <span className="text-lg font-bold text-red-600">
                                  ₹{Math.max(...item.variants.map(v => v.price))}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      
                      {/* Variants preview */}
                      {item.variants && item.variants.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-1">Variants:</p>
                          <div className="flex flex-wrap gap-1">
                            {item.variants.slice(0, 2).map((variant, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                              >
                                {variant.name} - ₹{variant.price}
                              </span>
                            ))}
                            {item.variants.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                +{item.variants.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Addons preview */}
                      {item.addons && item.addons.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-1">Addons available:</p>
                          <div className="flex flex-wrap gap-1">
                            {item.addons.slice(0, 2).map((addon, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
                              >
                                {addon.name} +₹{addon.price}
                              </span>
                            ))}
                            {item.addons.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                +{item.addons.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {getCategoryName(item.category)}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingItem(item)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item._id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add Item Tab */}
        {activeTab === "add-item" && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Add New Menu Item
            </h2>
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Item Name
                    </label>
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={(e) =>
                        setNewItem({ ...newItem, name: e.target.value })
                      }
                      placeholder="e.g., Grilled Salmon"
                      className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={16} /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newItem.description}
                      onChange={(e) =>
                        setNewItem({ ...newItem, description: e.target.value })
                      }
                      placeholder="Describe your dish..."
                      className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      rows={4}
                    />
                    {errors.description && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={16} /> {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Base Price ₹ <span className="text-gray-500 text-xs">(Optional if using variants)</span>
                      </label>
                      <input
                        type="number"
                        value={newItem.price || newItem.basePrice}
                        onChange={(e) =>
                          setNewItem({ ...newItem, price: e.target.value, basePrice: e.target.value })
                        }
                        placeholder="0.00"
                        className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                        step="0.01"
                        min="0"
                      />
                      {errors.pricing && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle size={16} /> {errors.pricing}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={newItem.category}
                        onChange={(e) =>
                          setNewItem({ ...newItem, category: e.target.value })
                        }
                        className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      >
                        <option value="">Select Category</option>
                        {categories.map((categoryItem) => (
                          <option key={categoryItem._id} value={categoryItem._id}>
                            {categoryItem.name}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle size={16} /> {errors.category}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Variants Section */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Variants</h3>
                    {newItem.variants.map((variant, index) => (
                      <div
                        key={index}
                        className="flex gap-3 mb-3 items-start"
                      >
                        <div className="flex-1">
                          <input
                            placeholder="Variant Name (e.g. Half Portion)"
                            value={variant.name}
                            onChange={(e) => handleVariantChange(index, "name", e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          {errors[`variant_name_${index}`] && (
                            <p className="mt-1 text-sm text-red-600">{errors[`variant_name_${index}`]}</p>
                          )}
                        </div>
                        <div className="w-32">
                          <input
                            type="number"
                            placeholder="Price"
                            value={variant.price}
                            onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            step="0.01"
                            min="0"
                          />
                          {errors[`variant_price_${index}`] && (
                            <p className="mt-1 text-sm text-red-600">{errors[`variant_price_${index}`]}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeVariant(index)}
                          className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addVariant}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Add Variant
                    </button>
                  </div>

                  {/* Addons Section */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Addons</h3>
                    {newItem.addons.map((addon, index) => (
                      <div
                        key={index}
                        className="flex gap-3 mb-3 items-start"
                      >
                        <div className="flex-1">
                          <input
                            placeholder="Addon Name (e.g. Extra Cheese)"
                            value={addon.name}
                            onChange={(e) => handleAddonChange(index, "name", e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          {errors[`addon_name_${index}`] && (
                            <p className="mt-1 text-sm text-red-600">{errors[`addon_name_${index}`]}</p>
                          )}
                        </div>
                        <div className="w-32">
                          <input
                            type="number"
                            placeholder="Price"
                            value={addon.price}
                            onChange={(e) => handleAddonChange(index, "price", e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            step="0.01"
                            min="0"
                          />
                          {errors[`addon_price_${index}`] && (
                            <p className="mt-1 text-sm text-red-600">{errors[`addon_price_${index}`]}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeAddon(index)}
                          className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addAddon}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Add Addon
                    </button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={newItem.featured}
                      onChange={(e) =>
                        setNewItem({ ...newItem, featured: e.target.checked })
                      }
                      className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <label
                      htmlFor="featured"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Mark as Featured Item
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Image
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 group">
                      {previewImage ? (
                        <div className="relative w-full h-full">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-xl"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-xl flex items-center justify-center">
                            <Upload
                              className="text-white opacity-0 group-hover:opacity-100 transition-all duration-200"
                              size={32}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-16 h-16 mb-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                          <p className="mb-2 text-lg text-gray-600 font-semibold group-hover:text-gray-900">
                            Click to upload image
                          </p>
                          <p className="text-sm text-gray-500">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {errors.image && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={16} /> {errors.image}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  Reset Form
                </button>
                <button
                  onClick={handleAddItem}
                  disabled={imageresponseLoading}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  <Plus size={20} />
                  {imageresponseLoading ? "Uploading image" : "Add Menu Item"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div className="space-y-8">
            {/* Add Category Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Add New Category
              </h2>
              <form onSubmit={handleAddCategory}>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={category}
                      onChange={handleCategoryChange}
                      placeholder="Enter category name"
                      className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center gap-2 shadow-lg"
                  >
                    <Plus size={20} />
                    Add Category
                  </button>
                </div>
              </form>
            </div>

            {/* Categories List */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Categories
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((categoryItem) => (
                  <div
                    key={categoryItem._id}
                    className="flex justify-between items-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <Tag className="text-red-600" size={20} />
                      <span className="text-gray-900 font-semibold">
                        {categoryItem.name}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteCategory(categoryItem._id)}
                      className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateMenu;