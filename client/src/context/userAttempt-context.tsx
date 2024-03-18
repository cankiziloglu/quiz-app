import { UserAttemptsType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { createContext } from 'react';

export type AttemptDetailsType = {
  question: string;
  answer: string;
  is_correct: boolean;
};

type UserAttemptContextType = {
  userAttemts: UserAttemptsType[];
  getAttemptDetails: (attemptId: string) => AttemptDetailsType[] | undefined;
  isLoading: boolean;
  error: unknown;
} | null;

const UserAttemptContext = createContext<UserAttemptContextType>(null);

const UserAttemptProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, error, isLoading } = useQuery<UserAttemptsType[]>({
    queryKey: ['userAttempts'],
    queryFn: () => fetch('/api/attempt/me').then((res) => res.json()),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  if (!data) return null;
  const userAttemts: UserAttemptsType[] = data?.map((attempt) => ({
    attempt_id: attempt.attempt_id,
    quiz_title: attempt.quiz?.title,
    created_at: new Date(attempt.created_at as string).toDateString(),
    score: attempt.score,
  }));

  const getAttemptDetails = (attemptId: string): AttemptDetailsType[] => {
    const attemptDetails = data
      ?.find((attempt) => attempt.attempt_id === attemptId)
      ?.userAnswers?.map((attempt) => ({
        question: attempt.question?.content,
        answer: attempt.answer?.content,
        is_correct: attempt.answer?.is_correct,
      })) as AttemptDetailsType[]; // Add type assertion here
    return attemptDetails;
  };

  return (
    <UserAttemptContext.Provider
      value={{
        userAttemts,
        getAttemptDetails,
        isLoading,
        error,
      }}
    >
      {children}
    </UserAttemptContext.Provider>
  );
};

export { UserAttemptProvider, UserAttemptContext };
