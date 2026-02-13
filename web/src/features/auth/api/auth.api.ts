import type {
  ChangePasswordPayload,
  ChangePasswordResponse,
  ForgotPasswordMailPayload,
  ForgotPasswordMailResponse,
  ForgotPasswordUpdatePayload,
  ForgotPasswordUpdateResponse,
  GetProfileResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  UpdateProfilePayload,
  UpdateProfileResponse,
} from "@/features/auth/types/auth.types";
import api from "@/shared/api/axios";

// Login
export const loginRequest = async (
  data: LoginPayload,
): Promise<LoginResponse> => {
  const response = await api.post("user/login", data);
  return response.data;
};

// Register
export const registerRequest = async (
  data: RegisterPayload,
): Promise<RegisterResponse> => {
  const response = await api.post("user/register", data);
  return response.data;
};

// Get Profile
// Using GET /user/profile
// Get Profile
// Using GET /user/profile
export const getProfileRequest = async (): Promise<GetProfileResponse> => {
  const response = await api.get("user/profile");
  return response.data;
};

// Update Profile
export const updateProfileRequest = async (
  data: UpdateProfilePayload,
): Promise<UpdateProfileResponse> => {
  const response = await api.put("user/updateprofile", data);
  return response.data;
};

// Change Password
export const changePasswordRequest = async (
  data: ChangePasswordPayload,
): Promise<ChangePasswordResponse> => {
  const response = await api.put("user/changepassword", data);
  return response.data;
};

// Forgot Password - Send Mail
// Note: Backend might expect body in GET according to snippet, trying to send data property in axios config.
// Ideally this should be a POST.
export const forgotPasswordMailRequest = async (
  data: ForgotPasswordMailPayload,
): Promise<ForgotPasswordMailResponse> => {
  // Sending body in GET request as per backend requirement (router.get("/forgetpassword"))
  // Note: Some proxies/browsers might strip body from GET.
  const response = await api.get("user/forgetpassword", {
    data: data,
  });
  return response.data;
};

// Forgot Password - Update
export const forgotPasswordUpdateRequest = async (
  data: ForgotPasswordUpdatePayload,
): Promise<ForgotPasswordUpdateResponse> => {
  const { token, ...body } = data;
  const response = await api.put("user/forgetpasswordupdate", body, {
    params: { token },
  });
  return response.data;
};
