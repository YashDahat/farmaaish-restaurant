export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  token: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}