// redux/authSlice.js
"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userInfo: {},
  userInformation: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.userInfo = action.payload;
    },
    signInSuccess: (state, action) => {
      state.userInformation = action.payload;
    },
  },
});

export const { loginSuccess, signInSuccess } = authSlice.actions;
export default authSlice.reducer;
