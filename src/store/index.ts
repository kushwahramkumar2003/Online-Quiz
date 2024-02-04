import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./reducers/userReducers.js";

const userInfoFromStorage = localStorage.getItem("account")
  ? JSON.parse(localStorage.getItem("account")!)
  : null;

const initialState = {
  user: { userInfo: userInfoFromStorage?.user },
};

const store: any = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: initialState,
});

export default store;
