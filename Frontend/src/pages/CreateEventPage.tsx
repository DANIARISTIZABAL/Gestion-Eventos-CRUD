import { useEffect, useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function CreateEventPage() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("http://localhost:5000/user/auth", {
        headers: { Authorization: token }
      })
      .then(res => setUserId(res.data._id))
      .catch(err => console.error(err));
    }
  }, []);

  const handleCreateEvent = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("Debes iniciar sesión para crear un evento");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/create/event",
        { name, date, time, location, description, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.dismiss();
      toast.success("Evento creado con éxito");
      setTimeout(() => {
        navigate("/evensts"); // Redirige después del tiempo especificado
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Error al crear el evento");
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper sx={{ padding: "20px", marginTop: "20px", boxShadow: 3 }}>
        <Typography variant="h4" align="center">Crear Evento</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
          <TextField label="Nombre" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Fecha" type="date" fullWidth value={date} onChange={(e) => setDate(e.target.value)} />
          <TextField label="Hora" type="time" fullWidth value={time} onChange={(e) => setTime(e.target.value)} />
          <TextField label="Ubicación" fullWidth value={location} onChange={(e) => setLocation(e.target.value)} />
          <TextField label="Descripción" multiline rows={3} fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />
          <Button variant="contained" color="primary" onClick={handleCreateEvent}>Crear Evento</Button>
        </Box>
      </Paper>
      <ToastContainer />
    </Container>
  );
}

export default CreateEventPage;
