import { Request, Response } from "express";
import Cinema from "../Schema/cinema.schema";
import CustomError from "../Utils/CustomError";
import Screen from "../Schema/screen.schema";
import screenService from "../Services/screen.service";

const createCinemaScreen = async (req: Request, res: Response) => {
  const cinemaId = req.params.cinemaId;
  const { name, seatLayout, timings } = req.body;

  if (!cinemaId) {
    throw new CustomError("Cinema ID is required", 400);
  }

  if (!name || !seatLayout) {
    throw new CustomError("Screen name and seat layout are required", 400);
  }

  await screenService.createCinemaScreen({
    name,
    cinemaId,
    seatLayout,
    timings,
  });

  res.status(201).json({
    message: "Screen added successfully",
  });
};

const getScreenList = async (req: Request, res: Response) => {
  const { cinemaId } = req.params;

  const screenList = await screenService.getScreenList(cinemaId);

  res.status(200).json({
    message: "Screen list Fetched Successfully !",
    screenList,
    count: screenList.length,
  });
};

export default { createCinemaScreen, getScreenList };
