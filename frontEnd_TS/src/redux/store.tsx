import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice"
import hotelReducer from "./Slice/restaurentSlice"

const store=configureStore({

    reducer:{
        user:userReducer,
        restaurentSlice:hotelReducer
        
    }
})


export default store
export type RootState = ReturnType<typeof store.getState>;