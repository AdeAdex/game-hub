// redux/authSlice.js
"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userInfo: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
    },
  },
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
