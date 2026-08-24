export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
  role: string;
  email_address: string;
  created_at: string;
}

export interface SignUp {
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number: string;
  address: string;
  password: string;
  confirm_password: string;
}