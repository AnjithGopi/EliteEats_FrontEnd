import { userApiRequest } from "../../utils/Api_helper/userApihelper";

type formData = {
  email?: string;
  password?:string;
};

export const handleLogin = async (formData: formData) => {
  return userApiRequest("login", "POST", formData);
};

export const getAllHotels=async()=>{

    return userApiRequest("restaurents","GET")
}


export const userLogout=async()=>{

  return userApiRequest("logout","GET")
}