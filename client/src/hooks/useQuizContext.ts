import { QuizContext } from '@/context/quiz-context';
import { useContext } from 'react';

const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
};

export default useQuizContext;
