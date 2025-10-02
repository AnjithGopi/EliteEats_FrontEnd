import axios  from "axios";
import type{AxiosInstance} from "axios"



const handleError = (error:any, context: string) => {
  const status = error.response ? error.response.status : null;

  if (status === 401) {
    console.log(`[${context}] Unauthorized (401)`);
  } else if (status === 403) {
    console.log(`[${context}] Forbidden (403)`);
  } else if (status === 404) {
    console.log(`[${context}] Not found (404)`);
  } else if (status === 500) {
    console.log(`[${context}] Internal server error (500)`);
  } else {
    console.log(`[${context}] Unexpected error:`, error);
  }

  return Promise.reject(error);
};

export const createAPI = (baseURL: string, context: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => handleError(error, context)
  );

  return instance;
};