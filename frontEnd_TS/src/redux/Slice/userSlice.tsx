import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    id: "",
    name: "",
    role: "",
    email: "",
    mobile: "",
  },

  reducers: {
    newUser: (state, action) => {
      state.id = action.payload._id;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.mobile = action.payload.mobile;
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
