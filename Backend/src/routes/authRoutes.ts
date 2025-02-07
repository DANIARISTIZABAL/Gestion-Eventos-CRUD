import express, { Request, Response } from "express";
import { register, login } from "../controllers/authController";
import User from "../models/User";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = express.Router();
interface AuthRequest extends Request {
    user?: { id: string };
}

router.post("/register", async (req: Request, res: Response) => register(req, res));
router.post("/login", (req: Request, res: Response) => login(req, res));

export default router;
