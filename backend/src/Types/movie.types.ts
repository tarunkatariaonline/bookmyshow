interface ICreateMovieReq {
  title: string;
  description: string;
  duration: number; // in minutes, for example
  genre: string[];
  language: string;
  releaseDate: string; // ISO format (e.g., "2025-08-07")
  certificate: string; // e.g., "U/A", "A", etc.
  posterUrl: string;
  trailerUrl: string;
  status: string; // or customize as per your app
  cast: any; // list of actor names
  director: string;
}

export { ICreateMovieReq };
