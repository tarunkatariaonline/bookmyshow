import express, { Request, Response } from "express";
import asyncHandler from "../Utils/asyncHandler";
import userAuth from "../Middlewares/userAuth";
import movie from "../Controllers/movie.controller";
const router = express.Router();

router.post("/create", asyncHandler(movie.createMovie));

export default router;
