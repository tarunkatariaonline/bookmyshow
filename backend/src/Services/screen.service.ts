import { Request, Response } from "express";
import Cinema from "../Schema/cinema.schema";
import CustomError from "../Utils/CustomError";
import Screen from "../Schema/screen.schema";
import { ICreateCinemaScreenReq } from "../Types/screen.types";

const createCinemaScreen = async ({
  name,
  cinemaId,
  seatLayout,
}: ICreateCinemaScreenReq) => {
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
};

export default { createCinemaScreen };
