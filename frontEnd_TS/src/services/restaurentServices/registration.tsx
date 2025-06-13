
import { apiRequest } from "../../utils/Api_helper/restaurentApihelper";


export const  registration=async(formData:any)=>{

    return await apiRequest("/signup","POST",formData)


}