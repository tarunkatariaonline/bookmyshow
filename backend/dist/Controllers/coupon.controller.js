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
const coupon_service_1 = __importDefault(require("../Services/coupon.service"));
const createCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, code, discountType, discountValue, minPurchaseAmount, maxDiscountAmount, startDate, endDate, usageLimit, isActive, } = req.body;
    // Check if coupon code already exists
    const coupon = yield coupon_service_1.default.createCoupon({
        title,
        description,
        code,
        discountType,
        discountValue,
        minPurchaseAmount,
        maxDiscountAmount,
        startDate,
        endDate,
        usageLimit,
        isActive,
    });
    res.status(201).json({
        message: "Coupon created successfully",
        coupon,
    });
});
const validateCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, bookingAmount } = req.body;
    if (!code || !bookingAmount) {
        throw new CustomError_1.default("Coupon code and booking amount are required", 400);
    }
    // Find coupon
    const { code: couponCode, discount, finalAmount, } = yield coupon_service_1.default.validateCoupon(code, bookingAmount);
    res.status(200).json({
        message: "Coupon is valid",
        coupon: {
            code: couponCode,
            discount,
            finalAmount,
        },
    });
});
const getCouponList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coupons = yield coupon_service_1.default.getCouponList();
    res.status(200).json({
        message: "Active coupons fetched successfully",
        total: coupons.length,
        coupons,
    });
});
const toggleCouponStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { couponId } = req.params;
    const { isActive } = req.body; // Boolean: true or false
    const coupon = yield coupon_service_1.default.toggleCouponStatus(couponId, isActive);
    res.status(200).json({
        message: `Coupon ${isActive ? "activated" : "deactivated"} successfully`,
        coupon,
    });
});
exports.default = {
    createCoupon,
    validateCoupon,
    getCouponList,
    toggleCouponStatus,
};
//# sourceMappingURL=coupon.controller.js.map