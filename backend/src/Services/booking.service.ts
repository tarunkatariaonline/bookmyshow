import mongoose from "mongoose";
import Booking from "../Schema/booking.schema.js";
import Show from "../Schema/show.schema.js";
import { Request, Response } from "express";
import CustomError from "../Utils/CustomError.js";
import { ICreateBookingReq } from "../Types/booking.types.js";
import QRCode from "qrcode";
const createBooking = async ({
  showId,
  movie,
  cinema,
  screen,
  seatCategory,
  seats, // array of seat numbers
  totalPrice,
  user,
}: ICreateBookingReq) => {
  // 1. Get the show
  const show = await Show.findById(showId);
  if (!show) {
    throw new CustomError("Show doesn't found !", 404);
  }

  // 2. Check for already booked seats
  const alreadyBooked = seats.filter((seat) => show.bookedSeats.includes(seat));
  if (alreadyBooked.length > 0) {
    throw new CustomError("Seats are already books !", 403);
  }

  // 3. Add these seats to bookedSeats
  show.bookedSeats.push(...seats);
  await show.save();

  // 4. Create booking record
  const booking = new Booking({
    user,
    show: showId,
    movie,
    cinema,
    screen,
    seatCategory,
    seats,
    totalPrice,
    paymentStatus: "paid",
  });

  await booking.save();

  // 5. Commit transaction

  return booking;
};

const getBookingsByUser = async (userId: string) => {
  const bookings = await Booking.find({ user: userId })
    .populate("movie", "title poster language duration") // Only selected fields
    .populate("cinema", "name address")
    .populate("screen", "name")
    .populate("show", "date time")
    .populate("user", "name email")
    .sort({ createdAt: -1 }); // Latest first

  return {
    bookings,
  };
};

const getBookingById = async (bookingId: string) => {
  const booking = await Booking.findById(bookingId)
    .populate("movie", "title poster language duration")
    .populate("cinema", "name address")
    .populate("screen", "name")
    .populate("show", "date time")
    .populate("user", "name email");

  if (!booking) {
    throw new CustomError("Booking not found !", 404);
  }
  const ticketUrl = `${process.env.FRONTEND_URL}${booking._id}`;

  const qrPayload = {
    booking_id: booking._id,
    movie_title: (booking.movie as any).title,
    booked_by: (booking.user as any).name,
    screen_name: (booking.screen as any).name,
    seat_category: booking.seatCategory,
    seats: booking.seats,
    date: (booking.show as any).date,
    time: (booking.show as any).time,
    verify_url: ticketUrl,
  };
  const qrCodeImage = await QRCode.toDataURL(JSON.stringify(qrPayload));
  booking.qrCodeImage = qrCodeImage;
  return booking;
};
export default { createBooking, getBookingsByUser, getBookingById };
