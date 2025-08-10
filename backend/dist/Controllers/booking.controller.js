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
const booking_service_js_1 = __importDefault(require("../Services/booking.service.js"));
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { showId, movie, cinema, screen, seatCategory, seats, // array of seat numbers
    totalPrice, } = req.body;
    const user = "67c2d6b2093c1a7f19cac055"; // req.user aayga vais
    // 1. Get the show
    const booking = yield booking_service_js_1.default.createBooking({
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
});
const getBookingsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = "67c2d6b2093c1a7f19cac055";
    const { bookings } = yield booking_service_js_1.default.getBookingsByUser(userId);
    res.status(200).json({
        success: true,
        count: bookings.length,
        bookings,
    });
});
const getBookingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId } = req.params;
    const booking = yield booking_service_js_1.default.getBookingById(bookingId);
    res.status(200).json({
        success: true,
        booking,
    });
});
exports.default = { createBooking, getBookingsByUser, getBookingById };
//# sourceMappingURL=booking.controller.js.map