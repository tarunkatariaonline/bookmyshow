import { Request, Response } from "express";
import Screen from "../Schema/screenSchema";
import CustomError from "../Utils/CustomError";
import Show from "../Schema/showSchema";
import Movie from "../Schema/movieSchema";
import { getDayName } from "../Utils/helpers";

const createShow = async (req: Request, res: Response) => {
  const cinemaId = req.params.cinemaId;
  const screenId = req.params.screenId;
  const movieId = req.params.movieId;
  const date = req.body.date;
  const time = req.body.time;

  if (!cinemaId || !movieId || !screenId || !date || !time) {
    throw new CustomError("Fill all details", 400);
  }
  const screen = await Screen.findById(screenId);
  if (!screen) {
    throw new CustomError("Screen not found", 404);
  }
  const show = new Show({
    movie: movieId,
    cinema: cinemaId,
    screen: screenId,
    date: date,
    time: time,
    seatLayout: screen.seatLayout,
  });
  await show.save();
  res.status(200).json({
    message: "Show created successfully",
  });
};

export const getShowById = async (req: Request, res: Response) => {
  const { showId } = req.params;

  if (!showId) {
    throw new CustomError("Show ID is required", 400);
  }

  const show = await Show.findById(showId)
    .populate("movie")
    .populate("cinema")
    .populate("screen")
    .lean();

  if (!show) {
    throw new CustomError("Show not found", 404);
  }

  res.status(200).json(show);
};

export const getShowsByCinemaMovieAndDate = async (
  req: Request,
  res: Response
) => {
  const { city, cinemaId, movieId, date } = req.params;

  if (!city || !cinemaId || !movieId || !date) {
    throw new CustomError(
      "City, Cinema ID, Movie ID, and Date are required",
      400
    );
  }

  const movie = await Movie.findById(movieId).lean();
  if (!movie) {
    throw new CustomError("Movie not found", 404);
  }

  const shows = await Show.find({ cinema: cinemaId, movie: movieId, date })
    .populate({
      path: "cinema",
      select: "location",
    })
    .populate({
      path: "screen",
      select: "name",
    })
    .select("time screen cinema")
    .lean();

  const filteredShows = shows.filter(
    (show) =>
      (show.cinema as any)?.location?.city?.toLowerCase() === city.toLowerCase()
  );

  if (filteredShows.length === 0) {
    throw new CustomError(
      "No shows found for this movie in this city/cinema on this date",
      404
    );
  }

  const showList = filteredShows.map((show) => ({
    id: show._id.toString(),
    time: show.time,
    screen: (show.screen as any)?.name || "Unknown Screen",
  }));

  const day = getDayName(date);

  res.status(200).json({
    movie,
    date,
    day,
    shows: showList,
  });
};

export default { createShow, getShowById, getShowsByCinemaMovieAndDate };
