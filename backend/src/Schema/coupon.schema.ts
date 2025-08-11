import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true, // store in uppercase for easy match
      trim: true,
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"], // % discount or fixed amount
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
    },
    minPurchaseAmount: {
      type: Number,
      default: 0, // optional condition
    },
    maxDiscountAmount: {
      type: Number,
      default: null, // only for percentage discounts
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    usageLimit: {
      type: Number,
      default: null, // null = unlimited uses
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
