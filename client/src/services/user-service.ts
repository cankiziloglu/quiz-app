import APIClient from './api-client';

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
};

export default new APIClient<User>('/users');
