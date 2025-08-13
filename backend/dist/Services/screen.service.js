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
const cinema_schema_1 = __importDefault(require("../Schema/cinema.schema"));
const CustomError_1 = __importDefault(require("../Utils/CustomError"));
const screen_schema_1 = __importDefault(require("../Schema/screen.schema"));
const createCinemaScreen = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, cinemaId, seatLayout, }) {
    const cinema = yield cinema_schema_1.default.findById(cinemaId);
    if (!cinema) {
        throw new CustomError_1.default("Cinema not found!", 404);
    }
    const screen = new screen_schema_1.default({
        name,
        seatLayout,
        cinema: cinemaId, // connect screen to cinema
    });
    yield screen.save();
});
const getScreenList = (cinemaId) => __awaiter(void 0, void 0, void 0, function* () {
    const screens = yield screen_schema_1.default.find({ cinema: cinemaId }).lean();
    return screens;
});
exports.default = { createCinemaScreen, getScreenList };
//# sourceMappingURL=screen.service.js.map