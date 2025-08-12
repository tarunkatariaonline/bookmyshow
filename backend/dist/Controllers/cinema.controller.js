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
const cinema_service_1 = __importDefault(require("../Services/cinema.service"));
const createCinema = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cinema = req.body;
    const user = "67c2d6b2093c1a7f19cac055"; //req.user._id ;
    cinema.managers = [user];
    cinema.security = [user];
    yield cinema_service_1.default.createCinema(cinema);
    res.status(201).json({
        message: "Cinema created successfully",
    });
});
const getCinemaList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = "67c2d6b2093c1a7f19cac055";
    const cinemas = yield cinema_service_1.default.getCinemaList(user);
    res.json({
        cinemas,
        count: cinemas.length,
        message: "Cinemas Fetched Successfully .",
    });
});
exports.default = { createCinema, getCinemaList };
//# sourceMappingURL=cinema.controller.js.map