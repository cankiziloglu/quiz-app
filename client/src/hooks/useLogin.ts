import { UserType } from '@/lib/types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }: UserType): Promise<UserType> => {
      return await axios
        .post('/api/users/login', {
          email: email,
          password: password,
        })
        .then((res) => res.data);
    },
  });
};

export default useLogin;
