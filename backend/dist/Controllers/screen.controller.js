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
const screen_service_1 = __importDefault(require("../Services/screen.service"));
const createCinemaScreen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cinemaId = req.params.cinemaId;
    const { name, seatLayout, timings } = req.body;
    if (!cinemaId) {
        throw new CustomError_1.default("Cinema ID is required", 400);
    }
    if (!name || !seatLayout) {
        throw new CustomError_1.default("Screen name and seat layout are required", 400);
    }
    yield screen_service_1.default.createCinemaScreen({
        name,
        cinemaId,
        seatLayout,
        timings,
    });
    res.status(201).json({
        message: "Screen added successfully",
    });
});
const getScreenList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cinemaId } = req.params;
    const screenList = yield screen_service_1.default.getScreenList(cinemaId);
    res.status(200).json({
        message: "Screen list Fetched Successfully !",
        screenList,
        count: screenList.length,
    });
});
exports.default = { createCinemaScreen, getScreenList };
//# sourceMappingURL=screen.controller.js.map