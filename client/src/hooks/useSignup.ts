import { UserType, signupUtil } from '@/services/userUtil';
import { useMutation } from '@tanstack/react-query';

const useSignup = () => {
  return useMutation({
    mutationFn: ({ name, email, password }: UserType) => {
      return signupUtil.post({
        name: name,
        email: email,
        password: password,
      });
    },
  });
};

export default useSignup;
