import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  role: "",
  email: "",
  mobile: "",
  isAuthenticated: false,
  cart: [],

  restaurentData: {
    name: "",
    id: "",
    description: "",
    displayPicture: "",
    menu: [],
    categories: [],
  },

  instantOrderProduct: "",
};
const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    newUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.mobile = action.payload.mobile;
      state.isAuthenticated = true;
    },

    restuarentData: (state, action) => {
      state.restaurentData.name = action.payload.hotel.name;
      state.restaurentData.id = action.payload.hotel._id;
      state.restaurentData.description = action.payload.hotel.description;
      state.restaurentData.menu = action.payload.menu;
      state.restaurentData.categories = action.payload.category;
      state.restaurentData.displayPicture = action.payload.hotel.displayPicture;
    },

    addCart: (state, action) => {
      state.cart = action.payload.items;
    },

    logout: () => {
      return initialState;
    },

    instantOrder: (state, action) => {
      state.instantOrderProduct = action.payload;
    },
  },
});

export const { newUser, logout, restuarentData, addCart, instantOrder } =
  userSlice.actions;

export default userSlice.reducer;
