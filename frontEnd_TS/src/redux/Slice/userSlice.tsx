import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    id: "",
    name: "",
    role: "",
    email: "",
    mobile: "",
    isAuthenticated:false,

  },

  reducers: {
    newUser: (state, action) => {
       console.log("Reducer Payload:", action.payload); // Check what actually arrives
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.mobile = action.payload.mobile;
      state.isAuthenticated=true
    },

    logout: (state) => {
      state.id = "";
      state.name = "";
      state.role = "";
      state.email = "";
      state.mobile = "";
    },
  },
});

export const { newUser, logout } = userSlice.actions;

export default userSlice.reducer;
