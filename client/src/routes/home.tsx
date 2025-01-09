import QuizPicker from '@/components/quiz-picker';
import quizChallengeImage from '../assets/quiz-challenge.webp';

function Home() {
  return (
    <div className='flex flex-col md:flex-row flex-grow overflow-auto gap-6 justify-center items-center max-w-screen-lg'>
      <img
        className='w-full md:w-1/2 h-auto max-h-[40vh] object-fill mx-auto'
        src={quizChallengeImage}
      />

      <QuizPicker />
    </div>
  );
}

export default Home;
