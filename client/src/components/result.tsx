import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const Result = ({
  score,
  totalQuestions,
}: {
  score: number;
  totalQuestions: number;
}) => {
  const navigate = useNavigate();
  return (
    <Dialog>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Congratulations</DialogTitle>
          <DialogDescription>
            You scored <span className='text-xl font-bold'>{score}</span>{' '}
            correct answers out of{' '}
            <span className='text-xl font-bold'>{totalQuestions}</span>{' '}
            questions
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => navigate('/dashboard')}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Result;
