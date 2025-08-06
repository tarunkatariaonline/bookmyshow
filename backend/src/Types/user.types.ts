interface IRegisterReq {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface ILoginReq {
  email: string;
  password: string;
}

interface IUpdateProfileReq {
  id: string;
  name: string;
  email: string;
}

interface IChangePasswordReq {
  id: string;
  oldPassword: string;
  newPassword: string;
}

interface IForgetPasswordUpdateReq {
  token: any;
  newPassword: string;
}

export {
  IRegisterReq,
  ILoginReq,
  IUpdateProfileReq,
  IChangePasswordReq,
  IForgetPasswordUpdateReq,
};
