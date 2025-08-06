import { NextFunction, Request, Response } from "express";
import CustomError from "../Utils/CustomError";
import { ILoginReq, IRegisterReq } from "../Types/user.types";
import userService from "../Services/user.service";

const register = async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword } = req.body as IRegisterReq;

  if (!name || !email || !password || !confirmPassword) {
    throw new CustomError("Fill All Fields Properly !", 401);
  }

  if (password !== confirmPassword) {
    throw new CustomError("Passwords Do Not Match !", 401);
  }

  const data = await userService.register({
    name,
    email,
    password,
    confirmPassword,
  });

  res.status(201).json({
    message: "Registered Successfully",
    data: data,
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as ILoginReq;

  if (!email || !password) {
    throw new CustomError("Email and password are required !", 401);
  }

  const data = await userService.login({ email, password });
  res.status(200).json({
    message: "Login successfully !",
    data: data,
  });
};

const profile = async (req: Request, res: Response) => {
  res.json({
    message: "User is Authanitcated !",
    user: req.user,
  });
};

const updateProfile = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new CustomError("Fill All the Details !", 400);
  }
  const data = await userService.updateProfile({
    id: req.user._id,
    name,
    email,
  });
  res.json({
    message: "Profile updated successfully",
    data: data,
  });
};

const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    throw new CustomError("Fill All the Fields !", 401);
  }

  if (newPassword !== confirmPassword) {
    throw new CustomError("Passwords do not match !", 401);
  }

  const id = req.user._id;

  await userService.changePassword({ id, oldPassword, newPassword });

  res.status(200).json({
    message: "Password changed successfully",
  });
};

const forgetPasswordMailSend = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError("Email is required !", 400);
  }
  await userService.forgetPasswordMailSend(email);
  // Facing Some Issue To Send Mail.
  // send the token variable to the mail of the user with frontend URL;
  res.json({
    message: "Mail Send Successfully !",
    user: req.user,
  });
};

const forgetPasswordUpdate = async (req: Request, res: Response) => {
  const token = req.query.token;
  const newPassword = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (!token) {
    throw new CustomError("Invalid Token !", 403);
  }

  if (!newPassword || !confirmPassword) {
    throw new CustomError("Password is Required !", 403);
  }

  if (newPassword !== confirmPassword) {
    throw new CustomError("Password Doesn't Match !", 403);
  }

  await userService.forgetPasswordUpdate({ token, newPassword });

  res.json({
    message: "Password Updated Successfully !",
  });
};

export default {
  register,
  login,
  profile,
  updateProfile,
  changePassword,
  forgetPasswordUpdate,
  forgetPasswordMailSend,
};
