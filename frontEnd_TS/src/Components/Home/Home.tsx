import type { RootState } from "../../redux/store";
import NavBar from "./NavBar";
import Body from "./body";
import {  useSelector } from "react-redux";
// import { logout } from "../../redux/Slice/userSlice";
import { useEffect } from "react";

function Home() {
  // const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.user.name);
  // const handleLogout = dispatch(logout());

  useEffect(()=>{
    console.log("User loged in :",user)
  },[user])

  return (
    <>
    
      <NavBar
        isAuthenticated={isAuthenticated}
        user={user}
        // handleLogout={handleLogout}
      />
      <Body />
    </>
  );
}

export default Home;
