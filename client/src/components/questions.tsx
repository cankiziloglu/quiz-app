import { Question } from '@/lib/types';
import { Card, CardContent } from './ui/card';

const Questions = ({ question }: { question: Question }) => {
  return (
    <Card className='p-none h-full flex flex-col justify-center'>
      <CardContent className='p-8'>
        <h3 className='text-md md:text-xl text-wrap'>{question.content}</h3>
      </CardContent>
    </Card>
  );
};

export default Questions;
