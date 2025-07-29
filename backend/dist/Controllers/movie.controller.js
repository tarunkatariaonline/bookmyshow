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
const movieSchema_1 = __importDefault(require("../Schema/movieSchema"));
const CustomError_1 = __importDefault(require("../Utils/CustomError"));
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, duration, genre, language, releaseDate, certificate, posterUrl, trailerUrl, status, cast, director, ratings, } = req.body;
    if (!title ||
        !description ||
        !duration ||
        !genre ||
        !language ||
        !releaseDate) {
        throw new CustomError_1.default("Please fill all required fields!", 400);
    }
    const movie = {
        title,
        description,
        duration,
        genre,
        language,
        releaseDate,
        certificate,
        posterUrl,
        trailerUrl,
        status,
        cast,
        director,
        ratings,
    };
    yield movieSchema_1.default.create(movie);
    res.status(201).json({
        message: "Movie created successfully",
    });
});
exports.default = { createMovie };
//# sourceMappingURL=movie.controller.js.map