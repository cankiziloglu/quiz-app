import { UserAttemptsType } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { DataTable } from '@/components/ui/data-table';
import useUserAttemptContext from '@/hooks/useUserAttemptContext';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { useState } from 'react';

const AttemptDetails = () => {

  const userAttemptColumns: ColumnDef<UserAttemptsType>[] = [
    // {
    //   accessorKey: 'attempt_id',
    //   header: 'ID',
    //   enableHiding: true,
    // },
    {
      accessorKey: 'quiz_title',
      header: 'Quiz',
    },
    {
      accessorKey: 'created_at',
      header: 'Date',
    },
    {
      accessorKey: 'score',
      header: 'Score',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const attempt = row.original;
        console.log(attempt);
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='text-right'>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <DotsVerticalIcon className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleViewDetails(attempt.attempt_id!)}
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete Attempt</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const userAnswerColumns: ColumnDef<UserAttemptsType>[] = [
    {
      accessorKey: 'question',
      header: 'Question',
    },
    {
      accessorKey: 'answer',
      header: 'Answer',
    },
    {
      accessorKey: 'is_correct',
      header: 'Correct?',
      // footer: (rows) => {
      //   const correctCount = rows.filter((row) => row.original.is_correct).length
      //   return `${correctCount} / ${rows.length}`
      // }
    },
  ];

  const { getAttemptDetails } = useUserAttemptContext();

  const [isOpen, setIsOpen] = useState(true);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleViewDetails = (attemptId: string) => {
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
}

export { AttemptDetails, userAttemptColumns, userAnswerColumns }