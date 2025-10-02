import { userApiRequest } from "../../utils/Api_helper/userApihelper";

type Location = {
  latitude: number;
  longitude: number;
};
type formData = {
  email?: string;
  password?: string;
  location?: Location;
  userId?: string;
  itemId?: string;
  quantity?: number;
};

export const handleLogin = async (formData: formData) => {
  return userApiRequest("login", "POST", formData);
};

export const getAllHotels = async () => {
  return userApiRequest(`restaurents`, "GET");
};

export const userLogout = async () => {
  return userApiRequest("logout", "GET");
};

export const getRestaurentDatas = async (id: string) => {
  return userApiRequest(`restaurent/${id}`, "GET");
};

export const createCart = async (data: {
  productId: string;
  userId: string;
  hotelId: string;
  quantity: number;
  price: number;
  variant: any;
  addons: any;
}) => {
  console.log("data for adding to cart:>>>>>>>>>>>>>>", data);
  return userApiRequest(`addto_cart`, "POST", data);
};
export const getCart = async (id: string) => {
  return userApiRequest(`view_cart/${id}`, "GET");
};

export const fetchProductDetails = async (id: string) => {
  console.log("product Id in fetching data:", id);
  return userApiRequest(`item_details/${id}`, "GET");
};

export const createOrder = async (formData: unknown) => {
  return userApiRequest(`/instant_order`, "POST", formData);
};

export const updateUserAddress = async (formData: unknown) => {
  return userApiRequest(`update_useraddress`, "POST", formData);
};

export const fetchHotelsbylocation = async (id: string) => {
  return userApiRequest(`/restuarents_near_user/${id}`, "GET");
};

export const clearCart = async (id: string) => {
  return userApiRequest(`/clear_cart/${id}`, "GET");
};

export const incrementCartItem = async (formData: formData) => {
  return userApiRequest(`/incrementCartItems`, "PUT", formData);
};

export const decrementCartItem = async (formData: formData) => {
  return userApiRequest(`/decrementCartitems`, "PUT", formData);
};

export const deleteItemFromCart = async (formData: FormData) => {
  return userApiRequest("/delete_item", "PUT", formData);
};

export const fetchUserAddress = async (id: string) => {
  return userApiRequest(`/getAddress/${id}`, "GET");
};

export const placeOrder = async (data: unknown) => {
  return userApiRequest(`/place_order`, "POST", data);
};

export const getOrders = async (id: string) => {
  return userApiRequest(`/getOrders/${id}`, "GET");
};

export const changePasswordForUser = async (data: unknown) => {
  console.log("data for changing password:>>>", data);
  return userApiRequest(`/change_password`, "POST", data);
};
