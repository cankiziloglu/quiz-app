import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from './ui/card';
import { Answer, Question, UserAnswer } from '@/lib/types';
import { useEffect, useState } from 'react';

type AnswerProps = {
  question: Question;
  quizState: UserAnswer[];
  setQuizInfo: (quizState: UserAnswer[]) => void;
};

const Answers = ({ question, quizState, setQuizInfo }: AnswerProps) => {
  const question_id = question.question_id;
  const answers: Answer[] = question.answers;

  const handleValueChange = (value: string) => {
    setQuizInfo([
      ...quizState.filter((item) => item.question_id !== question_id),
      { question_id, answer_id: value },
    ]);
  };

  const [answer, setAnswer] = useState<string>('');

  useEffect(() => {
    const newAnswer = quizState.find(
      (item) => item.question_id === question_id
    )?.answer_id;
    setAnswer(newAnswer || '');
  }, [question_id, quizState]);

  return (
    <Card className='p-none h-full flex flex-col justify-center'>
      <CardContent>
        <RadioGroup
          key={answer}
          onValueChange={(value) => handleValueChange(value)}
          defaultValue={answer}
        >
          {answers.map((answer: Answer) => (
            <div
              className='flex items-center space-x-2 py-2'
              key={answer.answer_id}
            >
              <RadioGroupItem
                value={answer.answer_id}
                className='mr-3'
                id={answer.answer_id}
              />
              <Label
                className='font-normal text-md md:text-xl'
                htmlFor={answer.answer_id}
              >
                {answer.content}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default Answers;
