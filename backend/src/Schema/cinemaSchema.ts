import mongoose from "mongoose";
const { Schema } = mongoose;

const cinemaSchema = new mongoose.Schema({
  name: String,
  location: {
    city: String,
    address: String,
    pincode: Number,
  },
});

const Cinema = mongoose.model("Cinema", cinemaSchema);
export default Cinema;
