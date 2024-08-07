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



// // redux/store.ts
// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import authReducer from './authSlice';

// // Define RootState type
// export type RootState = ReturnType<typeof store.getState>;

// // Redux Persist configuration
// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, authReducer);

// const store = configureStore({
//   reducer: {
//     auth: persistedReducer,
//     // Add other reducers if needed
//   },
// });

// // Create a persistor
// const persistor = persistStore(store);

// export { store, persistor };





import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';

export type RootState = ReturnType<typeof store.getState>;


// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    // Add other reducers if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['auth.register'], // Or other paths if necessary
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
