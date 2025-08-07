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
const screen_schema_1 = __importDefault(require("../Schema/screen.schema"));
const CustomError_1 = __importDefault(require("../Utils/CustomError"));
const show_schema_1 = __importDefault(require("../Schema/show.schema"));
const movie_schema_1 = __importDefault(require("../Schema/movie.schema"));
const dateUtils_1 = require("../Utils/dateUtils");
const createShow = (_a) => __awaiter(void 0, [_a], void 0, function* ({ movieId, cinemaId, screenId, date, time, }) {
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
});
const getShowById = (showId) => __awaiter(void 0, void 0, void 0, function* () {
    const show = yield show_schema_1.default.findById(showId)
        .populate("movie")
        .populate("cinema")
        .populate("screen")
        .lean();
    if (!show) {
        throw new CustomError_1.default("Show not found", 404);
    }
    return show;
});
const getShowsByCinemaMovieAndDate = (_a) => __awaiter(void 0, [_a], void 0, function* ({ movieId, cinemaId, date, city, }) {
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
    const day = (0, dateUtils_1.getDayName)(date);
    return {
        movie,
        day,
        showList,
    };
});
exports.default = { createShow, getShowById, getShowsByCinemaMovieAndDate };
//# sourceMappingURL=show.service.js.map