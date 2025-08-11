import { Request, Response } from "express";
import Coupon from "../Schema/coupon.schema";
import CustomError from "../Utils/CustomError";
import couponService from "../Services/coupon.service";

const createCoupon = async (req: Request, res: Response) => {
  const {
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
  } = req.body;

  // Check if coupon code already exists
  const coupon = await couponService.createCoupon({
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
};

const validateCoupon = async (req: Request, res: Response) => {
  const { code, bookingAmount } = req.body;

  if (!code || !bookingAmount) {
    throw new CustomError("Coupon code and booking amount are required", 400);
  }

  // Find coupon
  const {
    code: couponCode,
    discount,
    finalAmount,
  } = await couponService.validateCoupon(code, bookingAmount);

  res.status(200).json({
    message: "Coupon is valid",
    coupon: {
      code: couponCode,
      discount,
      finalAmount,
    },
  });
};

export default { createCoupon, validateCoupon };
