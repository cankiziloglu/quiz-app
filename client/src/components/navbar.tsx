import { ModeToggle } from '@/components/mode-toggle';
import { Link } from 'react-router-dom';
import { UserToggle } from './user-toggle';

const NavBar = () => {
  return (
    <nav className='flex-shrink-0 flex justify-between'>
      <Link to='/' className='py-2'>
        <h1 className='font-display text-2xl'>Quiz App</h1>
      </Link>
      <div className='flex'>
      <div className='py-2 px-2'>
          <UserToggle />
        </div>
        <div className='py-2 px-2'>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
