"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const cinemaSchema_1 = require("./cinemaSchema");
const showSchema = new mongoose_2.Schema({
    movie: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    cinema: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Cinema",
        required: true,
    },
    screen: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Screen",
        required: true,
    },
    date: {
        type: String, // e.g., "2025-08-01"
        required: true,
    },
    time: {
        type: String, // e.g., "6:00 PM"
        required: true,
    },
    seatLayout: {
        type: [cinemaSchema_1.seatCategorySchema],
        required: true,
    },
    bookedSeats: {
        type: [String], // e.g., ["2A", "3B"]
        default: [],
    },
}, { timestamps: true });
const Show = mongoose_1.default.model("Show", showSchema);
exports.default = Show;
//# sourceMappingURL=showSchema.js.map