import mongoose from "mongoose";
const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // in minutes
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    certificate: {
      type: String, // e.g. "U", "UA", "A"
    },
    posterUrl: {
      type: String,
    },
    trailerUrl: {
      type: String,
    },
    cast: [
      {
        name: String,
        role: String,
      },
    ],
    director: {
      type: String,
    },
    ratings: {
      average: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
