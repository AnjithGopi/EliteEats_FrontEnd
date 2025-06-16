

import axios from "axios";
import { ADMIN_BASE_URL } from "../Constants/api";

const ADMINAPI=axios.create({baseURL:ADMIN_BASE_URL})


console.log(ADMINAPI)


ADMINAPI.interceptors.response.use(
    response=>response,
    error=>{
        const status=error.response?error.response.status:null

        if(status==404){
            console.log("not found")
        }else if(status==500){
            console.log("internal server error")
        }else{

            console.log(error)
        }
        return Promise.reject(error)
    }

    
)

export default ADMINAPI

