import LoginForm from '@/components/login-form';
import quizChallengeImage from '../assets/quiz-challenge.webp';

const Login = () => {
  return (
    <div className='flex flex-col md:flex-row flex-grow overflow-auto gap-6 justify-center place-items-center max-w-screen-lg mx-auto'>
      <img
        className='w-full md:w-1/2 h-auto max-h-[50vh] object-contain mx-auto'
        src={quizChallengeImage}
      />
      <LoginForm />
    </div>
  );
};

export default Login;
