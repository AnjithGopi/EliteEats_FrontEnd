

import axios from "axios";

import { RIDER_BASE_URL } from "../Constants/api";

const RIDER_API=axios.create({baseURL:RIDER_BASE_URL,withCredentials:true})

RIDER_API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if(status==403){
      console.log("user logout")
    }

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

export default RIDER_API