import attemptUtil from '@/services/attemptUtil';
import { useMutation } from '@tanstack/react-query';

const useAttempt = () => {
  return useMutation({
    mutationFn: (quiz_id: string) => {
      return attemptUtil.post({quiz_id});
    },
  });
};

export default useAttempt;
