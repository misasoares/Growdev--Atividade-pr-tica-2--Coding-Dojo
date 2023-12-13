import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface UsersType {
  nome: string;
  email: string;
  password: string;
  idade: number;
  tipo: string;
}

export const createUsers = createAsyncThunk("users/createUsers", async (dataUser: UsersType) => {
  try {
    const response = await axios.post("http://localhost:1324/aluno/", dataUser);

    const { data } = response.data;

    return {
      nome: data.nome,
      email: data.email,
      password: data.password,
      idade: data.idade,
      tipo: data.tipo,
    };
  } catch (error) {
    console.error("Erro ao criar usuários:", error);
    return null;
  }
});

const initialState: UsersType[] = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createNewUser(state, action: PayloadAction<UsersType[]>) {
      state = action.payload
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUsers.pending, (state) => {
        return state;
      })
      .addCase(createUsers.fulfilled, (state, action) => {
        if (action.payload) {
          state.push(action.payload);
        }
        return state;
      });
  },
});

export const { createNewUser } = usersSlice.actions;
export default usersSlice.reducer;
