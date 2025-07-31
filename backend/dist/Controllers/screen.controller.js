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
const cinemaSchema_1 = __importDefault(require("../Schema/cinemaSchema"));
const CustomError_1 = __importDefault(require("../Utils/CustomError"));
const screenSchema_1 = __importDefault(require("../Schema/screenSchema"));
const createCinemaScreen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cinemaId = req.params.cinemaId;
    const { name, seatLayout } = req.body;
    if (!cinemaId) {
        throw new CustomError_1.default("Cinema ID is required", 400);
    }
    if (!name || !seatLayout) {
        throw new CustomError_1.default("Screen name and seat layout are required", 400);
    }
    const cinema = yield cinemaSchema_1.default.findById(cinemaId);
    if (!cinema) {
        throw new CustomError_1.default("Cinema not found!", 404);
    }
    const screen = new screenSchema_1.default({
        name,
        seatLayout,
        cinema: cinemaId, // connect screen to cinema
    });
    yield screen.save();
    res.status(201).json({
        message: "Screen added successfully",
    });
});
exports.default = { createCinemaScreen };
//# sourceMappingURL=screen.controller.js.map