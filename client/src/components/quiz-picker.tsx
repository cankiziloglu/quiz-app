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

const QuizPicker = () => {
  const navigate = useNavigate();
  const [quizId, setQuizId] = useState<string>('');

  const { data: quizzes, error } = useQuizzes();

  if (error) {
    console.error(error);
  }

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
            console.log(value);
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
          onClick={() => navigate('/quiz')}
        >
          Start
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizPicker;
