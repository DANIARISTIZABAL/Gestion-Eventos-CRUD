import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

function EditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/events/${id}`)
      .then(res => {
        setName(res.data.name);
        setDate(res.data.date);
        setTime(res.data.time);
        setLocation(res.data.location);
        setDescription(res.data.description);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleEditEvent = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("Debes iniciar sesión para editar un evento");
      navigate("/login");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/events/${id}`,
        { name, date, time, location, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.info("Evento editado con éxito");
      navigate("/evensts");
    } catch (error) {
      console.log(error)
      toast.info("Error al editar el evento");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Editar Evento</Typography>
      <TextField label="Nombre del Evento" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Fecha" type="date" fullWidth margin="normal" value={date} onChange={(e) => setDate(e.target.value)} />
      <TextField label="Hora" type="time" fullWidth margin="normal" value={time} onChange={(e) => setTime(e.target.value)} />
      <TextField label="Ubicación" fullWidth margin="normal" value={location} onChange={(e) => setLocation(e.target.value)} />
      <TextField label="Descripción" multiline rows={4} fullWidth margin="normal" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Button variant="contained" color="primary" fullWidth onClick={handleEditEvent}>Guardar Cambios</Button>
      <ToastContainer/>
    </Container>
  );
}

export default EditEventPage;
