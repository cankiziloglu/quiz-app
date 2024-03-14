import Answers from '@/components/answers';
import Questions from '@/components/questions';
import QuizPagination from '@/components/quiz-pagination';
import useQuizContext from '@/hooks/useQuizContext';
import { Question } from '@/lib/types';
import { useState } from 'react';

const Quiz = () => {
  const { quizState, setQuizInfo, questionsState, quizTitle } =
    useQuizContext();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1);
  const question: Question = questionsState[currentQuestionIndex - 1];
  const totalQuestions = questionsState.length;

  return (
    <div className='flex flex-col w-full h-full items-center'>
      <div id='header' className='w-full py-6'>
        <h1 className='text-2xl md:text-3xl font-bold text-center'>
          {quizTitle}
        </h1>
      </div>
      <div className='flex flex-col md:flex-row flex-grow overflow-auto gap-6 justify-center items-center w-full'>
        <div id='question' className='w-full h-2/5 md:h-3/5'>
          <Questions question={question} />
        </div>
        <div id='answers' className='w-full h-3/5 md:h-3/5'>
          <Answers
            question={question}
            quizState={quizState}
            setQuizInfo={setQuizInfo}
          />
        </div>
      </div>
      <div id='pagination' className='w-full py-6'>
        <QuizPagination
          question={currentQuestionIndex}
          setQuestion={setCurrentQuestionIndex}
          totalQuestions={totalQuestions}
        />
      </div>
    </div>
  );
};

export default Quiz;
