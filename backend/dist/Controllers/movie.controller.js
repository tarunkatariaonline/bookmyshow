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
const CustomError_1 = __importDefault(require("../Utils/CustomError"));
const movie_service_1 = __importDefault(require("../Services/movie.service"));
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, duration, genre, language, releaseDate, certificate, posterUrl, trailerUrl, status, cast, director, } = req.body;
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
    };
    yield movie_service_1.default.createMovie(movie);
    res.status(201).json({
        message: "Movie created successfully",
    });
});
const getAvailableMoviesByCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const city = req.params.city;
    if (!city) {
        throw new CustomError_1.default("City parameter is required", 400);
    }
    const uniqueMovies = yield movie_service_1.default.getAvailableMoviesByCity(city);
    res.status(200).json({
        city,
        movies: uniqueMovies,
    });
});
const getUpcomingDatesForMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city, movieId } = req.params;
    if (!city || !movieId) {
        throw new CustomError_1.default("City and Movie ID are required", 400);
    }
    const { movie, sortedDateObjects } = yield movie_service_1.default.getUpcomingDatesForMovies(city, movieId);
    res.status(200).json({
        movie,
        upcomingDates: sortedDateObjects,
    });
});
const getCinemasForMovieByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city, movieId, date } = req.params;
    if (!city || !movieId || !date) {
        throw new CustomError_1.default("City, Movie ID, and Date are required", 400);
    }
    const cinemaList = yield movie_service_1.default.getCinemasForMovieByDate(city, movieId, date);
    res.status(200).json({
        movieId,
        cinemas: cinemaList,
    });
});
const getMoviesList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield movie_service_1.default.getMoviesList();
    res.json({
        movies: movies,
        message: "Movies fetched successfully !",
    });
});
exports.default = {
    createMovie,
    getAvailableMoviesByCity,
    getUpcomingDatesForMovies,
    getCinemasForMovieByDate,
    getMoviesList,
};
//# sourceMappingURL=movie.controller.js.map