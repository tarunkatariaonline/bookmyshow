interface ICreateShowReq {
  movieId: string;
  cinemaId: string;
  screenId: string;
  date: string;
  time: string[];
}

interface IGetShowsByCinemaMovieAndDateReq {
  movieId: string;
  cinemaId: string;
  date: string;
  city: string;
}
export { ICreateShowReq, IGetShowsByCinemaMovieAndDateReq };
