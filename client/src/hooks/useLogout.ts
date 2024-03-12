import { UserType } from '@/lib/types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useLogout = () => {
  return useMutation({
    mutationFn: async ({ email }: UserType): Promise<UserType> => {
      return await axios
        .post('/api/users/logout', {
          email: email,
        })
        .then((res) => res.data);
    },
  });
};

export default useLogout;
