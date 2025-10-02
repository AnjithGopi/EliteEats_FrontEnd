import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Hotel {
  name: string;
  _id: string;
  displayPicture: string;
}

interface Category {
  name?: string;
  _id?: string;
  hotelId?: string;
  description?: string;
}

interface Menu {
  itemName?: string;
  _id?: string;
  hotelId?: string;
  description?: string;
  featuredItem?: boolean;
  category?: string;
  images?: string;
  price?: string;
  isAvailabe?: boolean;
  isActive?: boolean;
}

interface HotelState {
  hotels: Hotel[];
  hotelsNearUser: Hotel[];
  categories: Category[];
  menu: Menu[];
  hotelDetails: {
    id: string;
    name: string;
    role: string;
    email: string;
    mobile: string;
    isAuthenticated: boolean;
  };
}

const initialState: HotelState = {
  hotels: [],
  hotelsNearUser: [],
  categories: [],
  menu: [],
  hotelDetails: {
    id: "",
    name: "",
    role: "",
    email: "",
    mobile: "",
    isAuthenticated: false,
  },
};

const hotelSlice = createSlice({
  name: "restaurantSlice",
  initialState,
  reducers: {
    getAllHotel: (state, action: PayloadAction<Hotel[]>) => {
      state.hotels = action.payload;
    },
    addNewCategory: (state, action) => {
      state.categories = action.payload;
    },
    newRestaurent: (state, action) => {
      state.hotelDetails.id = action.payload._id;
      state.hotelDetails.name = action.payload.name;
      state.hotelDetails.role = action.payload.role;
      state.hotelDetails.email = action.payload.email;
      state.hotelDetails.mobile = action.payload.mobile;
      state.hotelDetails.isAuthenticated = true;
    },

    addNewMenu: (state, action) => {
      state.menu = action.payload;
    },

    getHotelsNearuser: (state, action) => {
      state.hotels = action.payload;
    },

    logout: (state) => {
      state.hotelDetails = initialState.hotelDetails;
      state.categories = [];
      state.menu = [];
      state.hotels = [];
    },
  },
});

export const {
  getAllHotel,
  addNewCategory,
  newRestaurent,
  addNewMenu,
  logout,
  getHotelsNearuser,
} = hotelSlice.actions;
export default hotelSlice.reducer;
