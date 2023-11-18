import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UsersType } from "../users/usersSlice";

const initialState: UsersType = {
  email: "",
  password: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logar(state, action: PayloadAction<UsersType>) {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

export const { logar } = userSlice.actions;
export default userSlice.reducer;
