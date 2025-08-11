"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const couponSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
const Coupon = mongoose_1.default.model("Coupon", couponSchema);
exports.default = Coupon;
//# sourceMappingURL=coupon.schema.js.map