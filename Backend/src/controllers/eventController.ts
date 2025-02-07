import { Request, Response } from "express";
import Event from "../models/Event";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el evento" });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const events = await Event.find({ userId });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener eventos" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Evento eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el evento" });
  }
};

export const editEvent = async (req: Request, res: Response) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, req?.body);
    res.json({ message: "Evento editado" });
  } catch (error) {
    res.status(500).json({ message: "Error al editar el evento" });
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const result = await Event.findById(req.params.id);
    res.json(result);
  }catch (error){
    res.status(500).json({ message: "Error al obtener el evento" });
  }
}