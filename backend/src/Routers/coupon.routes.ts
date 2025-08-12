import express, { Request, Response } from "express";
import asyncHandler from "../Utils/asyncHandler";
import coupon from "../Controllers/coupon.controller";
const router = express.Router();

router.post("/create", asyncHandler(coupon.createCoupon));
router.get("/validate", asyncHandler(coupon.validateCoupon));
router.get("/list", asyncHandler(coupon.getCouponList));
router.patch("/:couponId/status", asyncHandler(coupon.toggleCouponStatus));

export default router;
