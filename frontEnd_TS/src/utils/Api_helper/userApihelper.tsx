import USER_API from "../userAxiosInstance";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const userApiRequest = async (
  url: string,
  method: Method,
  body?: unknown
) => {
  try {
    const config: any = {
      url,
      method,
    };

    if (body) {
      config.data = body;
    }

    const response = await USER_API(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
