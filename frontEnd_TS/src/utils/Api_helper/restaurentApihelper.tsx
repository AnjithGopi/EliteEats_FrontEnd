import API from "../axiosInstance";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Config = {
  url: string;
  method: Method;
  data?: unknown;
};

export const apiRequest = async (
  url: string,
  method: Method,
  body?: unknown
) => {
  try {
    const config: Config = {
      method,
      url,
    };

    if (body) {
      config.data = body;
    }

    const response = await API(config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(`error occured at ${method}${url}:${error}`);
  }
};
