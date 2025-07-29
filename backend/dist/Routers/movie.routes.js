"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../Utils/asyncHandler"));
const movie_controller_1 = __importDefault(require("../Controllers/movie.controller"));
const router = express_1.default.Router();
router.post("/create", (0, asyncHandler_1.default)(movie_controller_1.default.createMovie));
exports.default = router;
//# sourceMappingURL=movie.routes.js.map