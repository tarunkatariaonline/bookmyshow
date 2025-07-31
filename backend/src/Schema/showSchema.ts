import mongoose from "mongoose";
import { Schema } from "mongoose";
import { seatCategorySchema } from "./screenSchema";
const showSchema = new Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    cinema: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cinema",
      required: true,
    },
    screen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screen",
      required: true,
    },
    date: {
      type: String, // e.g., "2025-08-01"
      required: true,
    },
    time: {
      type: String, // e.g., "6:00 PM"
      required: true,
    },
    seatLayout: {
      type: [seatCategorySchema],
      required: true,
    },
    bookedSeats: {
      type: [String], // e.g., ["2A", "3B"]
      default: [],
    },
  },
  { timestamps: true }
);

const Show = mongoose.model("Show", showSchema);
export default Show;
