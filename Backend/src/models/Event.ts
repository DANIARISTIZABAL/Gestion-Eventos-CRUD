import { Schema, model } from "mongoose";

interface IEvent {
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  userId: string;
}

const eventSchema = new Schema<IEvent>({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true},
});

export default model<IEvent>("Event", eventSchema);