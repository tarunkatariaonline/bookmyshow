"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seatCategorySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
exports.seatCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ["Gold", "Silver", "Diamond", "Platinum", "Recliner", "Sofa"], // add more if needed
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
    seatLayout: [exports.seatCategorySchema], // ← it's now an array of objects
    cinema: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Cinema",
        required: true,
    },
});
const Screen = mongoose_1.default.model("Screen", screenSchema);
exports.default = Screen;
//# sourceMappingURL=screen.schema.js.map