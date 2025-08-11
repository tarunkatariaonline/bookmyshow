"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const booking_schema_js_1 = __importDefault(require("../Schema/booking.schema.js"));
const show_schema_js_1 = __importDefault(require("../Schema/show.schema.js"));
const CustomError_js_1 = __importDefault(require("../Utils/CustomError.js"));
const qrcode_1 = __importDefault(require("qrcode"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const createBooking = (_a) => __awaiter(void 0, [_a], void 0, function* ({ showId, movie, cinema, screen, seatCategory, seats, // array of seat numbers
totalPrice, user, }) {
    // 1. Get the show
    const show = yield show_schema_js_1.default.findById(showId);
    if (!show) {
        throw new CustomError_js_1.default("Show doesn't found !", 404);
    }
    // 2. Check for already booked seats
    const alreadyBooked = seats.filter((seat) => show.bookedSeats.includes(seat));
    if (alreadyBooked.length > 0) {
        throw new CustomError_js_1.default("Seats are already books !", 403);
    }
    // 3. Add these seats to bookedSeats
    show.bookedSeats.push(...seats);
    yield show.save();
    // 4. Create booking record
    const booking = new booking_schema_js_1.default({
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
    yield booking.save();
    // 5. Commit transaction
    return booking;
});
const getBookingsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_schema_js_1.default.find({ user: userId })
        .populate("movie", "title poster language duration") // Only selected fields
        .populate("cinema", "name address")
        .populate("screen", "name")
        .populate("show", "date time")
        .populate("user", "name email")
        .sort({ createdAt: -1 }); // Latest first
    return {
        bookings,
    };
});
const getBookingById = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_schema_js_1.default.findById(bookingId)
        .populate("movie", "title poster language duration")
        .populate("cinema", "name address")
        .populate("screen", "name")
        .populate("show", "date time")
        .populate("user", "name email");
    if (!booking) {
        throw new CustomError_js_1.default("Booking not found !", 404);
    }
    const ticketUrl = `${process.env.FRONTEND_URL}${booking._id}`;
    const qrPayload = {
        booking_id: booking._id,
        movie: booking.movie.title,
        booked_by: booking.user.name,
        screen: booking.screen.name,
        category: booking.seatCategory,
        seats: booking.seats,
        date: booking.show.date,
        time: booking.show.time,
        verify_ticket: ticketUrl,
    };
    const qrCodeImage = yield qrcode_1.default.toDataURL(JSON.stringify(qrPayload));
    booking.qrCodeImage = qrCodeImage;
    return booking;
});
const downloadTicket = (bookingId, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Fetch booking
    const booking = yield booking_schema_js_1.default.findById(bookingId)
        .populate("user", "name email")
        .populate("movie", "title duration")
        .populate("cinema", "name address")
        .populate("show", "date time")
        .populate("screen", "name");
    if (!booking) {
        throw new CustomError_js_1.default("Booking not found !", 404);
    }
    // 2. QR Code
    const ticketUrl = `${process.env.FRONTEND_URL}${booking._id}`;
    const qrPayload = {
        booking_id: booking._id,
        movie: booking.movie.title,
        booked_by: booking.user.name,
        screen: booking.screen.name,
        category: booking.seatCategory,
        seats: booking.seats,
        date: booking.show.date,
        time: booking.show.time,
        verify_ticket: ticketUrl,
    };
    const qrDataURL = yield qrcode_1.default.toDataURL(JSON.stringify(qrPayload));
    // 3. PDF setup
    const doc = new pdfkit_1.default({ margin: 40 });
    res.setHeader("Content-Disposition", `attachment; filename="ticket-${booking._id}.pdf"`);
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
        .text("Please bring this ticket or show the QR code at the cinema entrance.", {
        align: "center",
    });
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
    addDetail("Name", booking.user.name.toUpperCase());
    addDetail("Email", booking.user.email.toUpperCase());
    addDetail("Movie", booking.movie.title.toUpperCase());
    addDetail("Cinema", booking.cinema.name.toUpperCase());
    addDetail("Screen", booking.screen.name.toUpperCase());
    addDetail("Show Date", booking.show.date.toUpperCase());
    addDetail("Show Time", booking.show.time.toUpperCase());
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
        .text("Scan the QR code to view your booking online.", margin, // x position
    doc.y, // y position
    {
        width: pageWidth - margin * 2, // ensures centering works
        align: "center",
    });
    doc.end();
});
exports.default = {
    createBooking,
    getBookingsByUser,
    getBookingById,
    downloadTicket,
};
//# sourceMappingURL=booking.service.js.map