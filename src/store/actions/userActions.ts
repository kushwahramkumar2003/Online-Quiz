import { userActions } from "../reducers/userReducers.js";

export const logout = () => (dispatch) => {
  dispatch(userActions.resetUserInfo({}));
  localStorage.removeItem("account");
};
