import { Request, Response } from "express";
import Cinema from "../Schema/cinemaSchema";
import CustomError from "../Utils/CustomError";

const createCinema = async (req: Request, res: Response) => {
  const cinema = req.body;
  await Cinema.create(cinema);
  res.status(201).json({
    message: "Cinema created successfully",
  });
};

const addCinemaScreen = async (req: Request, res: Response) => {
  const cinemaId = req.params.id;
  const newScreen = req.body;
  if (!cinemaId) {
    throw new CustomError("Cinema ID is required", 400);
  }
  if (!newScreen) {
    throw new CustomError("Screen details are required", 400);
  }
  const cinema = await Cinema.findById(cinemaId);

  if (!cinema) {
    throw new CustomError("Cinema not found !", 404);
  }

  cinema.screens.push(newScreen);
  await cinema.save();

  res.status(200).json({ message: "Screen added successfully" });
};

export default { createCinema, addCinemaScreen };
