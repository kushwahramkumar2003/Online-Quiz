import { createSlice } from "@reduxjs/toolkit";

const userInitialState = { userInfo: null };
const userSlice = createSlice({
  name: "count",
  initialState: userInitialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    //eslint-disable-next-line
    resetUserInfo(state, action) {
      console.log(action);
      state.userInfo = null;
    },
  },
});

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export { userActions, userReducer };
