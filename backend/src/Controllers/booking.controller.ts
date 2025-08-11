import mongoose from "mongoose";
import Booking from "../Schema/booking.schema.js";
import Show from "../Schema/show.schema.js";
import { Request, Response } from "express";
import bookingService from "../Services/booking.service.js";
import CustomError from "../Utils/CustomError.js";

import QRCode from "qrcode";
import PDFDocument from "pdfkit";

const createBooking = async (req: Request, res: Response) => {
  const {
    showId,
    movie,
    cinema,
    screen,
    seatCategory,
    seats, // array of seat numbers
    totalPrice,
  } = req.body;

  const user = "67c2d6b2093c1a7f19cac055"; // req.user aayga vais

  // 1. Get the show
  const booking = await bookingService.createBooking({
    showId,
    movie,
    cinema,
    screen,
    seats,
    seatCategory,
    totalPrice,
    user,
  });
  res.status(201).json({
    success: true,
    message: "Booking created successfully",
    booking,
  });
};

const getBookingsByUser = async (req: Request, res: Response) => {
  const userId = "67c2d6b2093c1a7f19cac055";

  const { bookings } = await bookingService.getBookingsByUser(userId);

  res.status(200).json({
    success: true,
    count: bookings.length,
    bookings,
  });
};

const getBookingById = async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  const booking = await bookingService.getBookingById(bookingId);
  res.status(200).json({
    success: true,
    booking,
  });
};

const downloadTicket = async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  await bookingService.downloadTicket(bookingId, res);
};

export default {
  createBooking,
  getBookingsByUser,
  getBookingById,
  downloadTicket,
};
