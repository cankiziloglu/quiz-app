import { Button } from '@/components/ui/button';
import { HomeIcon } from '@radix-ui/react-icons';
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div
      id='error-page'
      className='flex flex-col justify-center items-center text-center p-8 mx-auto'
    >
      <h1 className='text-3xl font-display p-8'>Oops!</h1>
      <h3 className='text-xl font-bold p-8'>
        {isRouteErrorResponse(error)
          ? 'Page Not Found'
          : 'Sorry, an unexpected error has occurred.'}
      </h3>
      <Button size='lg' onClick={() => navigate('/')}>
        <HomeIcon className='mr-3 h-4 w-4' />
        Go to Home
      </Button>
    </div>
  );
}
