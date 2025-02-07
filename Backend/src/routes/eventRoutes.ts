import express from "express";
import { createEvent, getEvents, deleteEvent, editEvent, getEvent } from "../controllers/eventController";

const router = express.Router();
router.post("/create/event", createEvent);
router.get("/get/events/:userId", getEvents);
router.delete("/delete/event/:id", deleteEvent);
router.get("/api/events/:id", getEvent);
router.put("/api/events/:id", editEvent);


export default router;