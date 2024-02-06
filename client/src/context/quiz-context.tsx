import { Attempt, UserAnswer } from '@/services/attemptUtil';
import { createContext, useState } from 'react';

type QuizContextType = {
  attemptState: Attempt;
  quizState: [UserAnswer];
  setAttemptInfo: (attemptInfo: Attempt) => void;
  setQuizInfo: (quizInfo: [UserAnswer]) => void;
} | null;

const QuizContext = createContext<QuizContextType>(null);

function QuizProvider({ children }: { children: React.ReactNode }) {
  const [attemptState, setAttemptState] = useState<Attempt>({
    attempt_id: '',
    user_id: '',
    quiz_id: '',
    score: 0,
    question_count: 0,
  });

  const [quizState, setQuizState] = useState<[UserAnswer]>([
    {
      attempt_id: '',
      question_id: '',
      answer_id: '',
    },
  ]);

  const setAttemptInfo = (attemptInfo: Attempt) => {
    setAttemptState(attemptInfo);
  };

  const setQuizInfo = (quizInfo: [UserAnswer]) => {
    setQuizState(quizInfo);
  };

  return (
    <QuizContext.Provider
      value={{
        attemptState,
        quizState,
        setAttemptInfo: (attemptInfo: Attempt) => setAttemptInfo(attemptInfo),
        setQuizInfo: (quizInfo: [UserAnswer]) => setQuizInfo(quizInfo),
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizContext, QuizProvider };
