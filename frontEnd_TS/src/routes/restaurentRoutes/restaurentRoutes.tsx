
//import Sigunp from "../../Components/Restaurent/Pages/Sigunp";
import Login from "../../Components/Restaurent/Pages/Login"
import Dashboard from "../../Components/Restaurent/Pages/dashboard";
import HandleSignup from "../../Components/Restaurent/handleSignup";


const RestaurentRoutes=[
    { path:"/restaurent/signup",element:<HandleSignup/>},
    {path:"/restaurent/login",element:<Login/>},
    {path:"/restaurent/dashboard",element:<Dashboard/>}
    
]




export default RestaurentRoutes