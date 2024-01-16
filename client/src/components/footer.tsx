import { Separator } from '@/components/ui/separator';
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';

const Footer = () => {
  return (
    <>
      <footer>
        <Separator />
        <div className='flex flex-col sm:flex-row sm:justify-between justify-center items-center p-4'>
          <small>
            &copy; Can Kiziloglu |{' '}
            <a
              className='underline'
              href='https://github.com/cankiziloglu/quiz-app'
            >
              Click here
            </a>{' '}
            to see the Github Repo
          </small>
          <div className='flex space-x-3 p-4'>
            <a href='https://github.com/cankiziloglu'>
              <GitHubLogoIcon className='size-8' />
            </a>
            <a href='https://linkedin.com/in/cankiziloglu'>
              <LinkedInLogoIcon className='size-8' />
            </a>
            <a href='https://instagram.com/cankiziloglu'>
              <InstagramLogoIcon className='size-8' />
            </a>
            <a href='https://twitter.com/CanKiziloglu'>
              <TwitterLogoIcon className='size-8' />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
