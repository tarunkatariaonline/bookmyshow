import { Request, Response } from "express";
import Cinema from "../Schema/cinema.schema";
import { ICinemaCreateReq } from "../Types/cinema.types";
import cinemaService from "../Services/cinema.service";

const createCinema = async (req: Request, res: Response) => {
  const cinema = req.body;
  const user = "67c2d6b2093c1a7f19cac055"; //req.user._id ;
  cinema.managers = [user];
  cinema.security = [user];
  await cinemaService.createCinema(cinema);
  res.status(201).json({
    message: "Cinema created successfully",
  });
};

const getCinemaList = async (req: Request, res: Response) => {
  const user = "67c2d6b2093c1a7f19cac055";
  const cinemas = await cinemaService.getCinemaList(user);
  res.json({
    cinemas,
    count: cinemas.length,
    message: "Cinemas Fetched Successfully .",
  });
};

export default { createCinema, getCinemaList };
