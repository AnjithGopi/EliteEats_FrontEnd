import { riderApiRequest } from "../../utils/Api_helper/riderApihelper";

type formData = {
  email?: string;
  password?: string;
};

export const registration = async (formData: unknown) => {
  return await riderApiRequest("/signup", "POST", formData);
};

export const verifyOtp = async (formData: unknown) => {
  return await riderApiRequest("verify_otp", "POST", formData);
};

export const riderLogin = async (formData: formData) => {
  return await riderApiRequest("login", "POST", formData);
};

export const verifyRiderProfile = async (formData: unknown) => {
  return await riderApiRequest("verify_profile", "POST", formData);
};

