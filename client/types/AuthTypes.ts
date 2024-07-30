import { Dispatch, SetStateAction } from "react";

export type AuthProps = {
  setAuth: Dispatch<SetStateAction<LoginResponse | undefined>>;
};

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    createAt: string;
    updatedAt: string;
  };

  token: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignupError {
  response?: {
    data?: {
      message?: string;
      errors?: string[];
    };
  };
}

export interface User {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}
