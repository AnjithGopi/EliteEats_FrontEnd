import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  role: "",
  email: "",
  mobile: "",
  isAuthenticated: false,
  cart: [],

  defaultAddress: {
    fullAddress: "",
    city: "",
    zipcode: "",
    state: "",
  },

  restaurentData: {
    name: "",
    id: "",
    description: "",
    displayPicture: "",
    menu: [],
    categories: [],
  },

  // orderFromCart: {
  //   products: [],
  //   subtotal: "",
  //   deliveryfee: "",
  //   tax: "",
  //   totalAmoutToPay: "",
  // },

  
  orderFromCart: {
    items: [], // Changed from products to items to match cart schema
    subtotal: "",
    deliveryfee: "",
    tax: "",
    totalAmountToPay: "", // Fixed typo: was totalAmoutToPay
  },

  hotelIdForCheckout: "",

  orders: [],

  latitude: "",
  longitude: "",
  addressOnLocation: "",
  orderAddress: [],
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

    setHotelIdForCheckout: (state, action) => {
      state.hotelIdForCheckout = action.payload;
    },

    // orderFromCart: (state, action) => {
    //   state.orderFromCart.products = action.payload.productname;
    //   state.orderFromCart.subtotal = action.payload.subtotal;
    //   state.orderFromCart.deliveryfee = action.payload.deliveryfee;
    //   state.orderFromCart.tax = action.payload.tax;
    //   state.orderFromCart.totalAmoutToPay = action.payload.totalAmout;
    // },

     orderFromCart: (state, action) => {
      state.orderFromCart.items = action.payload.items; // Store complete item objects
      state.orderFromCart.subtotal = action.payload.subtotal;
      state.orderFromCart.deliveryfee = action.payload.deliveryfee;
      state.orderFromCart.tax = action.payload.tax;
      state.orderFromCart.totalAmountToPay = action.payload.totalAmountToPay; // Fixed typo
    },

    setOrders: (state, action) => {
      state.orders = action.payload;
    },

    logout: () => {
      return initialState;
    },

    clearCartfromRedux: (state) => {
      state.cart = [];
    },

    setCurrentAddress: (state, action) => {
      state.addressOnLocation = action.payload;
    },

    setLatitudeAndLongitude: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    setOrderAddress: (state, action) => {
      state.orderAddress = action.payload;
    },
  },
});

export const {
  newUser,
  logout,
  restuarentData,
  addCart,
  orderFromCart,
  clearCartfromRedux,
  setCurrentAddress,
  setLatitudeAndLongitude,
  setOrderAddress,
  setHotelIdForCheckout,
  setOrders
} = userSlice.actions;

export default userSlice.reducer;
