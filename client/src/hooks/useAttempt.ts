import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { AttemptType } from '@/lib/types';

const useAttempt = () => {
  return useMutation({
    mutationFn: async (quiz_id: string): Promise<AttemptType> => {
      return await axios.post('/api/attempt', quiz_id).then((res) => res.data);
    },
  });
};

export default useAttempt;
