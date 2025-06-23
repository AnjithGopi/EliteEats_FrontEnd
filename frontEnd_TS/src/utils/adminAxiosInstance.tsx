

import axios from "axios";
import { ADMIN_BASE_URL } from "../Constants/api";

const ADMINAPI=axios.create({baseURL:ADMIN_BASE_URL,withCredentials: true})


console.log(ADMINAPI)


ADMINAPI.interceptors.response.use(
    response=>response,
    error=>{
        const status=error.response?error.response.status:null

        if(status==401){
            alert("401")
            console.log("not found")
        }else if(status==500){
            console.log("internal server error")
        }else{

            alert("401")

            console.log(error)
        }
        return Promise.reject(error)
    }

    
)

export default ADMINAPI

