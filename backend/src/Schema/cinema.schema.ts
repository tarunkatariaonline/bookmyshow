import mongoose from "mongoose";
const { Schema } = mongoose;

const cinemaSchema = new mongoose.Schema({
  name: String,
  location: {
    city: String,
    address: String,
    pincode: Number,
  },
  managers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  security: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

const Cinema = mongoose.model("Cinema", cinemaSchema);
export default Cinema;
