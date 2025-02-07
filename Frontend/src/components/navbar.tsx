import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { logout } = useAuth();
  const isAuthenticated = !!localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976D2", padding: "10px" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
            Gestión de Eventos
          </Link>
        </Typography>

        {isAuthenticated ? (
          <Box>
            <Button color="inherit" onClick={() => navigate("/create-event")} sx={{ marginRight: 2 }}>
              Crear Evento
            </Button>
            <Button color="inherit" onClick={() => { logout(); navigate("/login"); }}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" onClick={() => navigate("/login")} sx={{ marginRight: 2 }}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/register")}>
              Registro
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
