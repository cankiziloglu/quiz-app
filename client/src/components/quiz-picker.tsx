import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import useQuizzes from '@/hooks/useQuizzes';
import useAttempt from '@/hooks/useAttempt';
import { Attempt } from '@/lib/types';
import { Question } from '@/lib/types';
import useQuizContext from '@/hooks/useQuizContext';
import useAuthContext from '@/hooks/useAuthContext';

const QuizPicker = () => {
  const navigate = useNavigate();
  const [quizId, setQuizId] = useState<string>('');

  const { data: quizzes, error } = useQuizzes();

  if (error) {
    console.error(error);
  }

  const quiz = useQuizContext();
  const auth = useAuthContext();
  const attempt = useAttempt();
  const handleClick = (quizId: string) => {
    if (!quizId) {
      return;
    }
    if (auth?.authState?.name) {
      if (quiz?.attemptState?.quiz_id === quizId) {
        navigate('/quiz');
        return;
      } else {
        attempt.mutate(quizId, {
          onSuccess: (response) => {
            if ('attempt' in response) {
              const attemptInfo: Attempt = response.attempt;
              const questionsInfo: Question[] = response.shuffledQuestions;
              quiz?.setAttemptInfo(attemptInfo);
              quiz?.setQuestionsInfo(questionsInfo);
              navigate('/quiz');
            }
          },
          onError: (error) => {
            console.error(error);
          },
        });
        quiz?.setQuizTitle(
          quizzes!.filter((quiz) => quiz.quiz_id === quizId)[0].title
        );
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <Card className='w-full md:w-1/2 mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl'>Pick Your Challenge</CardTitle>
        <CardDescription className='text-xl'>
          Select a Quiz now to show what you know!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select
          value={quizId}
          onValueChange={(value) => {
            setQuizId(value);
          }}
        >
          <SelectTrigger id='quiz'>
            <SelectValue placeholder='Select a Quiz' />
          </SelectTrigger>
          <SelectContent position='popper'>
            {quizzes &&
              quizzes.map((quiz) => (
                <SelectItem key={quiz.quiz_id} value={quiz.quiz_id}>
                  {quiz.title}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter>
        <Button
          size='lg'
          className='mx-auto text-lg'
          onClick={() => handleClick(quizId)}
        >
          Start
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizPicker;
