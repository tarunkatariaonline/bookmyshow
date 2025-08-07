import { Request, Response } from "express";
import Screen from "../Schema/screen.schema";
import CustomError from "../Utils/CustomError";
import Show from "../Schema/show.schema";
import Movie from "../Schema/movie.schema";
import { getDayName } from "../Utils/dateUtils";
import showService from "../Services/show.service";

const createShow = async (req: Request, res: Response) => {
  const cinemaId = req.params.cinemaId;
  const screenId = req.params.screenId;
  const movieId = req.params.movieId;
  const date = req.body.date;
  const time = req.body.time;

  if (!cinemaId || !movieId || !screenId || !date || !time) {
    throw new CustomError("Fill all details", 400);
  }

  await showService.createShow({ movieId, cinemaId, screenId, date, time });
  res.status(200).json({
    message: "Show created successfully",
  });
};

const getShowById = async (req: Request, res: Response) => {
  const { showId } = req.params;

  if (!showId) {
    throw new CustomError("Show ID is required", 400);
  }

  const show = await showService.getShowById(showId);
  res.status(200).json(show);
};

const getShowsByCinemaMovieAndDate = async (req: Request, res: Response) => {
  const { city, cinemaId, movieId, date } = req.params;

  if (!city || !cinemaId || !movieId || !date) {
    throw new CustomError(
      "City, Cinema ID, Movie ID, and Date are required",
      400
    );
  }

  const { movie, day, showList } =
    await showService.getShowsByCinemaMovieAndDate({
      movieId,
      cinemaId,
      date,
      city,
    });
  res.status(200).json({
    movie,
    date,
    day,
    shows: showList,
  });
};

export default { createShow, getShowById, getShowsByCinemaMovieAndDate };
