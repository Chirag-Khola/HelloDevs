import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), // Apply 'thunk' middleware
  devTools: process.env.NODE_ENV !== "production", // Enable dev tools in development
});

console.log("Root Reducer:", rootReducer);
console.log("Initial Store State:", store.getState());



export default store;

