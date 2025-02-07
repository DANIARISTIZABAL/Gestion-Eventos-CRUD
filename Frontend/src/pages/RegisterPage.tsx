import { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/register", { name, email, password });
      toast.success("Registro exitoso. Ahora puedes iniciar sesión.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error('Error al registrar usuario');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Registro</Typography>
      <TextField label="Nombre" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Correo" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Contraseña" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>Registrarse</Button>
      <ToastContainer />
    </Container>
  );
}

export default RegisterPage;
