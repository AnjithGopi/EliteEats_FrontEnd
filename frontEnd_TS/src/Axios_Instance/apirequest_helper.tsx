import type { AxiosInstance, AxiosRequestConfig } from "axios";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const apiRequest = async (
  instance: AxiosInstance,
  url: string,
  method: Method,
  body?: unknown
) => {
  const config: AxiosRequestConfig = { url, method };
  if (body) config.data = body;

  const response = await instance.request(config);
  return response.data;
};
