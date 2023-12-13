import { combineReducers } from "@reduxjs/toolkit";
import usersSlice from "./users/usersSlice";
import userSlice from "./user/userSlice";
import avaliacoesSlice from "./avaliacoes/avaliacoesSlice";

export default combineReducers({
  users: usersSlice,
  user: userSlice,
  avaliacoes: avaliacoesSlice
});
