import { Request, Response } from "express";
import Screen from "../Schema/screenSchema";
import CustomError from "../Utils/CustomError";
import Show from "../Schema/showSchema";
import Movie from "../Schema/movieSchema";
const getDayName = (dateStr: string) => {
  const [dd, mm, yyyy] = dateStr.split("-");
  const date = new Date(`${yyyy}-${mm}-${dd}`);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

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

const getUpcomingDatesForShows = async (req: Request, res: Response) => {
  try {
    const { city, movieId } = req.params;

    if (!city || !movieId) {
      throw new CustomError("City and Movie ID are required", 400);
    }

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
          new Date(y1, m1 - 1, d1).getTime() -
          new Date(y2, m2 - 1, d2).getTime()
        );
      })
      .map((dateStr) => ({
        date: dateStr,
        day: getDayName(dateStr),
      }));

    res.status(200).json({
      movie,
      upcomingDates: sortedDateObjects,
    });
  } catch (error: any) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      message: error.message || "Failed to fetch upcoming dates",
    });
  }
};

export default { createShow };
