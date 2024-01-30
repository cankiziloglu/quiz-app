import APIClient from './api-client';

export type UserType = {
  user_id?: string;
  name?: string;
  email: string;
  role?: 'ADMIN' | 'USER';
  password?: string;
  created_at?: string;
  updated_at?: string;
  token?: string;
};

export const usersUtil = new APIClient<UserType>('/users');
export const loginUtil = new APIClient<UserType>('/users/login');
export const signupUtil = new APIClient<UserType>('/users/signup');
export const meUtil = new APIClient<UserType>('/users/me');
