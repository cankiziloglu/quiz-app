import QuizPicker from '@/components/quiz-picker';
import quizChallengeImage from '../assets/quiz-challenge.png';

function Home() {
  return (
    <div className='grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1'>
      <div>
        <img className='mx-auto' src={quizChallengeImage} />
      </div>
      <div>
        <QuizPicker />
      </div>
    </div>
  );
}

export default Home;
