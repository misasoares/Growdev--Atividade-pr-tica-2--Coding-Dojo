import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UsersType {
  email: string;
  password: string;
}

const initialState: UsersType[] = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createNewUser(state, action: PayloadAction<UsersType>) {
      state.push(action.payload);
      return state;
    },
  },
});

export const { createNewUser } = usersSlice.actions;
export default usersSlice.reducer;
