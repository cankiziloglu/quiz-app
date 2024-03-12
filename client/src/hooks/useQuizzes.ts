import { Quiz } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useQuizzes = () => {
  return useQuery<Quiz[], Error>({
    queryKey: ['quizzes'],
    queryFn: async () => {
      return await axios.get('/api/quizzes').then((res) => res.data);
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

export default useQuizzes;
