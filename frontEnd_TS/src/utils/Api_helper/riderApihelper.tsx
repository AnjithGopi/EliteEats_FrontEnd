import RIDER_API from "../riderAxiosInstance";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Config = {
  url: string;
  method: Method;
  data?: unknown;
};

export const riderApiRequest = async (
  url: string,
  method: Method,
  body?: unknown
) => {
  try {
    const config: Config = {
      url,
      method,
    };

    if (body) {
      config.data = body;
    }

    const response = await RIDER_API(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};