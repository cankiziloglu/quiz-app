import { ModeToggle } from '@/components/mode-toggle';
import { AvatarIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='flex-shrink-0 flex justify-between'>
      <Link to='/' className='py-2'>
        <h1 className='font-display text-2xl'>Quiz App</h1>
      </Link>
      <div className='flex'>
        <Link to='/login' className='p-2'>
          <AvatarIcon className='size-9' />
        </Link>
        <div className='py-2'>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
