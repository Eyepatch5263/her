import mongoose, { Schema, Document, Model } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  date: string;
  signature: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    date: {
      type: String,
      default: () =>
        new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    },
    signature: {
      type: String,
      default: "Written with love",
    },
  },
  {
    timestamps: true,
  }
);

const Note: Model<INote> =
  mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);

export default Note;
