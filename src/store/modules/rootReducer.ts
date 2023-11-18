import { combineReducers } from "@reduxjs/toolkit";
import usersSlice from "./users/usersSlice";
import userSlice from "./user/userSlice";

export default combineReducers({
  users: usersSlice,
  user: userSlice,
});
