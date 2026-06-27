import api from './api';

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role?: 'traveler' | 'guardian';
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type AuthResponse = {
  success: boolean;
  message: string;
  token?: string;
  user?: AuthUser;
};

export const register = async (userData: RegisterPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', userData);
  return response.data;
};

export const login = async (userData: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', userData);
  return response.data;
};