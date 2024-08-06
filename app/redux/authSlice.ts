// redux/authSlice.js
"use client";

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   token: null,
//   userInfo: null,
//   userInformation: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.token = action.payload;
//       state.userInfo = action.payload;
//     },
//     signInSuccess: (state, action) => {
//       state.userInformation = action.payload;
//     },
//   },
// });

// export const { loginSuccess, signInSuccess } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userInfo: any; // Define this type more precisely if possible
  userInformation: any; // Define this type more precisely if possible
}

const initialState: AuthState = {
  token: null,
  userInfo: null,
  userInformation: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.userInfo = action.payload;
    },
    signInSuccess: (state, action: PayloadAction<any>) => {
      state.userInformation = action.payload;
    },
  },
});

export const { loginSuccess, signInSuccess } = authSlice.actions;
export default authSlice.reducer;