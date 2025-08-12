import express, { Request, Response } from "express";
import asyncHandler from "../Utils/asyncHandler";
import cinema from "../Controllers/cinema.controller";
const router = express.Router();

router.post("/create", asyncHandler(cinema.createCinema));
router.get("/list", asyncHandler(cinema.getCinemaList));

export default router;
