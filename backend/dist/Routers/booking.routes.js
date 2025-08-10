"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../Utils/asyncHandler"));
const booking_controller_1 = __importDefault(require("../Controllers/booking.controller"));
const router = express_1.default.Router();
router.post("/create", (0, asyncHandler_1.default)(booking_controller_1.default.createBooking));
router.get("/mybookings", (0, asyncHandler_1.default)(booking_controller_1.default.getBookingsByUser));
router.get("/:bookingId", (0, asyncHandler_1.default)(booking_controller_1.default.getBookingById));
exports.default = router;
//# sourceMappingURL=booking.routes.js.map