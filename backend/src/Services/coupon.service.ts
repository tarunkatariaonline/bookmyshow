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

const validateCoupon = async (code: string, bookingAmount: number) => {
  // Find coupon
  const coupon = await Coupon.findOne({ code: code.toUpperCase() });
  if (!coupon) {
    throw new CustomError("Coupon not found", 404);
  }

  // Check active status
  if (!coupon.isActive) {
    throw new CustomError("Coupon is inactive", 404);
  }

  // Check usage limit
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    throw new CustomError("Reached the usage of coupon !", 400);
  }

  // Check min purchase amount
  if (bookingAmount < coupon.minPurchaseAmount) {
    throw new CustomError(
      `Minimum purchase amount for this coupon is ₹${coupon.minPurchaseAmount}`,
      400
    );
  }

  // Calculate discount
  let discount = 0;
  if (coupon.discountType === "percentage") {
    discount = (bookingAmount * coupon.discountValue) / 100;
    if (coupon.maxDiscountAmount) {
      discount = Math.min(discount, coupon.maxDiscountAmount);
    }
  } else if (coupon.discountType === "fixed") {
    discount = coupon.discountValue;
  }

  // Final amount after discount
  const finalAmount = Math.max(bookingAmount - discount, 0);

  return {
    code: coupon.code,
    discount,
    finalAmount,
  };
};

const getCouponList = async () => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });

  return coupons;
};

const toggleCouponStatus = async (couponId: string, isActive: boolean) => {
  if (typeof isActive !== "boolean") {
    throw new CustomError("Invalid status", 400);
  }

  const coupon = await Coupon.findByIdAndUpdate(
    couponId,
    { isActive },
    { new: true }
  );

  if (!coupon) {
    throw new CustomError("Coupon not found", 404);
  }

  return coupon;
};
export default {
  createCoupon,
  validateCoupon,
  getCouponList,
  toggleCouponStatus,
};
