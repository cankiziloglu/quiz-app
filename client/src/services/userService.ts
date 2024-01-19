import APIClient from './api-client';

export type User = {
  user_id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
};

export default new APIClient<User>('/users');
