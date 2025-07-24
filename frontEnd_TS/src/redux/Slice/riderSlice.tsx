import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  role: "",
  email: "",
  mobile: "",
  isAuthenticated: false,

  registrationData: {
    email: "",
    token: "",
  },
};

const riderSlice = createSlice({
  name: "riderSlice",
  initialState,

  reducers: {
    register: (state, action) => {
      state.registrationData.email = action.payload.email;
      state.registrationData.token = action.payload.token;
    },

    clearRegistration: (state) => {
      state.registrationData = { ...initialState.registrationData };
    },

    newRider: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.mobile = action.payload.mobile;
      state.isAuthenticated = true;
    },

     logout: () => {
          return initialState;
        },
    
  },
});

export const { register, clearRegistration ,newRider,logout} = riderSlice.actions;
export default riderSlice.reducer;
