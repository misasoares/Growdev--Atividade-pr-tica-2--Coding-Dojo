import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import axios from "axios";
import { createAvaliacoes } from "../store/modules/avaliacoes/avaliacoesSlice";
import TableAvaliacoes from "./TableAvaliacoes";
import { Button } from "@mui/material";
import BasicModal, { DataProps } from "./BasicModal";

export default function Home() {
  const usersRedux = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const userRedux = useAppSelector((state) => state.user);
  const avaliacoesRedux = useAppSelector((state) => state.avaliacoes);
  const [modal, setModal] = useState(false);
  const [handleModalType, setHandleModalType] = useState("create");
  const [idAvaliacao, setIdAvaliacao] = useState("");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleDelete]);

  async function handleDelete(id: string) {
    const res = await axios.delete(`http://localhost:1324/avaliacao/${id}`, {
      headers: {
        authorization: userRedux.token,
      },
    });
    console.log(res);
  }

  async function handleClickEdit(id: string) {
    setHandleModalType("update"); //muda o tipo do modal para update
    setModal(true); //abre o modal
    setIdAvaliacao(id); //define qual avaliação será alterada
  }

  async function dataModal(data: DataProps) {
    if ((data.aluno || data.disciplina || data.nota) === "") {
      alert("Preencha todos os dados");
      return;
    }
    if (data.type === "create") {
      const alunoAvaliado = usersRedux.find((aluno) => aluno.nome === data.aluno);

      const avaliacao = {
        idAlunoAvaliado: alunoAvaliado!.id,
        disciplina: data.disciplina,
        nota: data.nota,
      };
      try {
        await axios.post("http://localhost:1324/avaliacao", avaliacao, {
          headers: {
            authorization: userRedux.token,
          },
        });
        alert("Avaliação criada com sucesso.");
      } catch (error) {
        alert("Revise os dados e tente novamente");
      }

      setModal(false);
    } else {
      //atualizar
      const alunoAvaliado = usersRedux.find((aluno) => aluno.nome === data.aluno);
      console.log(alunoAvaliado);
      const avaliacao = {
        idAlunoAvaliado: alunoAvaliado!.id,
        disciplina: data.disciplina,
        nota: data.nota,
        idAvaliacao,
      };

      try {
        await axios.put("http://localhost:1324/avaliacao", avaliacao, {
          headers: {
            authorization: userRedux.token,
          },
        });

        alert("Avaliação atualizada com sucesso.");
      } catch (error) {
        alert("Revise os dados e tente novamente");
      }
      setModal(false);
    }
  }

  function handleCloseModal() {
    setModal(false);
    setHandleModalType("create");
  }

  return (
    <div>
      <h1>Home</h1>

      {userRedux.tipo === "T" && (
        <Button variant="contained" onClick={() => setModal(!modal)}>
          Crie uma avaliação
        </Button>
      )}
      <BasicModal data={dataModal} type={handleModalType} closeModal={handleCloseModal} openModal={modal} />

      <TableAvaliacoes avaliacoes={avaliacoesRedux} userLogado={userRedux} handleDelete={handleDelete} handleEdit={handleClickEdit} />
    </div>
  );
}
