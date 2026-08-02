export interface User {
  id: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}