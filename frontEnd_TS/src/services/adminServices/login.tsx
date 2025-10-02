import { admin_apirequest } from "../../utils/Api_helper/adminApihelper";

export const login = async (formData: unknown) => {
  return await admin_apirequest("login", "POST", formData);
};

export const getUsers = async () => {
  return await admin_apirequest("users", "GET");
};

export const getRiders = async () => {
  return await admin_apirequest("riders", "GET");
};

export const viewUserDetails = async (id: string) => {
  return await admin_apirequest(`view_userDetails/${id}`, "GET");
};

export const verifyUser = async (id: string) => {
  return await admin_apirequest(`verfiy_deliverypartner/${id}`, "GET");
};

export const logout = async () => {
  return await admin_apirequest("logout", "GET");
};

export const rejectrider = async (id: string, reason: string) => {
  console.log("Reason for rejection ::",reason)
  return await admin_apirequest(`reject_deliverypartner/${id}`, "POST", reason);
};
