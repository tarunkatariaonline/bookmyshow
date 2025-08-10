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
    return booking;
});
exports.default = { createBooking, getBookingsByUser, getBookingById };
//# sourceMappingURL=booking.service.js.map