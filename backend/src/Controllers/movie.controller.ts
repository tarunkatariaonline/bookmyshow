import { Request, Response } from "express";
import Movie from "../Schema/movieSchema";
import CustomError from "../Utils/CustomError";
import Show from "../Schema/showSchema";
function parseDateTime(dateStr: string, timeStr: string): Date {
  const [dd, mm, yyyy] = dateStr.split("-");
  const [time, period] = timeStr.split(" "); // "06:30", "AM"
  let [hours, minutes] = time.split(":").map(Number);

  if (period.toUpperCase() === "PM" && hours !== 12) hours += 12;
  if (period.toUpperCase() === "AM" && hours === 12) hours = 0;

  return new Date(
    `${yyyy}-${mm}-${dd}T${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:00`
  );
}

type PopulatedCinema = {
  location?: {
    city?: string;
  };
};

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

const getAvailableMoviesByCity = async (req: Request, res: Response) => {
  const city = req.params.city;

  if (!city) {
    throw new CustomError("City parameter is required", 400);
  }

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

  res.status(200).json({
    city,
    movies: uniqueMovies,
  });
};

export default { createMovie, getAvailableMoviesByCity };
