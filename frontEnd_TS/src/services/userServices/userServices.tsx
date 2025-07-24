import { userApiRequest } from "../../utils/Api_helper/userApihelper";

type formData = {
  email?: string;
  password?: string;
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

export const createCart = async (id: string, userId: string) => {
  return userApiRequest(`addto_cart?userId=${userId}&&productId=${id}`, "POST");
};

export const getCart = async (id: string) => {
  return userApiRequest(`view_cart/${id}`, "GET");
};

export const fetchProductDetails = async (id: string) => {
  console.log("product Id in fetching data:", id);
  return userApiRequest(`item_details/${id}`, "GET");
};

export const createOrder = async (formData: unknown) => {
  console.log("create order with data:", formData);

  return userApiRequest(`/instant_order`, "POST", formData);
};

export const updateUserAddress = async (formData: unknown) => {
  return userApiRequest(`update_useraddress`, "POST", formData);
};
