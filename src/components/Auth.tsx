import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useEffect, useState } from "react";
import { createNewUser, createUsers } from "../store/modules/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../store/modules/user/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Auth() {
  const dispatch = useAppDispatch();
  const usersRedux = useAppSelector((state) => state.users);

  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [idadeToNumber, setIdadeToNumber] = useState(""); //transformar em number
  const [tipoToUper, setTipoToUper] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getUsersFRomAPI() {
      const res = await axios.get("http://localhost:1324/aluno");

      const arrayDeUsuarios = res.data.data;

      dispatch(createNewUser(arrayDeUsuarios));
    }
    getUsersFRomAPI();
  }, []);

  function handleSubmit() {
    if (signup) {
      const idade = Number(idadeToNumber);
      const tipo = tipoToUper.toUpperCase();
      const newUser = {
        email,
        password,
        nome,
        idade,
        tipo,
      };
      dispatch(createUsers(newUser));
    } else {
      const exist = usersRedux.find((user) => user.email === email);
      if (exist) {
        dispatch(login({ email, password }));
        navigate("/home");
        return exist;
      } else {
        alert("Este usuário não existe.");
      }
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <Box>
        {signup ? (
          <img style={{ width: "60vw" }} src="https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        ) : (
          <img style={{ width: "60vw" }} src="https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "40vw", m: 4 }}>
        <Avatar sx={{ bgcolor: pink[600] }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography mt={2} variant="h4" component="h1">
          {signup ? "Sign up" : "Sign in"}
        </Typography>

        <TextField sx={{ mt: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} type="email" label="E-mail" required fullWidth />
        <TextField sx={{ mt: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} type="password" label="Password" required fullWidth />
        {signup && (
          <div>
            <TextField sx={{ mt: 2, mb: 2 }} value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} label="Repeat password" type="password" required fullWidth />
            <TextField sx={{ mt: 2, mb: 2 }} value={nome} onChange={(e) => setNome(e.target.value)} label="Nome" required fullWidth />
            <TextField sx={{ mt: 2, mb: 2 }} value={idadeToNumber} onChange={(e) => setIdadeToNumber(e.target.value)} label="Idade" required fullWidth />
            <TextField sx={{ mt: 2, mb: 2 }} value={tipoToUper} onChange={(e) => setTipoToUper(e.target.value)} label="Tipo (T, M, F)" required fullWidth />
          </div>
        )}

        <Button onClick={handleSubmit} fullWidth variant="contained">
          {signup ? "Criar conta" : "Entrar"}
        </Button>

        <Typography onClick={() => setSignup(!signup)} sx={{ textDecoration: "underline", cursor: "pointer" }} my={2} variant="subtitle2" component="h2">
          {signup ? "Já possui conta? Vá para Login" : "Não tem conta? Cadastre-se"}
        </Typography>
      </Box>
    </div>
  );
}
