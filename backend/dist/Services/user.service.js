"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = __importDefault(require("../Utils/CustomError"));
const user_schema_1 = __importDefault(require("../Schema/user.schema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const register = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, email, password, confirmPassword, }) {
    const existUser = yield user_schema_1.default.findOne({ email });
    if (existUser) {
        throw new CustomError_1.default("Email Already Exist !", 401);
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    const user = yield user_schema_1.default.create({
        name,
        email,
        password: hashedPassword,
    });
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
    user.password = null;
    const data = {
        user,
        token,
    };
    return data;
});
const login = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    const user = yield user_schema_1.default.findOne({ email });
    if (!user) {
        throw new CustomError_1.default("User not found !", 404);
    }
    const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!isValidPassword) {
        throw new CustomError_1.default("Invalid password !", 401);
    }
    user.password = null;
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
    const data = {
        user,
        token,
    };
    return data;
});
const updateProfile = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, name, email, }) {
    const user = yield user_schema_1.default.findByIdAndUpdate(id, {
        name: name,
        email: email,
    }, {
        new: true,
    }).select("-password");
    const data = {
        user,
    };
    return data;
});
const changePassword = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, oldPassword, newPassword, }) {
    let user = yield user_schema_1.default.findById(id);
    if (!user) {
        throw new CustomError_1.default("User Not Found !", 404);
    }
    const isValidPassword = yield bcrypt_1.default.compare(oldPassword, user.password);
    if (!isValidPassword) {
        throw new CustomError_1.default("Old Password is Incorrect !", 401);
    }
    user.password = yield bcrypt_1.default.hash(newPassword, 12);
    yield user_schema_1.default.findByIdAndUpdate(user._id, user);
});
const forgetPasswordMailSend = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_schema_1.default.findOne({ email });
    if (!user) {
        throw new CustomError_1.default("User Doesn't Exist !", 403);
    }
    const token = crypto_1.default.randomBytes(64).toString("hex");
    const resetPasswordToken = crypto_1.default
        .createHash("sha256")
        .update(token)
        .digest("hex");
    const resetPasswordTokenExpiration = new Date(Date.now() + 30 * 60 * 1000);
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpires = resetPasswordTokenExpiration;
    user.save();
});
const forgetPasswordUpdate = (_a) => __awaiter(void 0, [_a], void 0, function* ({ token, newPassword, }) {
    const resetPasswordToken = crypto_1.default
        .createHash("sha256")
        .update(token)
        .digest("hex");
    const user = yield user_schema_1.default.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
        throw new CustomError_1.default("User Not Found !", 400);
    }
    user.password = yield bcrypt_1.default.hash(newPassword, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
});
exports.default = {
    register,
    login,
    updateProfile,
    changePassword,
    forgetPasswordMailSend,
    forgetPasswordUpdate,
};
//# sourceMappingURL=user.service.js.map