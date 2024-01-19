import quizService, { Quiz } from '@/services/quizService';
import { useQuery } from '@tanstack/react-query';

const useQuizzes = () => {
  return useQuery<Quiz[], Error>({
    queryKey: ['quizzes'],
    queryFn: quizService.getAll,
  });
};

export default useQuizzes;
