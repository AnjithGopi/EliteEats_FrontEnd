import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice";
import hotelReducer from "./Slice/restaurentSlice";
import riderReducer from "./Slice/riderSlice"
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import adminReducer from "./Slice/adminSlice"


//combining all reducers
const rootReducer = combineReducers({
  user: userReducer,
  restaurentSlice: hotelReducer,
  riderSlice:riderReducer,
  adminSlice:adminReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user","restaurentSlice","adminSlice"], // persist only 'user' slice, or add more if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
