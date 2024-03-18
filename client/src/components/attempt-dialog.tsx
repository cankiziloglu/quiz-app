import { DataTable } from '@/components/ui/data-table';
import { userAnswerColumns } from '@/components/attempt-details';
import useUserAttemptContext from '@/hooks/useUserAttemptContext';
import { UserAttemptsType } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { useState } from 'react';

const AttemptDialog = ({
  open,
  attemptId,
}: {
  open: boolean;
  attemptId: string;
}) => {
  const { getAttemptDetails } = useUserAttemptContext();

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  if (open) {
    setIsOpen(true);
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogHeader>
        <DialogTitle>Quiz Attempt Details</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <DataTable
          columns={userAnswerColumns}
          data={getAttemptDetails(attemptId) as UserAttemptsType[]}
        />
      </DialogContent>
      <DialogFooter>
        <Button variant='secondary' onClick={toggleOpen}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AttemptDialog;
