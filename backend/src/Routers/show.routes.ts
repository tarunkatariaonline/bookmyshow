import express, { Request, Response } from "express";
import asyncHandler from "../Utils/asyncHandler";
import show from "../Controllers/show.controller";
const router = express.Router();

router.post(
  "/:movieId/:cinemaId/:screenId/create",
  asyncHandler(show.createShow)
);

export default router;
