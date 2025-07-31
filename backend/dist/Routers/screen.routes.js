"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../Utils/asyncHandler"));
const screen_controller_1 = __importDefault(require("../Controllers/screen.controller"));
const router = express_1.default.Router();
router.post("/:cinemaId/create", (0, asyncHandler_1.default)(screen_controller_1.default.createCinemaScreen));
exports.default = router;
//# sourceMappingURL=screen.routes.js.map