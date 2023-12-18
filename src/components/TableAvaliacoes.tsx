import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AvaliacoesType } from "../store/modules/avaliacoes/avaliacoesSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { UserLogado } from "../store/modules/user/userSlice";
import { useAppSelector } from "../store/hooks";

interface TableProps {
  avaliacoes: AvaliacoesType[];
  userLogado: UserLogado;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}

export default function TableAvaliacoes({ avaliacoes, userLogado, handleDelete, handleEdit }: TableProps) {
  const tipoDeUser = userLogado.tipo;
  const usersRedux = useAppSelector((state) => state.users);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Disciplina</TableCell>

            <TableCell align="right">Nota</TableCell>

            <TableCell align="right">Aluno</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {avaliacoes.map((row) => (
            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.disciplina}
              </TableCell>
              <TableCell align="right">{row.nota}</TableCell>
              <TableCell align="right">{usersRedux.find((user) => user.id === row.idAluno)!.nome}</TableCell>
              <TableCell align="right">
                {tipoDeUser !== "T" ? (
                  <div>
                    <Button disabled>
                      <EditIcon />
                    </Button>
                    <Button disabled>
                      <DeleteIcon />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button onClick={() => handleEdit(row.id)}>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => handleDelete(row.id)}>
                      <DeleteIcon />
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
