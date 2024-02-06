import quizService, { Quiz } from '@/services/quizUtil';
import { useQuery } from '@tanstack/react-query';

const useQuizzes = () => {
  return useQuery<Quiz[], Error>({
    queryKey: ['quizzes'],
    queryFn: quizService.getAll,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

export default useQuizzes;
