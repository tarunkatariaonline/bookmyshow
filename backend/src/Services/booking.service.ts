import mongoose from "mongoose";
import Booking from "../Schema/booking.schema.js";
import Show from "../Schema/show.schema.js";
import { Request, Response } from "express";
import CustomError from "../Utils/CustomError.js";
import { ICreateBookingReq } from "../Types/booking.types.js";
import QRCode from "qrcode";
import PDFDocument from "pdfkit";
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
    movie: (booking.movie as any).title,
    booked_by: (booking.user as any).name,
    screen: (booking.screen as any).name,
    category: booking.seatCategory,
    seats: booking.seats,
    date: (booking.show as any).date,
    time: (booking.show as any).time,
    verify_ticket: ticketUrl,
  };
  const qrCodeImage = await QRCode.toDataURL(JSON.stringify(qrPayload));
  booking.qrCodeImage = qrCodeImage;
  return booking;
};

const downloadTicket = async (bookingId: string, res: Response) => {
  // 1. Fetch booking
  const booking = await Booking.findById(bookingId)
    .populate("user", "name email")
    .populate("movie", "title duration")
    .populate("cinema", "name address")
    .populate("show", "date time")
    .populate("screen", "name");

  if (!booking) {
    throw new CustomError("Booking not found !", 404);
  }

  // 2. QR Code
  const ticketUrl = `${process.env.FRONTEND_URL}${booking._id}`;

  const qrPayload = {
    booking_id: booking._id,
    movie: (booking.movie as any).title,
    booked_by: (booking.user as any).name,
    screen: (booking.screen as any).name,
    category: booking.seatCategory,
    seats: booking.seats,
    date: (booking.show as any).date,
    time: (booking.show as any).time,
    verify_ticket: ticketUrl,
  };
  const qrDataURL = await QRCode.toDataURL(JSON.stringify(qrPayload));

  // 3. PDF setup
  const doc = new PDFDocument({ margin: 40 });
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="ticket-${booking._id}.pdf"`
  );
  res.setHeader("Content-Type", "application/pdf");
  doc.pipe(res);

  // 🎟️ Ticket Header
  doc
    .fontSize(26)
    .fillColor("#ff4d4d")
    .font("Helvetica-Bold")
    .text("Movie Ticket", { align: "center" })
    .moveDown(0.5);

  doc
    .fontSize(12)
    .fillColor("#555")
    .text(
      "Please bring this ticket or show the QR code at the cinema entrance.",
      {
        align: "center",
      }
    );

  doc.moveDown(1);

  // Draw a separator
  doc.moveTo(40, doc.y).lineTo(550, doc.y).strokeColor("#ddd").stroke();
  doc.moveDown(1);

  // 🏷 Booking Details Box
  const detailStartY = doc.y;
  doc.roundedRect(40, detailStartY, 520, 230, 8).stroke("#ccc");

  doc.font("Helvetica-Bold").fillColor("#000").fontSize(14);
  const leftX = 50;
  let lineY = detailStartY + 15;

  const addDetail = (label, value) => {
    doc.text(`${label}:`, leftX, lineY);
    doc
      .font("Helvetica")
      .fillColor("#333")
      .text(`${value}`, leftX + 120, lineY);
    doc.font("Helvetica-Bold").fillColor("#000");
    lineY += 20;
  };

  addDetail("Booking ID", booking._id);
  addDetail("Name", (booking.user as any).name.toUpperCase());
  addDetail("Email", (booking.user as any).email.toUpperCase());
  addDetail("Movie", (booking.movie as any).title.toUpperCase());
  addDetail("Cinema", (booking.cinema as any).name.toUpperCase());
  addDetail("Screen", (booking.screen as any).name.toUpperCase());
  addDetail("Show Date", (booking.show as any).date.toUpperCase());
  addDetail("Show Time", (booking.show as any).time.toUpperCase());
  addDetail("Category", booking.seatCategory.toUpperCase());
  addDetail("Seats", booking.seats.join(", "));

  addDetail("Total Price", `${booking.totalPrice} Rs`);

  doc.moveDown(2);

  // 🖼 QR Code Centered
  const qrImage = qrDataURL.split(",")[1];
  doc
    .rect(200, lineY + 20, 200, 200)
    .strokeColor("#ccc")
    .stroke();

  doc.image(Buffer.from(qrImage, "base64"), 210, lineY + 30, {
    fit: [180, 180],
    align: "center",
    valign: "center",
  });

  // Footer note
  doc.moveDown(15);
  const pageWidth = doc.page.width;
  const margin = 40;

  doc
    .fontSize(10)
    .fillColor("#666")
    .text(
      "Scan the QR code to view your booking online.",
      margin, // x position
      doc.y, // y position
      {
        width: pageWidth - margin * 2, // ensures centering works
        align: "center",
      }
    );

  doc.end();
};

// frontend code to download pdf :

// function downloadPDF(bookingId) {
//   fetch(`/api/v1/booking/${bookingId}/pdf`)
//     .then(res => res.blob())
//     .then(blob => {
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `ticket-${bookingId}.pdf`;
//       a.click();
//     });
// }
export default {
  createBooking,
  getBookingsByUser,
  getBookingById,
  downloadTicket,
};
