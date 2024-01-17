import SignupForm from '@/components/signup-form';
import quizChallengeImage from '../assets/quiz-challenge.png';

const Signup = () => {
  return (
    <main className='flex flex-col md:flex-row flex-grow overflow-auto gap-6 justify-center place-items-center max-w-screen-lg mx-auto'>
      <img
        className='w-full md:w-1/2 h-auto md:max-h-60vh object-contain mx-auto'
        src={quizChallengeImage}
      />
      <SignupForm />
    </main>
  );
};

export default Signup;
