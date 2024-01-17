import Answers from '@/components/answers';
import Questions from '@/components/questions';

const Quiz = () => {
  return (
    <div className='flex flex-col md:flex-row flex-grow overflow-auto gap-6 justify-center place-items-center items-center max-w-screen-lg w-full'>
      <div id='question' className='w-full md:w-1/2'>
        <Questions />
      </div>
      <div id='answers' className='w-full md:w-1/2'>
        <Answers />
      </div>
    </div>
  );
};

export default Quiz;
