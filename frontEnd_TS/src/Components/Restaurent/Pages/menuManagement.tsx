import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import Sidebar from "../sidebar";

import { addCategory } from "../../../services/restaurentServices/registration";

// Define interfaces for type safety
interface Category {
  name: string;
}

interface MenuItem {
  id: number;
  categoryId: number;
  name: string;
  price: number;
  description: string;
}

interface CategoryForm {
  name: string;
}

interface ItemForm {
  name: string;
  price: string;
  description: string;
  categoryId: string;
}

const MenuManagement: React.FC = () => {
  // State for categories and menu items
  const [categories, setCategories] = useState<Category[]>([]);

  const [categoryName, setCategoryName] = useState("");

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      categoryId: 1,
      name: "Spring Rolls",
      price: 8.99,
      description: "Crispy vegetable rolls",
    },
    {
      id: 2,
      categoryId: 1,
      name: "Wings",
      price: 10.99,
      description: "Spicy buffalo wings",
    },
    {
      id: 3,
      categoryId: 2,
      name: "Grilled Salmon",
      price: 22.99,
      description: "Fresh grilled salmon",
    },
  ]);

  // State for modals
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const [showItemModal, setShowItemModal] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Form states

  const [itemForm, setItemForm] = useState<ItemForm>({
    name: "",
    price: "",
    description: "",
    categoryId: "",
  });

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

 
  const handleAddEditCategory = async ()=> {
    if (editingCategory) {
      console.log("Editing category");
    } else {
      const response = await addCategory({
        name: categoryName,
      });

      console.log(response);
    }
    setShowCategoryModal(false);

    setEditingCategory(null);
  };

  const handleDeleteCategory = (id): void => {
    console.log("delete category handled");
  };

  // Handlers for menu items
  const handleAddEditItem = (): void => {
    if (editingItem) {
      setMenuItems(
        menuItems.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                ...itemForm,
                price: parseFloat(itemForm.price),
                categoryId: parseInt(itemForm.categoryId),
              }
            : item
        )
      );
    } else {
      setMenuItems([
        ...menuItems,
        {
          id: menuItems.length + 1,
          name: itemForm.name,
          price: parseFloat(itemForm.price),
          description: itemForm.description,
          categoryId: parseInt(itemForm.categoryId),
        },
      ]);
    }
    setShowItemModal(false);
    setItemForm({ name: "", price: "", description: "", categoryId: "" });
    setEditingItem(null);
  };

  const handleDeleteItem = (): void => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 tracking-tight">
            Menu Management Dashboard
          </h1>

          {/* Categories Section */}
          <div className="mb-12 bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Categories
              </h2>
              <button
                className="bg-gradient-to-r from-blue-500 to-blue-300 text-white px-5 py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-400 transition-all duration-300 flex items-center gap-2"
                onClick={() => setShowCategoryModal(true)}
              >
                <Plus size={20} /> Add Category
              </button>
            </div>

            <div className="grid gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex justify-between items-center p-4 bg-white rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200 shadow-sm"
                >
                  <span className="text-lg font-medium text-gray-900">
                    {category.name}
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        setEditingCategory(category);
                        setShowCategoryModal(true);
                      }}
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      onClick={handleDeleteCategory}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Items Section */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Menu Items
              </h2>
              <button
                className="bg-gradient-to-r from-blue-500 to-blue-300 text-white px-5 py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-400 transition-all duration-300 flex items-center gap-2"
                onClick={() => setShowItemModal(true)}
              >
                <Plus size={20} /> Add Menu Item
              </button>
            </div>

            <div className="grid gap-4">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 bg-white rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200 shadow-sm"
                >
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <p className="text-gray-700 font-medium">
                      ${item.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Category:{" "}
                      {categories.find((cat) => cat.id === item.categoryId)
                        ?.name || "Uncategorized"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        setEditingItem(item);
                        setItemForm({
                          name: item.name,
                          price: item.price.toString(),
                          description: item.description,
                          categoryId: item.categoryId.toString(),
                        });
                        setShowItemModal(true);
                      }}
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Modal */}
          {showCategoryModal && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl w-full max-w-md border border-gray-200 shadow-2xl">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {editingCategory ? "Edit Category" : "Add Category"}
                </h2>
                <input
                  type="text"
                  value={categoryName}
                  onChange={handleChange}
                  placeholder="Category Name"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300"
                    onClick={() => {
                      setShowCategoryModal(false);
                      setCategoryForm({ name: "" });
                      setEditingCategory(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-300 text-white rounded-lg hover:from-blue-600 hover:to-blue-400 transition-all duration-300"
                    onClick={handleAddEditCategory}
                    disabled={!categoryName}
                  >
                    {editingCategory ? "Update" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Menu Item Modal */}
          {showItemModal && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl w-full max-w-md border border-gray-200 shadow-2xl">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {editingItem ? "Edit Menu Item" : "Add Menu Item"}
                </h2>
                <input
                  type="text"
                  value={itemForm.name}
                  onChange={(e) =>
                    setItemForm({ ...itemForm, name: e.target.value })
                  }
                  placeholder="Item Name"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all mb-4"
                />
                <input
                  type="number"
                  value={itemForm.price}
                  onChange={(e) =>
                    setItemForm({ ...itemForm, price: e.target.value })
                  }
                  placeholder="Price"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all mb-4"
                  step="0.01"
                />
                <textarea
                  value={itemForm.description}
                  onChange={(e) =>
                    setItemForm({ ...itemForm, description: e.target.value })
                  }
                  placeholder="Description"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all mb-4-4"
                  rows={4}
                />
                <select
                  value={itemForm.categoryId}
                  onChange={(e) =>
                    setItemForm({ ...itemForm, categoryId: e.target.value })
                  }
                  className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all mb-4"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end gap-3">
                  <button
                    className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300"
                    onClick={() => {
                      setShowItemModal(false);
                      setItemForm({
                        name: "",
                        price: "",
                        description: "",
                        categoryId: "",
                      });
                      setEditingItem(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-300 text-white rounded-lg hover:from-blue-600 hover:to-blue-400 transition-all duration-300"
                    onClick={handleAddEditItem}
                    disabled={
                      !itemForm.name || !itemForm.price || !itemForm.categoryId
                    }
                  >
                    {editingItem ? "Update" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
