"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../Utils/asyncHandler"));
const show_controller_1 = __importDefault(require("../Controllers/show.controller"));
const router = express_1.default.Router();
router.post("/:movieId/:cinemaId/:screenId/create", (0, asyncHandler_1.default)(show_controller_1.default.createShow));
router.post("/bulk/create", (0, asyncHandler_1.default)(show_controller_1.default.createBulkShows));
router.get("/:showId", (0, asyncHandler_1.default)(show_controller_1.default.getShowById));
router.get("/:city/:cinemaId/:movieId/:date", (0, asyncHandler_1.default)(show_controller_1.default.getShowsByCinemaMovieAndDate));
exports.default = router;
//# sourceMappingURL=show.routes.js.map