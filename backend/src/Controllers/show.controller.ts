import { Request, Response } from "express";
import Screen from "../Schema/screenSchema";
import CustomError from "../Utils/CustomError";
import Show from "../Schema/showSchema";

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

export default { createShow };
