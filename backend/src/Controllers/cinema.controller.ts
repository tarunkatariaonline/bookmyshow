import { Request, Response } from "express";
import Cinema from "../Schema/cinema.schema";
import { ICinemaCreateReq } from "../Types/cinema.types";
import cinemaService from "../Services/cinema.service";

const createCinema = async (req: Request, res: Response) => {
  const cinema = req.body as ICinemaCreateReq;
  await cinemaService.createCinema(cinema);
  res.status(201).json({
    message: "Cinema created successfully",
  });
};

export default { createCinema };
