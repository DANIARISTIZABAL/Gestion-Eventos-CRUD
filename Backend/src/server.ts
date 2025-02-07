import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { login, register } from "./controllers/authController";
import { createEvent, deleteEvent, editEvent, getEvent, getEvents } from "./controllers/eventController";
import { authenticateToken } from "./middlewares/authenticateToken";
import User from "./models/User";

interface AuthRequest extends Request {
    user?: { id: string };
}

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());
app.use(express.json());

// Ruta para la página principal (raíz)
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando correctamente!");
});
app.get("/user/auth", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user.id).select("_id");
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Error obteniendo usuario" });
    }
});
app.post("/register", register);
app.post("/login", login);
app.post("/create/event", createEvent);
app.get("/get/events/:userId", getEvents);
app.delete("/delete/event/:id", deleteEvent);
app.get("/api/events/:id", getEvent);
app.put("/api/events/:id", editEvent);


// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("✅ MongoDB Conectado"))
  .catch((err) => console.error("❌ Error al conectar MongoDB:", err));

app.listen(5000, () => console.log("🚀 Servidor corriendo en puerto 5000"));