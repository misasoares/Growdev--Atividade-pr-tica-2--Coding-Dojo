import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import axios from "axios";
import { createAvaliacoes } from "../store/modules/avaliacoes/avaliacoesSlice";
import TableAvaliacoes from "./TableAvaliacoes";
import { Button } from "@mui/material";
import BasicModal from "./BasicModal";

export default function Home() {
  const dispatch = useAppDispatch();
  const userRedux = useAppSelector((state) => state.user);
  const avaliacoesRedux = useAppSelector((state) => state.avaliacoes);
  const [modal, setModal] = useState(false)

  useEffect(() => {
    async function getAvaliacoes() {
      try {
        const res = await axios.get("http://localhost:1324/avaliacao/", {
          headers: {
            authorization: userRedux.token,
          },
        });
        const arrayDeAvaliacoes = res.data.data;

        dispatch(createAvaliacoes(arrayDeAvaliacoes));
      } catch (error) {
        console.log(error);
      }
    }

    getAvaliacoes();
  }, [avaliacoesRedux]);

  async function handleDelete(id: string) {
    const res = await axios.delete(`http://localhost:1324/avaliacao/${id}`, {
      headers: {
        authorization: userRedux.token,
      },
    });
    console.log(res);
  }



  return (
    <div>
      <h1>Home</h1>

      {userRedux.tipo === "T" && <Button variant="contained" onClick={()=>setModal(!modal)}>Crie uma avaliação</Button>}
      <BasicModal closeModal={()=>setModal(false)} modal={modal}/>

      <TableAvaliacoes avaliacoes={avaliacoesRedux} userLogado={userRedux} handleDelete={handleDelete} />
    </div>
  );
}
