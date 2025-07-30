import express, { Request, Response } from "express";
import asyncHandler from "../Utils/asyncHandler";
import cinema from "../Controllers/cinema.controller";
const router = express.Router();

router.post("/create", asyncHandler(cinema.createCinema));
router.post("/:id/screens", asyncHandler(cinema.addCinemaScreen));

export default router;
