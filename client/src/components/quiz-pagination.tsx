import useSubmitAttempt from '@/hooks/useSubmitAttempt';
import { Button } from './ui/button';
import useQuizContext from '@/hooks/useQuizContext';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

type QuizPaginationProps = {
  question: number;
  setQuestion: (question: number) => void;
  totalQuestions: number;
};

const QuizPagination = ({
  question,
  setQuestion,
  totalQuestions,
}: QuizPaginationProps) => {
  const {
    attemptState,
    quizState,
    setQuizInfo,
    setAttemptInfo,
    setQuestionsInfo,
  } = useQuizContext();

  const attempt = useSubmitAttempt(attemptState.attempt_id || '');

  const [score, setScore] = useState<number | null>(null);

  const answers = quizState.map((question) => {
    return {
      attempt_id: attemptState.attempt_id,
      question_id: question.question_id,
      answer_id: question.answer_id,
    };
  });

  const handleSubmitQuiz = () => {
    attempt.mutate(answers, {
      onSuccess: (response) => {
        if ('score' in response) {
          const score = response.score;
          if (!score) return;
          setScore(score);
        }
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <div className='flex justify-between items-center'>
      {question !== 1 ? (
        <Button
          disabled={attempt.isPending}
          variant='ghost'
          onClick={() => setQuestion(question - 1)}
        >
          <ChevronLeftIcon /> Previous
        </Button>
      ) : (
        <div className='w-28'></div>
      )}
      <p className='text-sm'>
        Question {question} of {totalQuestions}
      </p>
      {question !== totalQuestions ? (
        <Button
          disabled={attempt.isPending}
          variant='ghost'
          onClick={() => setQuestion(question + 1)}
        >
          Next <ChevronRightIcon />
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button disabled={attempt.isPending} onClick={handleSubmitQuiz}>
              Submit
            </Button>
          </DialogTrigger>
          <DialogContent className='space-y-6 flex flex-col items-center justify-center place-items-center'>
            <DialogHeader className='space-y-6 flex flex-col items-center justify-center place-items-center'>
              <DialogTitle className='text-3xl md:text-4xl'>
                Congratulations
              </DialogTitle>
              <DialogDescription className='text-lg md:text-xl text-center'>
                You scored{' '}
                <span className='text-2xl md:text-2xl font-bold text-primary'>
                  {score}
                </span>{' '}
                correct answers out of{' '}
                <span className='text-2xl md:text-2xl font-bold text-primary'>
                  {totalQuestions}
                </span>{' '}
                questions
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => {
                  navigate('/me');
                  setQuizInfo([]);
                  setAttemptInfo({});
                  setQuestionsInfo([]);
                  queryClient.invalidateQueries({ queryKey: ['userAttempts'] });
                }}
                size='lg'
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default QuizPagination;
