import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice";
import hotelReducer from "./Slice/restaurentSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

//combining all reducers
const rootReducer = combineReducers({
  user: userReducer,
  restaurentSlice: hotelReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // persist only 'user' slice, or add more if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
