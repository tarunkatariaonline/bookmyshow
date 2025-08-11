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
const validateCoupon = (code, bookingAmount) => __awaiter(void 0, void 0, void 0, function* () {
    // Find coupon
    const coupon = yield coupon_schema_1.default.findOne({ code: code.toUpperCase() });
    if (!coupon) {
        throw new CustomError_1.default("Coupon not found", 404);
    }
    // Check active status
    if (!coupon.isActive) {
        throw new CustomError_1.default("Coupon is inactive", 404);
    }
    // Check usage limit
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        throw new CustomError_1.default("Reached the usage of coupon !", 400);
    }
    // Check min purchase amount
    if (bookingAmount < coupon.minPurchaseAmount) {
        throw new CustomError_1.default(`Minimum purchase amount for this coupon is ₹${coupon.minPurchaseAmount}`, 400);
    }
    // Calculate discount
    let discount = 0;
    if (coupon.discountType === "percentage") {
        discount = (bookingAmount * coupon.discountValue) / 100;
        if (coupon.maxDiscountAmount) {
            discount = Math.min(discount, coupon.maxDiscountAmount);
        }
    }
    else if (coupon.discountType === "fixed") {
        discount = coupon.discountValue;
    }
    // Final amount after discount
    const finalAmount = Math.max(bookingAmount - discount, 0);
    return {
        code: coupon.code,
        discount,
        finalAmount,
    };
});
const getActiveCoupons = () => __awaiter(void 0, void 0, void 0, function* () {
    const coupons = yield coupon_schema_1.default.find({ isActive: true }).sort({ createdAt: -1 });
    return coupons;
});
exports.default = { createCoupon, validateCoupon, getActiveCoupons };
//# sourceMappingURL=coupon.service.js.map