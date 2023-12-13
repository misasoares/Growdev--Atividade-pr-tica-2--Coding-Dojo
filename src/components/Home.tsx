import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import axios from "axios";
import { createAvaliacoes } from "../store/modules/avaliacoes/avaliacoesSlice";
import TableAvaliacoes from "./TableAvaliacoes";

export default function Home() {
  const dispatch = useAppDispatch();
  const userRedux = useAppSelector((state) => state.user);
  const avaliacoesRedux = useAppSelector((state) => state.avaliacoes);

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

      <TableAvaliacoes avaliacoes={avaliacoesRedux} userLogado={userRedux} handleDelete={handleDelete} />
    </div>
  );
}
