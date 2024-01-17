import QuizPicker from '@/components/quiz-picker';
import quizChallengeImage from '../assets/quiz-challenge.png';

function Home() {
  return (
    <main className='flex flex-col md:flex-row flex-grow overflow-auto gap-6 justify-center place-items-center'>
      <img
        className='w-full md:w-1/2 h-auto md:mx-h-60vh object-contain mx-auto'
        src={quizChallengeImage}
      />

      <QuizPicker />
    </main>
  );
}

export default Home;
