import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name:"",
  role: "",
  email: "",
  mobile: "",
  isAuthenticated: false,
};

const adminSlice = createSlice({
  name: "adminSlice",
  initialState,

  reducers: {
    adminLogin: (state, action) => {
      state.id = action.payload.id;
      state.name=action.payload.name;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.mobile = action.payload.mobile;
      state.isAuthenticated = true;
    },

    adminLogout: () => {
      return initialState;
    },
  },
});

export const { adminLogin,adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
