"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../Utils/asyncHandler"));
const cinema_controller_1 = __importDefault(require("../Controllers/cinema.controller"));
const router = express_1.default.Router();
router.post("/create", (0, asyncHandler_1.default)(cinema_controller_1.default.createCinema));
router.get("/list", (0, asyncHandler_1.default)(cinema_controller_1.default.getCinemaList));
exports.default = router;
//# sourceMappingURL=cinema.routes.js.map