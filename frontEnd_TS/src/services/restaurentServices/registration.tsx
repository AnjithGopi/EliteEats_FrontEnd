import { apiRequest } from "../../utils/Api_helper/restaurentApihelper";

export const registration = async (formData: unknown) => {
  return await apiRequest("/signup", "POST", formData);
};

export const verifyOtp = async (formData: unknown) => {
  return await apiRequest("/verify_otp", "POST", formData);
};

export const verifyLogin = async (formData: unknown) => {
  return await apiRequest("login", "POST", formData);
};

export const addCategory = async (formData: unknown) => {
  console.log("Form data:", formData);
  return await apiRequest("create_category", "POST", formData);
};

export const getAllCategories = async (id: string) => {
  return await apiRequest(`categories/${id}`, "GET");
};

export const restaurentLogout = async () => {
  return await apiRequest("logout", "GET");
};

export const createMenu = async (formData: unknown) => {
  return await apiRequest("add_items", "POST", formData);
};

export const getMenu = async (id: string) => {
  return await apiRequest(`menu/${id}`, "GET");
};

export const deleteCategory = async (id: string) => {
  return await apiRequest(`delete_category/${id}`, "GET");
};
