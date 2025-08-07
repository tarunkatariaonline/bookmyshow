import { Request, Response } from "express";
import Movie from "../Schema/movie.schema";
import CustomError from "../Utils/CustomError";
import Show from "../Schema/show.schema";
import { parseDateTime, getDayName } from "../Utils/dateUtils";
import movieService from "../Services/movie.service";

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
  };
  await movieService.createMovie(movie);
  res.status(201).json({
    message: "Movie created successfully",
  });
};

const getAvailableMoviesByCity = async (req: Request, res: Response) => {
  const city = req.params.city;

  if (!city) {
    throw new CustomError("City parameter is required", 400);
  }

  const uniqueMovies = await movieService.getAvailableMoviesByCity(city);
  res.status(200).json({
    city,
    movies: uniqueMovies,
  });
};

const getUpcomingDatesForMovies = async (req: Request, res: Response) => {
  const { city, movieId } = req.params;

  if (!city || !movieId) {
    throw new CustomError("City and Movie ID are required", 400);
  }
  const { movie, sortedDateObjects } =
    await movieService.getUpcomingDatesForMovies(city, movieId);

  res.status(200).json({
    movie,
    upcomingDates: sortedDateObjects,
  });
};

const getCinemasForMovieByDate = async (req: Request, res: Response) => {
  const { city, movieId, date } = req.params;

  if (!city || !movieId || !date) {
    throw new CustomError("City, Movie ID, and Date are required", 400);
  }

  const cinemaList = await movieService.getCinemasForMovieByDate(
    city,
    movieId,
    date
  );

  res.status(200).json({
    movieId,
    cinemas: cinemaList,
  });
};

export default {
  createMovie,
  getAvailableMoviesByCity,
  getUpcomingDatesForMovies,
  getCinemasForMovieByDate,
};
