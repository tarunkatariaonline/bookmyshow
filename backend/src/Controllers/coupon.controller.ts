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

export default { createCoupon };
