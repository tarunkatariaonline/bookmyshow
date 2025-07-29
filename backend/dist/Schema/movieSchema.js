"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number, // in minutes
        required: true,
    },
    genre: {
        type: [String],
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    certificate: {
        type: String, // e.g. "U", "UA", "A"
    },
    posterUrl: {
        type: String,
    },
    trailerUrl: {
        type: String,
    },
    cast: [
        {
            name: String,
            role: String,
        },
    ],
    director: {
        type: String,
    },
    ratings: {
        average: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 },
    },
}, { timestamps: true });
const Movie = mongoose_1.default.model("Movie", movieSchema);
exports.default = Movie;
//# sourceMappingURL=movieSchema.js.map