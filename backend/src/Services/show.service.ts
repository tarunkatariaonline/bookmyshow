import { Request, Response } from "express";
import Screen from "../Schema/screen.schema";
import CustomError from "../Utils/CustomError";
import Show from "../Schema/show.schema";
import Movie from "../Schema/movie.schema";
import { getDayName } from "../Utils/dateUtils";
import {
  ICreateShowReq,
  IGetShowsByCinemaMovieAndDateReq,
} from "../Types/show.types";
import { timeLog } from "console";
import Cinema from "../Schema/cinema.schema";

const createShow = async ({
  movieId,
  cinemaId,
  screenId,
  date,
  time,
}: ICreateShowReq): Promise<any> => {
  const screen = await Screen.findById(screenId);
  if (!screen) {
    throw new CustomError("Screen not found", 404);
  }

  for (let i = 0; i < time.length; i++) {
    const show = new Show({
      movie: movieId,
      cinema: cinemaId,
      screen: screenId,
      date: date,
      time: time[i],
      seatLayout: screen.seatLayout,
    });
    await show.save();
  }
};

const getShowById = async (showId: string) => {
  const show = await Show.findById(showId)
    .populate("movie")
    .populate("cinema")
    .populate("screen")
    .lean();

  if (!show) {
    throw new CustomError("Show not found", 404);
  }
  return show;
};

const getShowsByCinemaMovieAndDate = async ({
  movieId,
  cinemaId,
  date,
  city,
}: IGetShowsByCinemaMovieAndDateReq) => {
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

  return {
    movie,
    day,
    showList,
  };
};

const createBulkShows = async ({ date, movieId, user_id }) => {
  const cinemas = await Cinema.find({ managers: user_id });
  for (let i = 0; i < cinemas.length; i++) {
    const cinemaId = cinemas[i].id;
    const screens = await Screen.find({ cinema: cinemaId });
    for (let i = 0; i < screens.length; i++) {
      const screenId = screens[i].id;
      const time = ["06:15 PM", "09:15 PM", "12:15 PM", "3:15 PM"];
      await createShow({ movieId, time, cinemaId, screenId, date });
    }
  }
};
export default {
  createShow,
  getShowById,
  getShowsByCinemaMovieAndDate,
  createBulkShows,
};
