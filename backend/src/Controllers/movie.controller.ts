import { Request, Response } from "express";
import Movie from "../Schema/movieSchema";
import CustomError from "../Utils/CustomError";

const createMovie = async (req: Request, res: Response) => {
  const {
    title,
    description,
    duration,
    genre,
    language,
    releaseDate,
    certificate,
    posterUrl,
    trailerUrl,
    status,
    cast,
    director,
    ratings,
  } = req.body;

  if (
    !title ||
    !description ||
    !duration ||
    !genre ||
    !language ||
    !releaseDate
  ) {
    throw new CustomError("Please fill all required fields!", 400);
  }

  const movie = {
    title,
    description,
    duration,
    genre,
    language,
    releaseDate,
    certificate,
    posterUrl,
    trailerUrl,
    status,
    cast,
    director,
    ratings,
  };
  await Movie.create(movie);
  res.status(201).json({
    message: "Movie created successfully",
  });
};

export default { createMovie };
