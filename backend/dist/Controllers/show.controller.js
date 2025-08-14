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
const show_service_1 = __importDefault(require("../Services/show.service"));
const createShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cinemaId = req.params.cinemaId;
    const screenId = req.params.screenId;
    const movieId = req.params.movieId;
    const date = req.body.date;
    const time = req.body.time;
    if (!cinemaId || !movieId || !screenId || !date || !time) {
        throw new CustomError_1.default("Fill all details", 400);
    }
    yield show_service_1.default.createShow({ movieId, cinemaId, screenId, date, time });
    res.status(200).json({
        message: "Show created successfully",
    });
});
const getShowById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { showId } = req.params;
    if (!showId) {
        throw new CustomError_1.default("Show ID is required", 400);
    }
    const show = yield show_service_1.default.getShowById(showId);
    res.status(200).json(show);
});
const getShowsByCinemaMovieAndDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city, cinemaId, movieId, date } = req.params;
    if (!city || !cinemaId || !movieId || !date) {
        throw new CustomError_1.default("City, Cinema ID, Movie ID, and Date are required", 400);
    }
    const { movie, day, showList } = yield show_service_1.default.getShowsByCinemaMovieAndDate({
        movieId,
        cinemaId,
        date,
        city,
    });
    res.status(200).json({
        movie,
        date,
        day,
        shows: showList,
    });
});
const createBulkShows = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, movieId } = req.body;
    const user_id = "67c2d6b2093c1a7f19cac055"; //req.user._id ;
    yield show_service_1.default.createBulkShows({ date, movieId, user_id });
    res.json({
        message: "Bulk shows created successfully",
    });
});
exports.default = {
    createShow,
    getShowById,
    getShowsByCinemaMovieAndDate,
    createBulkShows,
};
//# sourceMappingURL=show.controller.js.map