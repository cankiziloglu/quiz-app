import useAuthContext from '@/hooks/useAuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Label } from './ui/label';
import useEditAccount from '@/hooks/useEditAccount';
import { useToast } from './ui/use-toast';
import { editAccountSchema } from '@/lib/schemas';

type EditType = 'none' | 'account' | 'password';

const AccountDetails = () => {
  const auth = useAuthContext();
  const [edit, setEdit] = useState<EditType>('none');

  const editUser = useEditAccount();

  const { toast } = useToast();

  type editAccountSchemaType = z.infer<typeof editAccountSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<editAccountSchemaType>({
    resolver: zodResolver(editAccountSchema),
    defaultValues: {
      name: auth?.authState?.name,
      email: auth?.authState?.email,
    },
  });

  const onSubmitDetails = (data: editAccountSchemaType) => {
    const userData = {
      name: data!.name!,
      email: data!.email!,
    };
    editUser.mutate(userData, {
      onSuccess: (response) => {
        auth?.setAuthState({
          ...auth!.authState!,
          name: response.name,
          email: response.email,
          role: response.role,
        });
        setEdit('none');
        toast({ description: 'Details changed successfully' });
      },
      onError: () => {
        console.error('error');
      },
    });
  };

  const onSubmitPassword = (data: editAccountSchemaType) => {
    const userData = {
      name: data!.name!,
      email: data!.email!,
      password: data!.password!,
    };
    editUser.mutate(userData, {
      onSuccess: (response) => {
        auth?.setAuthState({
          ...auth!.authState!,
          name: response.name,
          email: response.email,
          role: response.role,
        });
        setEdit('none');
        toast({ description: 'Password changed successfully' });
      },
      onError: () => {
        console.error('error');
      },
    });
  };

  return (
    <>
      <Card className='rounded-none'>
        <CardHeader>
          <CardTitle>{auth?.authState?.name}</CardTitle>
          <CardDescription>{auth?.authState?.email}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant='ghost' onClick={() => setEdit('account')}>
            Change Details
          </Button>
          <Button variant='ghost' onClick={() => setEdit('password')}>
            Change Password
          </Button>
        </CardFooter>
      </Card>
      {edit === 'account' && (
        <Card className='rounded-none'>
          <CardHeader>
            <CardTitle>Change Account Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmitDetails)}
              className='flex flex-col justify-center gap-4'
            >
              <div>
                <Label htmlFor='name'>Name</Label>
                <Input
                  type='text'
                  id='name'
                  {...register('name')}
                  autoComplete='name'
                  defaultValue={auth?.authState?.name}
                />
                {errors.name && (
                  <span className='text-red-500 text-sm'>
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor='email'>Email</Label>
                <Input
                  type='email'
                  id='email'
                  {...register('email')}
                  autoComplete='email'
                  defaultValue={auth?.authState?.email}
                />
                {errors.email && (
                  <span className='text-red-500 text-sm'>
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className='flex gap-4 justify-end'>
                <Button
                  type='button'
                  variant='outline'
                  className=''
                  onClick={() => {
                    setEdit('none');
                  }}
                >
                  Cancel
                </Button>
                <Button type='submit' size='lg'>
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      {edit === 'password' && (
        <Card className='rounded-none'>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmitPassword)}
              className='flex flex-col justify-center gap-4'
            >
              <div>
                <Label htmlFor='password'>New Password</Label>
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
              </div>
              <div>
                <Label htmlFor='cpassword'>Confirm New Password</Label>
                <Input
                  type='password'
                  id='cpassword'
                  {...register('cpassword')}
                  autoComplete='new-password'
                />
              </div>
              {errors.password && (
                <span className='text-red-500 text-sm'>
                  {errors.password.message}
                </span>
              )}
              <div className='flex gap-4 justify-end'>
                <Button
                  type='button'
                  variant='outline'
                  className=''
                  onClick={() => {
                    setEdit('none');
                  }}
                >
                  Cancel
                </Button>
                <Button type='submit' size='lg'>
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AccountDetails;
