import mongoose, { Model, Schema } from "mongoose";
import { Entry } from "@/interfaces";

interface IEntry extends Entry {}

const entrySchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished"],
      message: "{VALUE}, no es permitido",
    },
  },
});

// generamos el modelo en mongo, antes preguntamos si ya existem sino lo creamos con el nombre Entry con la estructura de entrySchema
const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model("Entry", entrySchema)

export default EntryModel