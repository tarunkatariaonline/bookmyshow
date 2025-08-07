import Cinema from "../Schema/cinema.schema";
import { ICinemaCreateReq } from "../Types/cinema.types";

const createCinema = async (cinema: ICinemaCreateReq): Promise<any> => {
  await Cinema.create(cinema);
};
export default { createCinema };
