import { ModeToggle } from '@/components/mode-toggle';
import { AvatarIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <h1 className='font-display'>Quiz-App</h1>
      <div>
        <Link to='/login'>
          <AvatarIcon />
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
