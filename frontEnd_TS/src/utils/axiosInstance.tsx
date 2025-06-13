

import axios from "axios";
//import Swal from "sweetalert2";
 import { RESTAURENT_BASE_URL } from "../Constants/api";



const API= axios.create({baseURL:RESTAURENT_BASE_URL})
console.log(API)



API.interceptors.response.use(
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

export default API