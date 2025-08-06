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
exports.getShowsByCinemaMovieAndDate = exports.getShowById = void 0;
const screen_schema_1 = __importDefault(require("../Schema/screen.schema"));
const CustomError_1 = __importDefault(require("../Utils/CustomError"));
const show_schema_1 = __importDefault(require("../Schema/show.schema"));
const movie_schema_1 = __importDefault(require("../Schema/movie.schema"));
const helpers_1 = require("../Utils/helpers");
const createShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cinemaId = req.params.cinemaId;
    const screenId = req.params.screenId;
    const movieId = req.params.movieId;
    const date = req.body.date;
    const time = req.body.time;
    if (!cinemaId || !movieId || !screenId || !date || !time) {
        throw new CustomError_1.default("Fill all details", 400);
    }
    const screen = yield screen_schema_1.default.findById(screenId);
    if (!screen) {
        throw new CustomError_1.default("Screen not found", 404);
    }
    const show = new show_schema_1.default({
        movie: movieId,
        cinema: cinemaId,
        screen: screenId,
        date: date,
        time: time,
        seatLayout: screen.seatLayout,
    });
    yield show.save();
    res.status(200).json({
        message: "Show created successfully",
    });
});
const getShowById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { showId } = req.params;
    if (!showId) {
        throw new CustomError_1.default("Show ID is required", 400);
    }
    const show = yield show_schema_1.default.findById(showId)
        .populate("movie")
        .populate("cinema")
        .populate("screen")
        .lean();
    if (!show) {
        throw new CustomError_1.default("Show not found", 404);
    }
    res.status(200).json(show);
});
exports.getShowById = getShowById;
const getShowsByCinemaMovieAndDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city, cinemaId, movieId, date } = req.params;
    if (!city || !cinemaId || !movieId || !date) {
        throw new CustomError_1.default("City, Cinema ID, Movie ID, and Date are required", 400);
    }
    const movie = yield movie_schema_1.default.findById(movieId).lean();
    if (!movie) {
        throw new CustomError_1.default("Movie not found", 404);
    }
    const shows = yield show_schema_1.default.find({ cinema: cinemaId, movie: movieId, date })
        .populate({
        path: "cinema",
        select: "location",
    })
        .populate({
        path: "screen",
        select: "name",
    })
        .select("time screen cinema")
        .lean();
    const filteredShows = shows.filter((show) => { var _a, _b, _c; return ((_c = (_b = (_a = show.cinema) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.city) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === city.toLowerCase(); });
    if (filteredShows.length === 0) {
        throw new CustomError_1.default("No shows found for this movie in this city/cinema on this date", 404);
    }
    const showList = filteredShows.map((show) => {
        var _a;
        return ({
            id: show._id.toString(),
            time: show.time,
            screen: ((_a = show.screen) === null || _a === void 0 ? void 0 : _a.name) || "Unknown Screen",
        });
    });
    const day = (0, helpers_1.getDayName)(date);
    res.status(200).json({
        movie,
        date,
        day,
        shows: showList,
    });
});
exports.getShowsByCinemaMovieAndDate = getShowsByCinemaMovieAndDate;
exports.default = { createShow, getShowById: exports.getShowById, getShowsByCinemaMovieAndDate: exports.getShowsByCinemaMovieAndDate };
//# sourceMappingURL=show.controller.js.map