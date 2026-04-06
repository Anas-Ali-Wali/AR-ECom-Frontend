export interface ApplicationUser {
  id?: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  profileImage?: string;
  createdAt?: string;
}

export interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phoneNumber?: string;
  address?: string;
  profileImage?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  email: string;
  fullName: string;
}