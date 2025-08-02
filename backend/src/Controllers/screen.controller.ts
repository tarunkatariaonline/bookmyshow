import { Request, Response } from "express";
import Cinema from "../Schema/cinema.schema";
import CustomError from "../Utils/CustomError";
import Screen from "../Schema/screen.schema";

const createCinemaScreen = async (req: Request, res: Response) => {
  const cinemaId = req.params.cinemaId;
  const { name, seatLayout } = req.body;

  if (!cinemaId) {
    throw new CustomError("Cinema ID is required", 400);
  }

  if (!name || !seatLayout) {
    throw new CustomError("Screen name and seat layout are required", 400);
  }

  const cinema = await Cinema.findById(cinemaId);
  if (!cinema) {
    throw new CustomError("Cinema not found!", 404);
  }

  const screen = new Screen({
    name,
    seatLayout,
    cinema: cinemaId, // connect screen to cinema
  });

  await screen.save();

  res.status(201).json({
    message: "Screen added successfully",
  });
};

export default { createCinemaScreen };
