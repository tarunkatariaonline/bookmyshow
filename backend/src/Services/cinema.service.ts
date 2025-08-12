import mongoose from "mongoose";
import Cinema from "../Schema/cinema.schema";
import { ICinemaCreateReq } from "../Types/cinema.types";

const createCinema = async (cinema: ICinemaCreateReq): Promise<any> => {
  await Cinema.create(cinema);
};

const getCinemaList = async (userId: any) => {
  const cinemas = await Cinema.find({
    managers: userId, // will now match correctly in the array
  }).lean();

  return cinemas;
};
export default { createCinema, getCinemaList };
