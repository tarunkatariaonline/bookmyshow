import mongoose from "mongoose";
const { Schema } = mongoose;

const seatCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["Gold", "Silver", "Platinum", "Recliner", "Sofa"], // add more if needed
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
  showTimings: [String],
  seatLayout: [seatCategorySchema], // ← it's now an array of objects
});

const cinemaSchema = new mongoose.Schema({
  name: String,
  location: {
    city: String,
    address: String,
    pincode: Number,
  },
  screens: [screenSchema],
});

const Cinema = mongoose.model("Cinema", cinemaSchema);
export default Cinema;
