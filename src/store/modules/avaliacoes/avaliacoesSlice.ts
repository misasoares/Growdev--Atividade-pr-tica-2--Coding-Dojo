import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AvaliacoesType {
  id: string;
  idAluno:string
  disciplina: string;
  nota: number;
}

const initialState: AvaliacoesType[] = [];

const avaliacoesSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createAvaliacoes(state, action: PayloadAction<AvaliacoesType[]>) {
      state = action.payload;
      return state;
    },
  },
});

export const { createAvaliacoes } = avaliacoesSlice.actions;
export default avaliacoesSlice.reducer;
