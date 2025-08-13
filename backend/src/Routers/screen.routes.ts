import express, { Request, Response } from "express";
import asyncHandler from "../Utils/asyncHandler";
import screen from "../Controllers/screen.controller";
const router = express.Router();

router.post("/:cinemaId/create", asyncHandler(screen.createCinemaScreen));
router.get("/:cinemaId/list", asyncHandler(screen.getScreenList));

export default router;
