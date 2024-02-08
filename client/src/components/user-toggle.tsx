import { AvatarIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AuthContext } from '@/context/auth-context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export function UserToggle() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <AvatarIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all' />
          <span className='sr-only'>User</span>
        </Button>
      </DropdownMenuTrigger>
      {!auth?.authState?.name && (
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => navigate('/login')}>
            Login
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/signup')}>
            Sign Up
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
      {auth?.authState?.name && (
        <DropdownMenuContent align='end'>
          {auth?.authState?.role === 'ADMIN' && (
            <DropdownMenuItem onClick={() => navigate('/dashboard')}>
              Dashboard
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => navigate('/me')}>
            Account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => auth?.logout()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
