import { Avatar, Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createNewUser } from "../store/modules/users/usersSlice";
import { logar } from "../store/modules/user/userSlice";

export default function Auth() {
  const dispatch = useAppDispatch();
  const usersRedux = useAppSelector((state) => state.users);
  const userRedux = useAppSelector((state) => state.user);
  const [signup, setSignup] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  function doPasswordsMatch() {
    return password === repeatPassword;
  }

  function isValidEmail(email: string) {
    const emailPattern = /^[a-zA-Z0-9._-]{3,}@(gmail|outlook|hotmail)\.com$/;
    return emailPattern.test(email);
  }

  function isValidPassword(password: string) {
    // Verificar se tem pelo menos 4 letras
    if (password.replace(/[^a-zA-Z]/g, "").length < 4) {
      return false;
    }

    // Verificar se a senha é um conjunto de números sequenciais
    const sequentialNumbers = /1234|2345|3456|4567|5678|6789|7890/;
    return !sequentialNumbers.test(password);
  }

  function handleSubmit() {
    if (!isValidEmail(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }
    if (!isValidPassword(password)) {
      alert("A senha deve ter pelo menos 4 letras e não ser um conjunto de números sequenciais.");
      return;
    }

    if (signup && !doPasswordsMatch()) {
      alert("As senhas não correspondem.");
      return;
    }

    if (signup) {
      //dispachar criação de usuario
      dispatch(createNewUser({ email, password }));

      setSignup(!signup);
    } else {
      //fazert login
      const validateLogin = usersRedux.find((i) => i.email === email && i.password === password);
      console.log(validateLogin, "validateeeeee");
      if (validateLogin) {
        dispatch(logar(validateLogin));
        alert("Você está logado, mas ao sair da página irá precisar fazer login novamente.");
      } else {
        alert("Email ou senha incorretos");
      }
      if (remember) {
        localStorage.setItem("userLogado", JSON.stringify({ email, password }));
        alert("Você está logado e escolheu a opção de permanecer logado. Você pode fechar a página e irá se manter lgoado.");
      }
    }
  }

  useEffect(() => {
    console.log("users existentes ", usersRedux);
    console.log("user logado ", userRedux);
  }, [usersRedux, userRedux]);

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
        {signup && <TextField sx={{ mt: 2, mb: 2 }} value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} label="Repeat password" type="password" required fullWidth />}

        {!signup && (
          <FormGroup sx={{ alignSelf: "flex-start" }}>
            <FormControlLabel control={<Checkbox onChange={(e) => setRemember(e.target.checked)} />} label="Remember-me" />
          </FormGroup>
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
