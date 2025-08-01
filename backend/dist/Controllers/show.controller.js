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
const screenSchema_1 = __importDefault(require("../Schema/screenSchema"));
const CustomError_1 = __importDefault(require("../Utils/CustomError"));
const showSchema_1 = __importDefault(require("../Schema/showSchema"));
const movieSchema_1 = __importDefault(require("../Schema/movieSchema"));
const getDayName = (dateStr) => {
    const [dd, mm, yyyy] = dateStr.split("-");
    const date = new Date(`${yyyy}-${mm}-${dd}`);
    return date.toLocaleDateString("en-US", { weekday: "long" });
};
const createShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cinemaId = req.params.cinemaId;
    const screenId = req.params.screenId;
    const movieId = req.params.movieId;
    const date = req.body.date;
    const time = req.body.time;
    if (!cinemaId || !movieId || !screenId || !date || !time) {
        throw new CustomError_1.default("Fill all details", 400);
    }
    const screen = yield screenSchema_1.default.findById(screenId);
    if (!screen) {
        throw new CustomError_1.default("Screen not found", 404);
    }
    const show = new showSchema_1.default({
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
const getUpcomingDatesForShows = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { city, movieId } = req.params;
        if (!city || !movieId) {
            throw new CustomError_1.default("City and Movie ID are required", 400);
        }
        const movie = yield movieSchema_1.default.findById(movieId).lean();
        if (!movie) {
            throw new CustomError_1.default("Movie not found", 404);
        }
        const shows = yield showSchema_1.default.find({ movie: movieId })
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
            return (new Date(y1, m1 - 1, d1).getTime() -
                new Date(y2, m2 - 1, d2).getTime());
        })
            .map((dateStr) => ({
            date: dateStr,
            day: getDayName(dateStr),
        }));
        res.status(200).json({
            movie,
            upcomingDates: sortedDateObjects,
        });
    }
    catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({
            message: error.message || "Failed to fetch upcoming dates",
        });
    }
});
exports.default = { createShow };
//# sourceMappingURL=show.controller.js.map