import { Request, Response } from "express";
import Coupon from "../Schema/coupon.schema";
import CustomError from "../Utils/CustomError";
import { ICreateCouponReq } from "../Types/coupon.types";
const createCoupon = async ({
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
}: ICreateCouponReq) => {
  // Check if coupon code already exists
  const existing = await Coupon.findOne({ code: code.toUpperCase() });
  if (existing) {
    throw new CustomError("Coupon code already exists", 400);
  }

  const coupon = new Coupon({
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

  await coupon.save();

  return coupon;
};

export default { createCoupon };
