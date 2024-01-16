import QuizPicker from '@/components/quiz-picker';
import quizChallengeImage from '../assets/quiz-challenge.png';

function Home() {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-center h-fit'>
      <img
        src={quizChallengeImage}
        className='w-full max-w-lg h-auto sm:px-3'
      />
      <div className='sm:px-3'>
        <QuizPicker />
      </div>
    </div>
  );
}

export default Home;
