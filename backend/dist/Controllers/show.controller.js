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
exports.default = { createShow };
//# sourceMappingURL=show.controller.js.map