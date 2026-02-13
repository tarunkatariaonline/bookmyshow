export type User = {
  _id: string;
  email: string;
  name: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  data: {
    user: User;
    token: string;
  };
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterResponse = {
  message: string;
  data: {
    user: User;
    token: string;
  };
};

export type UpdateProfilePayload = {
  name: string;
  email: string;
};

export type UpdateProfileResponse = {
  message: string;
  data: {
    user: User;
  };
};

export type GetProfileResponse = {
  message: string;
  user: User;
};

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ChangePasswordResponse = {
  message: string;
};

export type ForgotPasswordMailPayload = {
  email: string;
};

export type ForgotPasswordMailResponse = {
  message: string;
  user?: User;
};

export type ForgotPasswordUpdatePayload = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type ForgotPasswordUpdateResponse = {
  message: string;
};
