import { Request, Response } from "express";
import Movie from "../Schema/movie.schema";
import CustomError from "../Utils/CustomError";
import Show from "../Schema/show.schema";
import { parseDateTime, getDayName } from "../Utils/dateUtils";
import { ICreateMovieReq } from "../Types/movie.types";
type PopulatedCinema = {
  location?: {
    city?: string;
  };
};

const createMovie = async (movie: ICreateMovieReq): Promise<any> => {
  await Movie.create(movie);
};

const getAvailableMoviesByCity = async (city: string): Promise<any> => {
  const now = new Date();

  const shows = await Show.find()
    .populate("movie")
    .populate({
      path: "cinema",
      select: "location",
    })
    .select("movie cinema date time")
    .lean();

  const filteredShows = shows.filter((show) => {
    const showCity = (
      show.cinema as PopulatedCinema
    )?.location?.city?.toLowerCase();
    const showDateTime = parseDateTime(show.date, show.time);

    return showCity === city.toLowerCase() && showDateTime > now;
  });
  const uniqueMoviesMap = new Map();

  filteredShows.forEach((show) => {
    const movie = show.movie;
    if (!uniqueMoviesMap.has(movie._id.toString())) {
      uniqueMoviesMap.set(movie._id.toString(), movie);
    }
  });

  const uniqueMovies = Array.from(uniqueMoviesMap.values());
  return uniqueMovies;
};

const getUpcomingDatesForMovies = async (city: string, movieId: any) => {
  const movie = await Movie.findById(movieId).lean();
  if (!movie) {
    throw new CustomError("Movie not found", 404);
  }

  const shows = await Show.find({ movie: movieId })
    .populate({
      path: "cinema",
      select: "location",
    })
    .select("date time cinema")
    .lean();

  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + 7);

  const uniqueDates = new Set<string>();

  for (const show of shows) {
    const showCity = (show.cinema as any)?.location?.city?.toLowerCase();
    const showDateStr = show.date;
    const showTimeStr = show.time;

    if (!showDateStr || !showTimeStr || showCity !== city.toLowerCase())
      continue;

    const [dd, mm, yyyy] = showDateStr.split("-");
    const showDate = new Date(`${yyyy}-${mm}-${dd}`);

    if (showDate < today || showDate > endDate) continue;

    const isToday =
      showDate.getDate() === today.getDate() &&
      showDate.getMonth() === today.getMonth() &&
      showDate.getFullYear() === today.getFullYear();

    if (isToday) {
      const [timePart, modifier] = showTimeStr.split(" ");
      let [hours, minutes] = timePart.split(":").map(Number);
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const showDateTime = new Date(showDate);
      showDateTime.setHours(hours, minutes, 0);

      if (showDateTime <= today) continue;
    }

    uniqueDates.add(showDateStr);
  }

  // Convert to array with day names
  const sortedDateObjects = Array.from(uniqueDates)
    .sort((a, b) => {
      const [d1, m1, y1] = a.split("-").map(Number);
      const [d2, m2, y2] = b.split("-").map(Number);
      return (
        new Date(y1, m1 - 1, d1).getTime() - new Date(y2, m2 - 1, d2).getTime()
      );
    })
    .map((dateStr) => ({
      date: dateStr,
      day: getDayName(dateStr),
    }));

  return {
    movie,
    sortedDateObjects,
  };
};

const getCinemasForMovieByDate = async (
  city: string,
  movieId: string,
  date: string
) => {
  const movie = await Movie.findById(movieId).lean();
  if (!movie) {
    throw new CustomError("Movie not found", 404);
  }

  const shows = await Show.find({ movie: movieId, date })
    .populate({
      path: "cinema",
      select: "name location",
    })
    .populate({
      path: "screen",
      select: "name",
    })
    .select("cinema screen date time")
    .lean();

  const filteredShows = shows.filter(
    (show) =>
      (show.cinema as any)?.location?.city?.toLowerCase() === city.toLowerCase()
  );

  const cinemaMap = new Map<
    string,
    {
      name: string;
      _id: string;
      location: {
        city: string;
        address: string;
        pincode: number;
      };
      shows: {
        _id: string;
        time: string;
        screen_id: string;
        screen: string;
      }[];
    }
  >();

  for (const show of filteredShows) {
    const cinema = show.cinema as any;
    const cinemaId = cinema._id.toString();

    if (!cinemaMap.has(cinemaId)) {
      cinemaMap.set(cinemaId, {
        name: cinema.name,
        _id: cinema._id,
        location: cinema.location,
        shows: [],
      });
    }

    cinemaMap.get(cinemaId)!.shows.push({
      _id: show._id.toString(),
      time: show.time,
      screen_id: (show.screen as any)?._id,
      screen: (show.screen as any)?.name || "Unknown Screen",
    });
  }

  const cinemaList = Array.from(cinemaMap.values());
  return cinemaList;
};

const getMoviesList = async () => {
  const movies = await Movie.find({}, "");
  return movies;
};
export default {
  createMovie,
  getAvailableMoviesByCity,
  getUpcomingDatesForMovies,
  getCinemasForMovieByDate,
  getMoviesList,
};
