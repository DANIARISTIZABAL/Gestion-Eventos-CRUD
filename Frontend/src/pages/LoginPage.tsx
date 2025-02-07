import { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
// import toast from "react-hot-toast";
import { toast, ToastContainer } from "react-toastify";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Por favor, ingresa un correo y contraseña");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      if (res?.data?.status === 400) {
        toast.error('Credenciales incorrectas. Por favor, verifica tu correo y contraseña e inténtalo de nuevo.')
      } else {
        login(res.data.token); // Guarda el token y actualiza el estado
        navigate("/evensts");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Error al iniciar sesión");
      } else {
        toast.error("Error en el servidor. Inténtalo más tarde.");
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4">Iniciar Sesión</Typography>
      <TextField label="Correo" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Contraseña" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>Ingresar</Button>
      <ToastContainer />
    </Container>
  );
}

export default LoginPage;
