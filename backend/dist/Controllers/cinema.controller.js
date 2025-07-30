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
const createCinema = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cinema = req.body;
    yield cinemaSchema_1.default.create(cinema);
    res.status(201).json({
        message: "Cinema created successfully",
    });
});
const addCinemaScreen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cinemaId = req.params.id;
    const newScreen = req.body;
    if (!cinemaId) {
        throw new CustomError_1.default("Cinema ID is required", 400);
    }
    if (!newScreen) {
        throw new CustomError_1.default("Screen details are required", 400);
    }
    const cinema = yield cinemaSchema_1.default.findById(cinemaId);
    if (!cinema) {
        throw new CustomError_1.default("Cinema not found !", 404);
    }
    cinema.screens.push(newScreen);
    yield cinema.save();
    res.status(200).json({ message: "Screen added successfully" });
});
exports.default = { createCinema, addCinemaScreen };
//# sourceMappingURL=cinema.controller.js.map