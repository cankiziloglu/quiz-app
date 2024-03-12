import { UserType } from '@/lib/types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useSignup = () => {
  return useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: UserType): Promise<UserType> => {
      return await axios
        .post('/api/users/signup', {
          name: name,
          email: email,
          password: password,
        })
        .then((res) => res.data);
    },
  });
};

export default useSignup;
