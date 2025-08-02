import { Request, Response } from "express";
import Cinema from "../Schema/cinema.schema";
import CustomError from "../Utils/CustomError";

const createCinema = async (req: Request, res: Response) => {
  const cinema = req.body;
  await Cinema.create(cinema);
  res.status(201).json({
    message: "Cinema created successfully",
  });
};

export default { createCinema };
