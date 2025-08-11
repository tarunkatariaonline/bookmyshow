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
const coupon_schema_1 = __importDefault(require("../Schema/coupon.schema"));
const CustomError_1 = __importDefault(require("../Utils/CustomError"));
const createCoupon = (_a) => __awaiter(void 0, [_a], void 0, function* ({ title, description, code, discountType, discountValue, minPurchaseAmount, maxDiscountAmount, startDate, endDate, usageLimit, isActive, }) {
    // Check if coupon code already exists
    const existing = yield coupon_schema_1.default.findOne({ code: code.toUpperCase() });
    if (existing) {
        throw new CustomError_1.default("Coupon code already exists", 400);
    }
    const coupon = new coupon_schema_1.default({
        title,
        description,
        code: code.toUpperCase(),
        discountType,
        discountValue,
        minPurchaseAmount,
        maxDiscountAmount,
        startDate,
        endDate,
        usageLimit,
        isActive,
    });
    yield coupon.save();
    return coupon;
});
exports.default = { createCoupon };
//# sourceMappingURL=coupon.service.js.map