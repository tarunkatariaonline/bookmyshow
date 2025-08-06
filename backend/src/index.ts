import express, { NextFunction, Request, Response } from "express";
import "./Config/db.config";
import user from "./Routers/user.routes";
import movie from "./Routers/movie.routes";
import cinema from "./Routers/cinema.routes";
import screen from "./Routers/screen.routes";
import show from "./Routers/show.routes";
import bodyParser from "body-parser";
const app = express();
import dotenv from "dotenv";
import errorHandler from "./Middlewares/errorHandler.middleware";
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

app.use("/api/v1/user", user);
app.use("/api/v1/movies", movie);
app.use("/api/v1/cinemas", cinema);
app.use("/api/v1/screens", screen);
app.use("/api/v1/shows", show);

app.use("/", errorHandler);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
