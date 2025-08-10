import express, { Request, Response } from "express";
import asyncHandler from "../Utils/asyncHandler";
import booking from "../Controllers/booking.controller";
const router = express.Router();

router.post("/create", asyncHandler(booking.createBooking));
router.get("/mybookings", asyncHandler(booking.getBookingsByUser));
router.get("/:bookingId", asyncHandler(booking.getBookingById));
export default router;
