import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changePasswordRequest,
  forgotPasswordMailRequest,
  forgotPasswordUpdateRequest,
  loginRequest,
  registerRequest,
  updateProfileRequest,
} from "../api/auth.api";
import { setUser } from "../state/auth.slice";
import type {
    ChangePasswordPayload,
    ForgotPasswordMailPayload,
    ForgotPasswordUpdatePayload,
    LoginPayload,
    RegisterPayload,
    UpdateProfilePayload,
} from "../types/auth.types";
import { USE_PROFILE_QUERY_KEY } from "./useAuthQueries";

export const useLoginMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: LoginPayload) => loginRequest(data),
    onSuccess: (data) => {
      console.log("Login Success:", data);
      localStorage.setItem("token", data.data.token);
      dispatch(setUser(data.data.user));
      toast.success(data.message);
      navigate("/");
    },
    onError: (error: any) => {
      console.log("Login Error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};

export const useRegisterMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: RegisterPayload) => registerRequest(data),
    onSuccess: (data) => {
        console.log("Register Success:", data);
        localStorage.setItem("token", data.data.token);
        dispatch(setUser(data.data.user));
        toast.success(data.message);
        navigate("/");
    },
    onError: (error: any) => {
        console.log("Register Error:", error);
        toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfilePayload) => updateProfileRequest(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: USE_PROFILE_QUERY_KEY });
      console.log("Update Profile Success:", data);
      toast.success(data.message);
    },
    onError: (error: any) => {
      console.log("Update Profile Error:", error);
      toast.error(error.response?.data?.message || "Profile update failed");
    },
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordPayload) => changePasswordRequest(data),
    onSuccess: (data) => {
      console.log("Change Password Success:", data);
      toast.success(data.message);
    },
    onError: (error: any) => {
      console.log("Change Password Error:", error);
      toast.error(error.response?.data?.message || "Password change failed");
    },
  });
};

export const useForgotPasswordMailMutation = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordMailPayload) =>
      forgotPasswordMailRequest(data),
    onSuccess: (data) => {
      console.log("Forgot Password Mail Success:", data);
      toast.success(data.message);
    },
    onError: (error: any) => {
      console.log("Forgot Password Mail Error:", error);
      toast.error(error.response?.data?.message || "Failed to send reset email");
    },
  });
};

export const useForgotPasswordUpdateMutation = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordUpdatePayload) =>
      forgotPasswordUpdateRequest(data),
    onSuccess: (data) => {
      console.log("Forgot Password Update Success:", data);
      toast.success(data.message);
    },
    onError: (error: any) => {
      console.log("Forgot Password Update Error:", error);
      toast.error(error.response?.data?.message || "Password reset failed");
    },
  });
};
