import { createAPI } from "./axiosInstance";

import { ADMIN_BASE_URL,USER_BASE_URL,API_BASE_URL,RESTAURENT_BASE_URL,RIDER_BASE_URL } from "../Constants/api";


export const ADMIN_API=createAPI(ADMIN_BASE_URL,"ADMIN_API")
export const USER_API=createAPI(USER_BASE_URL,"USER_API")
export const API_BASE=createAPI(API_BASE_URL,"API_BASE_URL")
export const RESTAURENT_API=createAPI(RESTAURENT_BASE_URL,"RESTAURENT_API")
export const RIDER_API=createAPI(RIDER_BASE_URL,"RIDER_BASE_URL")
