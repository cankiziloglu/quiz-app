import { Attempt, UserAnswer } from '@/lib/types';
import { Question } from '@/lib/types';
import { createContext, useState } from 'react';

type QuizContextType = {
  attemptState: Attempt;
  quizState: UserAnswer[];
  questionsState: Question[];
  quizTitle: string;
  setQuizTitle: (quizTitle: string) => void;
  setAttemptInfo: (attemptInfo: Attempt) => void;
  setQuizInfo: (quizInfo: UserAnswer[]) => void;
  setQuestionsInfo: (questionsInfo: Question[]) => void;
  clearLocalStorage: () => void;
} | null;

const QuizContext = createContext<QuizContextType>(null);

function QuizProvider({ children }: { children: React.ReactNode }) {
  const attempt =
    localStorage.getItem('attempt') &&
    (JSON.parse(localStorage.getItem('attempt') as string) as Attempt);
  const quiz =
    localStorage.getItem('quiz') &&
    (JSON.parse(localStorage.getItem('quiz') as string) as UserAnswer[]);
  const questions =
    localStorage.getItem('questions') &&
    (JSON.parse(localStorage.getItem('questions') as string) as Question[]);

  const [attemptState, setAttemptState] = useState<Attempt>(
    attempt
      ? attempt
      : {
          attempt_id: '',
          user_id: '',
          quiz_id: '',
          score: null,
          question_count: 0,
        }
  );

  const [quizState, setQuizState] = useState<UserAnswer[]>(
    quiz
      ? quiz
      : []
  );

  const [questionsState, setQuestionsState] = useState<Question[]>(
    questions
      ? questions
      : [
          {
            question_id: '',
            content: '',
            answers: [
              {
                answer_id: '',
                content: '',
              },
            ],
          },
        ]
  );

  const [quizTitle, setQuizTitle] = useState<string>('');

  const setAttemptInfo = (attemptInfo: Attempt) => {
    setAttemptState(attemptInfo);
    localStorage.setItem('attempt', JSON.stringify(attemptInfo));
  };

  const setQuizInfo = (quizInfo: UserAnswer[]) => {
    setQuizState(quizInfo);
    localStorage.setItem('quiz', JSON.stringify(quizInfo));
  };

  const setQuestionsInfo = (questionsInfo: Question[]) => {
    setQuestionsState(questionsInfo);
    localStorage.setItem('questions', JSON.stringify(questionsInfo));
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('attempt');
    localStorage.removeItem('quiz');
    localStorage.removeItem('questions');
  };

  return (
    <QuizContext.Provider
      value={{
        attemptState,
        quizState,
        questionsState,
        quizTitle,
        setQuizTitle: (quizTitle: string) => setQuizTitle(quizTitle),
        setAttemptInfo: (attemptInfo: Attempt) => setAttemptInfo(attemptInfo),
        setQuizInfo: (quizInfo: UserAnswer[]) => setQuizInfo(quizInfo),
        setQuestionsInfo: (questionsInfo: Question[]) =>
          setQuestionsInfo(questionsInfo),
        clearLocalStorage: () => clearLocalStorage(),
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizContext, QuizProvider };
