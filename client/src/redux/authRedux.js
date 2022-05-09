import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: null,
    user: JSON.parse(localStorage.getItem("userid")) || null,
    isError: null,
  },
  reducers: {
    LOGIN_START: (state) => {
      state.isLoading = true;
      state.user = null;
      state.isError = false;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isError = false;
    },
    LOGIN_FAIL: (state) => {
      state.isLoading = null;
      state.user = null;
      state.isError = true;
    },
    LOGOUT: (state) => {
      state.isLoading = null;
      state.user = null;
      state.isError = null;
    },
  },
});

export const { LOGIN_START, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } =
  authSlice.actions;
export default authSlice.reducer;
