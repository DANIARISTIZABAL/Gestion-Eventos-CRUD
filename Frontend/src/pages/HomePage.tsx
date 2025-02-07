import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, Button, Grid, TextField, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EventIcon from "@mui/icons-material/Event";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { toast, ToastContainer } from "react-toastify";

interface Event {
  _id: string;
  name: string;
  date: string;
  location: string;
}

function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const r = axios.get("http://localhost:5000/user/auth", {
        headers: { Authorization: token }
      })
      .then(res => setUserId(res.data._id))
      .catch(err => console.error(err));
      console.log({r})
      // navigate("/evensts");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/get/events/${userId}`)
        .then(res => setEvents(res.data))
        .catch(err => console.error(err));
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
    }
  }, [userId]);
  const deleteEvent = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/delete/event/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(events.filter(event => event._id !== id));
      toast.dismiss();
      toast.success("Evento eliminado con éxito");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el evento");
    }
  }
  const handleDelete = async (id: string) => {
    toast.dismiss();
    toast.info(
      <div>
        <p>¿Estás seguro de eliminar este evento?</p>
        <button 
          onClick={() => {
            deleteEvent(id);
            toast.dismiss();
          }}
          style={{
            border: "none",
            marginRight: "10px",
            cursor: "pointer",
            fontSize: "16px",
            background: "white",
          }}
        >
          <CheckCircleRoundedIcon fontSize="large" style={{ color: "green" }}/>
        </button>
        <button
          onClick={() => toast.dismiss()} // Cerrar el toast
          style={{
            border: "none",
            cursor: "pointer",
            fontSize: "30px",
            background: "white",
          }}
        >
          <CancelRoundedIcon fontSize="large" style={{ color: "red" }}/>
        </button>
      </div>,
      {
        autoClose: false, // No se cierra automáticamente
        closeOnClick: false, // No se cierra al hacer clic
        hideProgressBar: false, // Sin barra de progreso
        pauseOnHover: true, // Pausa si el ratón está encima
      }
    );
    
  };

  // Filtrar eventos según el término de búsqueda
  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ marginTop: "20px" }}>
        Eventos Disponibles
      </Typography>

      {/* Barra de Búsqueda */}
      <TextField
        label="Buscar eventos"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "20px", marginTop: "20px" }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isAuthenticated && (
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ display: "block", margin: "auto", marginBottom: "20px" }}
          onClick={() => navigate("/create-event")}
        >
          Crear Evento
        </Button>
      )}

      <Grid container spacing={3}>
        {isLoading ? <CircularProgress sx={{ marginLeft: "49%", marginTop: "50px" }}/> :
        filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card className="card">
                <CardContent>
                  <Typography variant="h5" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <EventIcon /> {event.name}
                  </Typography>
                  <Typography color="textSecondary">{event.date} - {event.location}</Typography>
                  {isAuthenticated && (
                    <div style={{ marginTop: "10px" }}>
                      <Button 
                        variant="contained" 
                        color="secondary" 
                        startIcon={<EditIcon />}
                        onClick={() => navigate(`/edit-event/${event._id}`)}
                        sx={{ marginRight: "10px" }}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="contained" 
                        color="error" 
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(event._id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" sx={{ marginTop: "20px" }}>
            No se encontraron eventos.
          </Typography>
        )}
      </Grid>
      <ToastContainer />
    </Container>
  );
}

export default HomePage;