import ADMINAPI from "../adminAxiosInstance";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const admin_apirequest = async (
  url: string,
  method: Method,
  body?: any
) => {
  try {
    console.log(url, method, body);

    const config: any = {
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
