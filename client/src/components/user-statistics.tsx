import { DataTable } from './ui/data-table';
import {
  AttemptDetailsType,
  TransformedAttempt,
  UserAttemptsType,
} from '@/lib/types';
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from './ui/use-toast';

const UserStatistics = () => {
  const { data, error, isLoading } = useQuery<UserAttemptsType[]>({
    queryKey: ['userAttempts'],
    queryFn: () =>
      fetch('/api/attempt/me', {
        credentials: 'include', // Add this to include cookies
      }).then((res) => res.json()),
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });

  const userAttempts = data?.map((attempt) => ({
    attempt_id: attempt.attempt_id,
    quiz_title: attempt.quiz?.title,
    created_at: new Date(attempt.created_at as string).toDateString(),
    score: `${attempt.score} / ${attempt.question_count}`,
  }));

  const getAttemptDetails = (attemptId: string): AttemptDetailsType[] => {
    const attemptDetails = data
      ?.find((attempt) => attempt.attempt_id === attemptId)
      ?.userAnswers?.map((attempt) => ({
        question: attempt.question?.content,
        answer: attempt.answer?.content,
        is_correct: attempt.answer?.is_correct,
      })) as AttemptDetailsType[]; // Add type assertion here
    return attemptDetails;
  };

  const userAttemptColumns: ColumnDef<TransformedAttempt>[] = [
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
              <DropdownMenuItem
                onClick={() => handleDeleteAttempt(attempt.attempt_id!)}
              >
                Delete Attempt
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const userAnswerColumns: ColumnDef<AttemptDetailsType>[] = [
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
      cell: ({ row }) => {
        const isCorrect = row.original.is_correct;
        return isCorrect ? (
          <span className='text-green-600'>Yes</span>
        ) : (
          <span className='text-red-600'>No</span>
        );
      },
      // footer: (rows) => {
      //   const correctCount = rows.filter((row) => row.original.is_correct).length
      //   return `${correctCount} / ${rows.length}`
      // }
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [attemptId, setAttemptId] = useState('');
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleViewDetails = (attemptId: string) => {
    setAttemptId(attemptId);
    toggleOpen();
  };

  const queryClient = useQueryClient();

  const deletion = useMutation({
    mutationFn: async (attemptId: string) => {
      const deleted = await fetch(`/api/attempt/${attemptId}`, {
        method: 'DELETE',
      });
      if (deleted.ok) {
        queryClient.invalidateQueries({ queryKey: ['userAttempts'] });
      }
    },
  });

  const { toast } = useToast();
  const handleDeleteAttempt = (attemptId: string) => {
    deletion.mutate(attemptId, {
      onSuccess: () => {
        toast({ description: 'Attempt deleted successfully' });
      },
      onError: () => {
        toast({ description: 'Failed to delete attempt' });
      },
    });
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>No Attempts found</div>
  ) : (
    <>
      <DataTable columns={userAttemptColumns} data={userAttempts!} />
      <Dialog open={isOpen} onOpenChange={toggleOpen}>
        <DialogContent className='max-h-screen overflow-y-scroll max-w-full md:w-2/3 text-xs'>
          <DialogHeader>
            <DialogTitle>Quiz Attempt Details</DialogTitle>
          </DialogHeader>
          <DataTable
            columns={userAnswerColumns}
            data={getAttemptDetails(attemptId) as AttemptDetailsType[]}
          />
          <DialogFooter>
            <Button variant='secondary' onClick={toggleOpen}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserStatistics;
