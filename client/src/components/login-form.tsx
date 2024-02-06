import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/auth-context';
import useLogin from '@/hooks/useLogin';
import axios from 'axios';

const LoginForm = () => {
  const LoginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Must be at least 8 characters long' })
      .max(20, { message: 'Must be max 20 characters long' }),
  });

  type LoginSchemaType = z.infer<typeof LoginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const login = useLogin();

  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const [authError, setAuthError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginSchemaType> = (userInfo) => {
    login.mutate(userInfo, {
      onSuccess: (data) => {
        auth?.setAuthState(data);
        navigate('/');
      },
      onError: (error: Error) => {
        if (axios.isAxiosError(error)) {
          setAuthError(error.response?.data);
        } else {
          // Handle generic error
          setAuthError('An error occurred, please try again.');
        }
      },
    });
  };

  return (
    <Card className='w-full md:w-1/2 mx-auto'>
      <CardHeader>
        <CardTitle className='text-xl'>Login</CardTitle>
        <CardDescription>
          Enter your e-mail and password to login.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col justify-center'
        >
          <div className='mb-2'>
            <Label htmlFor='email'>Email</Label>
            <Input type='email' id='email' {...register('email')} />
            {errors.email && (
              <span className='text-red-500 text-sm'>
                {errors.email.message}
              </span>
            )}
          </div>
          <div className='mb-4'>
            <Label htmlFor='password'>Password</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    type='password'
                    id='password'
                    {...register('password')}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className='text-xs text-wrap'>
                    Password should be 8-20 characters long
                  </p>
                  <p className='text-xs text-wrap'>
                    and should include at least 1 lowercase,
                  </p>
                  <p className='text-xs text-wrap'>
                    1 uppercase and 1 numeric character.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {errors.password && (
              <span className='text-red-500 text-sm'>
                {errors.password.message}
              </span>
            )}
          </div>
          <Button type='submit' size='lg' className='mx-auto'>
            Login
          </Button>
          {authError && (
            <span className='text-red-500 mx-auto mt-2 text-sm text-center'>
              {authError}
            </span>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <p className='text-sm'>
          Don't have an account?{' '}
          <Link to='/signup' className='underline underline-offset-2'>
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
