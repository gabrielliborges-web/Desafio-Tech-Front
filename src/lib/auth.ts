import type { SignupRequest, AuthResponse, LoginRequest } from "../types/auth";
import { api } from "./api";

export const signupRequest = async (
  data: SignupRequest
): Promise<AuthResponse> => {
  try {
    const response = await api.post("/auth/signup", data);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.errors?.join(", ") ||
      error.response?.data?.error ||
      "Erro ao cadastrar usuário.";
    throw new Error(message);
  }
};

export const loginRequest = async (
  data: LoginRequest
): Promise<AuthResponse> => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error: any) {
    const apiError = error.response?.data;

    if (apiError?.errors) {
      throw new Error(apiError.errors.join(", "));
    }

    if (apiError?.error) {
      throw new Error(apiError.error);
    }

    throw new Error("Erro ao fazer login.");
  }
};
