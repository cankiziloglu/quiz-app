import { UserType, loginUtil } from '@/services/userUtil';
import { useMutation } from '@tanstack/react-query';

const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: UserType) => {
      return loginUtil.post({
        email: email,
        password: password,
      });
    },
  });
};

export default useLogin;
