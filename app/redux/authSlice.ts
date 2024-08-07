// redux/authSlice.js
"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataType } from "../types/user";

interface AuthState {
  token: string | null;
  userInformation: UserDataType | null; // Define this type more precisely if possible
}

const initialState: AuthState = {
  token: null,
  userInformation: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    signInSuccess: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
      state.userInformation = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.userInformation = null;
    },
  },
});

export const { loginSuccess, signInSuccess, logout } = authSlice.actions;
export default authSlice.reducer;