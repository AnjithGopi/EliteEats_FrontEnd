

import API from "../axiosInstance";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const apiRequest = async (url: string, method: Method, body?:any) => {
  try {
    const config:any = {
      method,
      url,
      
    };

     if(body){
        config.data=body
      }

    const response = await API(config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(`error occured at ${method}${url}:${error}`);
  }
};


