import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExcitement extends Document {
  name: string;
  count: number;
  updatedAt: Date;
}

const ExcitementSchema = new Schema<IExcitement>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      default: "meetup_counter",
    },
    count: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Excitement: Model<IExcitement> =
  mongoose.models.Excitement ||
  mongoose.model<IExcitement>("Excitement", ExcitementSchema);

export default Excitement;
