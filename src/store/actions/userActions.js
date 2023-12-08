import { userActions } from "../reducers/userReducers.js";

export const logout = (type) => (dispatch, getState) => {
  dispatch(userActions.resetUserInfo());
  localStorage.removeItem("account");
};
