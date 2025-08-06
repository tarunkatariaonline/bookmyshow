import CustomError from "../Utils/CustomError";
import User from "../Schema/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  IChangePasswordReq,
  IForgetPasswordUpdateReq,
  ILoginReq,
  IRegisterReq,
  IUpdateProfileReq,
} from "../Types/user.types";

const register = async ({
  name,
  email,
  password,
  confirmPassword,
}: IRegisterReq): Promise<any> => {
  const existUser = await User.findOne({ email });

  if (existUser) {
    throw new CustomError("Email Already Exist !", 401);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  user.password = null;
  const data = {
    user,
    token,
  };
  return data;
};

const login = async ({ email, password }: ILoginReq): Promise<any> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError("User not found !", 404);
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new CustomError("Invalid password !", 401);
  }

  user.password = null;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  const data = {
    user,
    token,
  };
  return data;
};

const updateProfile = async ({
  id,
  name,
  email,
}: IUpdateProfileReq): Promise<any> => {
  const user = await User.findByIdAndUpdate(
    id,
    {
      name: name,
      email: email,
    },
    {
      new: true,
    }
  ).select("-password");
  const data = {
    user,
  };
  return data;
};

const changePassword = async ({
  id,
  oldPassword,
  newPassword,
}: IChangePasswordReq): Promise<any> => {
  let user = await User.findById(id);
  if (!user) {
    throw new CustomError("User Not Found !", 404);
  }
  const isValidPassword = await bcrypt.compare(oldPassword, user.password);
  if (!isValidPassword) {
    throw new CustomError("Old Password is Incorrect !", 401);
  }

  user.password = await bcrypt.hash(newPassword, 12);
  await User.findByIdAndUpdate(user._id, user);
};

const forgetPasswordMailSend = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("User Doesn't Exist !", 403);
  }

  const token = crypto.randomBytes(64).toString("hex");
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const resetPasswordTokenExpiration = new Date(Date.now() + 30 * 60 * 1000);
  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordTokenExpires = resetPasswordTokenExpiration;
  user.save();
};

const forgetPasswordUpdate = async ({
  token,
  newPassword,
}: IForgetPasswordUpdateReq) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token as any)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new CustomError("User Not Found !", 400);
  }

  user.password = await bcrypt.hash(newPassword, 12);
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpires = undefined;
};

export default {
  register,
  login,
  updateProfile,
  changePassword,
  forgetPasswordMailSend,
  forgetPasswordUpdate,
};
