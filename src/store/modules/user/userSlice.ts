import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UserType {
  email: string;
  password: string;
}

export interface UserLogado {
  nome: string;
  email: string;
  id: string;
  idade: string;
  token:string
  tipo:string
}

export const login = createAsyncThunk("login/login", async (userData: UserType) => {
  try {
    const response = await axios.post("http://localhost:1324/auth/", userData);

    const { data } = response.data;

    if (data) {
      return {
        nome: data.nome,
        email: data.email,
        id: data.id,
        idade: data.idade,
        tipo:data.tipo,
        token:data.token
      };
    } else {
      return initialState;
    }
  } catch (error) {
    console.error("Erro ao fazer login", error);
    return null;
  }
});

const initialState: UserLogado = {
  nome: "",
  email: "",
  id: "",
  idade: "",
  token:"",
  tipo:""
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // logar(state, action: PayloadAction<UsersType>) {
    //   state.email = action.payload.email;
    //   state.password = action.payload.password;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        return state;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          state = action.payload;
        }
        return state;
      });
  },
});

// export const { logar } = userSlice.actions;
export default userSlice.reducer;
