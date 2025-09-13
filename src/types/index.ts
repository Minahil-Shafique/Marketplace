export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  seller_id: string;
  created_at: string;
}

export interface AuthFormData {
  email: string;
  name?: string;
}

export interface OTPVerification {
  email: string;
  otp: string;
  expires: number;
}