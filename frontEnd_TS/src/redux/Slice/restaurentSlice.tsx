import { createSlice } from "@reduxjs/toolkit";
import type{  PayloadAction } from "@reduxjs/toolkit";


interface Hotel {
  name: string;
  _id: string;
  displayPicture: string;
}

interface HotelState {
  hotels: Hotel[];
}


const initialState: HotelState = {
  hotels: [],
};


const hotelSlice = createSlice({
  name: "restaurantSlice",
  initialState,
  reducers: {
    newHotels: (state, action: PayloadAction<Hotel[]>) => {
      state.hotels = action.payload;
    },
   
  },
});

export const { newHotels } = hotelSlice.actions;
export default hotelSlice.reducer;
