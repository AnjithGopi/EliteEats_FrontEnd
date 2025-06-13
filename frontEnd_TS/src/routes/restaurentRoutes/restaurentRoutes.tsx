
//import Sigunp from "../../Components/Restaurent/Pages/Sigunp";
import Login from "../../Components/Restaurent/Pages/Login"
import HandleSignup from "../../Components/Restaurent/handleSignup";


const RestaurentRoutes=[
    { path:"/restaurent/signup",element:<HandleSignup/>},
    {path:"/restaurent/login",element:<Login/>},
]




export default RestaurentRoutes