import axios from "axios";

import {  USER_BASE_URL } from "../Constants/api";

const USER_API = axios.create({ baseURL: USER_BASE_URL,withCredentials:true} );

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status == 404) {
      console.log("not found");
    } else if (status == 500) {
      console.log("internal server error");
    } else {
      console.log(error);
    }
    return Promise.reject(error);
  }
);

export default USER_API;
