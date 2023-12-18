import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Autocomplete, TextField } from "@mui/material";
import { useAppSelector } from "../store/hooks";

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

export interface DataProps {
  aluno: string;
  disciplina: string;
  nota: string;
  type: string;
}

interface ModalProps {
  openModal: boolean;
  closeModal: (arg0: boolean) => void;
  type: string; //"create" | "update"
  data: (data: DataProps) => void;
}

export default function BasicModal({ openModal, closeModal, type, data }: ModalProps) {
  const usersRedux = useAppSelector((state) => state.users);
  const [inputUser, setInputUser] = React.useState("");
  const [disciplina, setDisciplina] = React.useState("");
  const [nota, setNota] = React.useState("");

  function handleClose() {
    closeModal(false);
  }

  function handleData() {
    const avaliacao = {
      aluno: inputUser,
      disciplina,
      nota,
      type,
    };

    data(avaliacao);
  }

  return (
    <div>
      <Modal open={openModal} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {type === "create" ? "Crie uma avaliação" : "Atualize a avaliação."}
          </Typography>

          <Autocomplete
            onInputChange={(_event, newInputUser) => setInputUser(newInputUser)}
            inputValue={inputUser}
            options={usersRedux.map((user) => user.nome)}
            renderInput={(params) => <TextField sx={{ margin: 1 }} {...params} name="alunos" label="Selecione um aluno" />}
          />

          <TextField label="Disciplina" onChange={(e) => setDisciplina(e.target.value)} />
          <TextField label="Nota(0 á 10)" onChange={(e) => setNota(e.target.value)} />

          <Button onClick={handleData} variant="contained">
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
