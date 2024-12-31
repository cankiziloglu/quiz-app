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
import useSignup from '@/hooks/useSignup';
import { useState } from 'react';
import axios from 'axios';
import useAuthContext from '@/hooks/useAuthContext';

const SignupForm = () => {
  const SignupSchema = z.object({
    name: z.string().min(2, { message: 'Must be at least 2 characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Must be at least 8 characters long' })
      .max(20, { message: 'Must be max 20 characters long' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message:
          'Must contain at least one uppercase, one lowercase, and one numerical character',
      }),
  });

  type SignupSchemaType = z.infer<typeof SignupSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: { email: '', password: '' },
  });

  const postSignup = useSignup();

  const auth = useAuthContext();

  const navigate = useNavigate();

  const [authError, setAuthError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<SignupSchemaType> = (userInfo) => {
    postSignup.mutate(userInfo, {
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
    <Card className='w-full md:w-1/2 mx-auto rounded-none'>
      <CardHeader>
        <CardTitle className='text-xl'>Sign up</CardTitle>
        <CardDescription>
          Enter your name, e-mail and password to sign up.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col justify-center'
        >
          <div className='mb-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              type='text'
              id='name'
              {...register('name')}
              autoComplete='name'
            />
            {errors.name && (
              <span className='text-red-500 text-sm'>
                {errors.name.message}
              </span>
            )}
          </div>
          <div className='mb-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              type='email'
              id='email'
              {...register('email')}
              autoComplete='email'
            />
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
                    autoComplete='new-password'
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
            Sign up
          </Button>
          {authError && (
            <span className='text-red-500 mx-auto mt-2 tet-sm text-center'>
              {authError}
            </span>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <p className='text-sm'>
          Already have an account?{' '}
          <Link to='/login' className='underline underline-offset-2'>
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
