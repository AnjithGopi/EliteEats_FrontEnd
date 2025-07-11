import { userApiRequest } from "../../utils/Api_helper/userApihelper";

type formData = {
  email?: string;
  password?:string;
};

export const handleLogin = async (formData: formData) => {
  return userApiRequest("login", "POST", formData);
};

export const getAllHotels=async()=>{

    return userApiRequest(`restaurents`,"GET")
}


export const userLogout=async()=>{

  return userApiRequest("logout","GET")
}

export const getRestaurentDatas=async(id:string)=>{

  return userApiRequest(`restaurent/${id}`,"GET")
}


export const createCart=async(id:string,userId:string)=>{

  return userApiRequest(`addto_cart?userId=${userId}&&productId=${id}`,"POST")
}

export const getCart=async(id:string)=>{

  return userApiRequest(`view_cart/${id}`,"GET")
}