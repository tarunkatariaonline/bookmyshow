"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../Utils/asyncHandler"));
const coupon_controller_1 = __importDefault(require("../Controllers/coupon.controller"));
const router = express_1.default.Router();
router.post("/create", (0, asyncHandler_1.default)(coupon_controller_1.default.createCoupon));
router.get("/validate", (0, asyncHandler_1.default)(coupon_controller_1.default.validateCoupon));
exports.default = router;
//# sourceMappingURL=coupon.routes.js.map