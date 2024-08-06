// // redux/store.js
// 'use client'

// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     // Add other reducers if needed
//   },
// });

// export default store;



// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers if needed
  },
});

export default store;
