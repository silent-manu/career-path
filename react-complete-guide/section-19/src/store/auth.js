import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isAuthenticated: false };
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    userLogin(state) {
      state.isAuthenticated = true;
    },
    userLogout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
