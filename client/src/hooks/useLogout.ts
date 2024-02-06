import { UserType, logoutUtil } from '@/services/userUtil';
import { useMutation } from '@tanstack/react-query';

const useLogout = () => {
  return useMutation({
    mutationFn: ({ email }: UserType) => {
      return logoutUtil.post({
        email: email,
      });
    },
  });
};

export default useLogout;
