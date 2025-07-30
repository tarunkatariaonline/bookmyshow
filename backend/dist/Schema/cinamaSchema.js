"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const seatCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ["Gold", "Silver", "Platinum", "Recliner", "Sofa"], // add more if needed
    },
    price: {
        type: Number,
        required: true,
    },
    seats: {
        type: [[mongoose_1.default.Schema.Types.Mixed]], // 2D grid: seat labels or null
        required: true,
    },
}, { _id: false });
const screenSchema = new mongoose_1.default.Schema({
    name: String,
    showTimings: [String],
    seatLayout: [seatCategorySchema], // ← it's now an array of objects
}, { _id: false });
const cinemaSchema = new mongoose_1.default.Schema({
    name: String,
    location: {
        city: String,
        address: String,
        pincode: Number,
    },
    screens: [screenSchema],
});
const Cinema = mongoose_1.default.model("Cinema", cinemaSchema);
exports.default = Cinema;
//# sourceMappingURL=cinamaSchema.js.map