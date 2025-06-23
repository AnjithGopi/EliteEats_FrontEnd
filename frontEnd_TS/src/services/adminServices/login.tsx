

import { admin_apirequest } from "../../utils/Api_helper/adminApihelper";


export const login=async(formData:unknown)=>{

    return await admin_apirequest("login","POST",formData)

}


export const getUsers =async()=>{

    return await admin_apirequest("users","GET")
}




