import LoginForm from '@/components/login-form';
import quizChallengeImage from '../assets/quiz-challenge.png';

const Login = () => {
  return (
    <main className='flex flex-col md:flex-row flex-grow overflow-auto gap-6 justify-center place-items-center max-w-screen-lg mx-auto'>
      <img
        className='w-full md:w-1/2 h-auto md:max-h-60vh object-contain mx-auto'
        src={quizChallengeImage}
      />
      <LoginForm />
    </main>
  );
};

export default Login;
