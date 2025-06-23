import ADMINAPI from "../adminAxiosInstance";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Config={
   url:string,
   method:Method
   data?:unknown
}

export const admin_apirequest = async (
  url: string,
  method: Method,
  body?: unknown
) => {
  try {
    console.log(url, method, body);

    const config:Config = {
      url,
      method,
    };

    if (body) {
      config.data = body;
    }

    const response = await ADMINAPI(config);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
