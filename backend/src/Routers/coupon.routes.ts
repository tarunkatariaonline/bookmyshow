import express, { Request, Response } from "express";
import asyncHandler from "../Utils/asyncHandler";
import coupon from "../Controllers/coupon.controller";
const router = express.Router();

router.post("/create", asyncHandler(coupon.createCoupon));

export default router;
