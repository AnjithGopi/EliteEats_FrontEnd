

export const restaurantName=(restaurantName:string)=>{

    if(!restaurantName){

        return "Restaurent name is required"
    }

    if(restaurantName.startsWith(" ")||restaurantName.endsWith(" ")||restaurantName.includes(" ")){

        return "Restaurent name should not contain empty spaces"
    }

    
}