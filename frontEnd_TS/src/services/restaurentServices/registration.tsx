
import { apiRequest } from "../../utils/Api_helper/restaurentApihelper";




export const  registration=async(formData:unknown)=>{

    return await apiRequest("/signup","POST",formData)


}

export const verifyOtp=async(formData:unknown)=>{

    return await apiRequest("/verify_otp","POST",formData)
}