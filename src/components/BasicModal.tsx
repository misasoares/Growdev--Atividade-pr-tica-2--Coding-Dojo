import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Autocomplete, TextField } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

interface ModalProps {
  modal: boolean;
  closeModal: (arg0: boolean) => void;
}

export default function BasicModal({ modal, closeModal }: ModalProps) {
  const userRedux = useAppSelector((state) => state.user);
  const usersRedux = useAppSelector((state) => state.users);
  const [inputUser, setInputUser] = React.useState("");
  const [disciplina, setDisciplina] = React.useState("");
  const [nota, setNota] = React.useState("");

  function handleClose() {
    closeModal(false);
  }

  async function handleComplete() {
    const alunoAvaliado = usersRedux.find((aluno) => aluno.nome === inputUser);
    const avaliacao = {
      idAlunoAvaliado: alunoAvaliado!.id,
      disciplina,
      nota,
    };

    const avaliacaoRes = await axios.post("http://localhost:1324/avaliacao", avaliacao, {
      headers: {
        authorization: userRedux.token,
      },
    });

    if(avaliacaoRes.status!==201){
        alert("Algo deu errado, revise as informações passadas.")
        return
    }

    closeModal(false);
  }

  return (
    <div>
      <Modal open={modal} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Criar avaliação
          </Typography>

          <Autocomplete
            onInputChange={(_event, newInputUser) => setInputUser(newInputUser)}
            inputValue={inputUser}
            options={usersRedux.map((user) => user.nome)}
            renderInput={(params) => <TextField sx={{ margin: 1 }} {...params} name="alunos" label="Selecione um aluno" />}
          />

          <TextField label="Disciplina" onChange={(e)=>setDisciplina(e.target.value)}/>
          <TextField label="Nota(0 á 10)" onChange={(e)=>setNota(e.target.value)}/>

          <Button onClick={handleComplete} variant="contained">
            Concluir
          </Button>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancelar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
