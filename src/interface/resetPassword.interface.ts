export interface IResetPasswordRequest {
  email: string;
  newPassword: string;
  rePassword: string;
  resetCode: string;
}

export interface IResetPasswordResponse {
  message: string;
  token?: string;
}

export interface IResetPasswordError {
  general?: string;
  email?: string[];
  newPassword?: string[];
  rePassword?: string[];
  resetCode?: string[];
}