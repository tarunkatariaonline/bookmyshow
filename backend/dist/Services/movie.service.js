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
const movie_schema_1 = __importDefault(require("../Schema/movie.schema"));
const CustomError_1 = __importDefault(require("../Utils/CustomError"));
const show_schema_1 = __importDefault(require("../Schema/show.schema"));
const dateUtils_1 = require("../Utils/dateUtils");
const createMovie = (movie) => __awaiter(void 0, void 0, void 0, function* () {
    yield movie_schema_1.default.create(movie);
});
const getAvailableMoviesByCity = (city) => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    const shows = yield show_schema_1.default.find()
        .populate("movie")
        .populate({
        path: "cinema",
        select: "location",
    })
        .select("movie cinema date time")
        .lean();
    const filteredShows = shows.filter((show) => {
        var _a, _b, _c;
        const showCity = (_c = (_b = (_a = show.cinema) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.city) === null || _c === void 0 ? void 0 : _c.toLowerCase();
        const showDateTime = (0, dateUtils_1.parseDateTime)(show.date, show.time);
        return showCity === city.toLowerCase() && showDateTime > now;
    });
    const uniqueMoviesMap = new Map();
    filteredShows.forEach((show) => {
        const movie = show.movie;
        if (!uniqueMoviesMap.has(movie._id.toString())) {
            uniqueMoviesMap.set(movie._id.toString(), movie);
        }
    });
    const uniqueMovies = Array.from(uniqueMoviesMap.values());
    return uniqueMovies;
});
const getUpcomingDatesForMovies = (city, movieId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const movie = yield movie_schema_1.default.findById(movieId).lean();
    if (!movie) {
        throw new CustomError_1.default("Movie not found", 404);
    }
    const shows = yield show_schema_1.default.find({ movie: movieId })
        .populate({
        path: "cinema",
        select: "location",
    })
        .select("date time cinema")
        .lean();
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 7);
    const uniqueDates = new Set();
    for (const show of shows) {
        const showCity = (_c = (_b = (_a = show.cinema) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.city) === null || _c === void 0 ? void 0 : _c.toLowerCase();
        const showDateStr = show.date;
        const showTimeStr = show.time;
        if (!showDateStr || !showTimeStr || showCity !== city.toLowerCase())
            continue;
        const [dd, mm, yyyy] = showDateStr.split("-");
        const showDate = new Date(`${yyyy}-${mm}-${dd}`);
        if (showDate < today || showDate > endDate)
            continue;
        const isToday = showDate.getDate() === today.getDate() &&
            showDate.getMonth() === today.getMonth() &&
            showDate.getFullYear() === today.getFullYear();
        if (isToday) {
            const [timePart, modifier] = showTimeStr.split(" ");
            let [hours, minutes] = timePart.split(":").map(Number);
            if (modifier === "PM" && hours < 12)
                hours += 12;
            if (modifier === "AM" && hours === 12)
                hours = 0;
            const showDateTime = new Date(showDate);
            showDateTime.setHours(hours, minutes, 0);
            if (showDateTime <= today)
                continue;
        }
        uniqueDates.add(showDateStr);
    }
    // Convert to array with day names
    const sortedDateObjects = Array.from(uniqueDates)
        .sort((a, b) => {
        const [d1, m1, y1] = a.split("-").map(Number);
        const [d2, m2, y2] = b.split("-").map(Number);
        return (new Date(y1, m1 - 1, d1).getTime() - new Date(y2, m2 - 1, d2).getTime());
    })
        .map((dateStr) => ({
        date: dateStr,
        day: (0, dateUtils_1.getDayName)(dateStr),
    }));
    return {
        movie,
        sortedDateObjects,
    };
});
const getCinemasForMovieByDate = (city, movieId, date) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const movie = yield movie_schema_1.default.findById(movieId).lean();
    if (!movie) {
        throw new CustomError_1.default("Movie not found", 404);
    }
    const shows = yield show_schema_1.default.find({ movie: movieId, date })
        .populate({
        path: "cinema",
        select: "name location",
    })
        .populate({
        path: "screen",
        select: "name",
    })
        .select("cinema screen date time")
        .lean();
    const filteredShows = shows.filter((show) => { var _a, _b, _c; return ((_c = (_b = (_a = show.cinema) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.city) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === city.toLowerCase(); });
    const cinemaMap = new Map();
    for (const show of filteredShows) {
        const cinema = show.cinema;
        const cinemaId = cinema._id.toString();
        if (!cinemaMap.has(cinemaId)) {
            cinemaMap.set(cinemaId, {
                name: cinema.name,
                _id: cinema._id,
                location: cinema.location,
                shows: [],
            });
        }
        cinemaMap.get(cinemaId).shows.push({
            _id: show._id.toString(),
            time: show.time,
            screen_id: (_a = show.screen) === null || _a === void 0 ? void 0 : _a._id,
            screen: ((_b = show.screen) === null || _b === void 0 ? void 0 : _b.name) || "Unknown Screen",
        });
    }
    const cinemaList = Array.from(cinemaMap.values());
    return cinemaList;
});
exports.default = {
    createMovie,
    getAvailableMoviesByCity,
    getUpcomingDatesForMovies,
    getCinemasForMovieByDate,
};
//# sourceMappingURL=movie.service.js.map