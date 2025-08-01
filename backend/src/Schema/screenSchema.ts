import mongoose from "mongoose";
const { Schema } = mongoose;

export const seatCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["Gold", "Silver", "Diamond", "Platinum", "Recliner", "Sofa"], // add more if needed
    },
    price: {
      type: Number,
      required: true,
    },
    seats: {
      type: [[mongoose.Schema.Types.Mixed]], // 2D grid: seat labels or null
      required: true,
    },
  },
  { _id: false }
);

const screenSchema = new mongoose.Schema({
  name: String,
  seatLayout: [seatCategorySchema], // ← it's now an array of objects
  cinema: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cinema",
    required: true,
  },
});

const Screen = mongoose.model("Screen", screenSchema);
export default Screen;
