"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const cinemaSchema = new mongoose_1.default.Schema({
    name: String,
    location: {
        city: String,
        address: String,
        pincode: Number,
    },
});
const Cinema = mongoose_1.default.model("Cinema", cinemaSchema);
exports.default = Cinema;
//# sourceMappingURL=cinemaSchema.js.map