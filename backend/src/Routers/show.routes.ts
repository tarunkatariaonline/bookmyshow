import express from "express";
import asyncHandler from "../Utils/asyncHandler";
import show from "../Controllers/show.controller";
const router = express.Router();

router.post(
  "/:movieId/:cinemaId/:screenId/create",
  asyncHandler(show.createShow)
);
router.post("/bulk/create", asyncHandler(show.createBulkShows));
router.get("/:showId", asyncHandler(show.getShowById));
router.get(
  "/:city/:cinemaId/:movieId/:date",
  asyncHandler(show.getShowsByCinemaMovieAndDate)
);

export default router;
