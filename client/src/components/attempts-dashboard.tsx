import { TransformedAttempt, UserAttemptsType } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { DotsVerticalIcon } from '@radix-ui/react-icons';

import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from './ui/use-toast';
import { DataTable } from './ui/data-table';
import { Input } from './ui/input';
import { Filter } from 'lucide-react';
import { useDebounce } from '@/lib/utils';

export default function AttemptsDashboard() {
  const { data, error, isLoading } = useQuery<UserAttemptsType[]>({
    queryKey: ['attempts'],
    queryFn: async () => {
      const response = await fetch(`/api/attempt`, {
        method: 'GET',
      });
      return response.json();
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });

  const userAttempts = useMemo(
    () =>
      data?.map((attempt) => ({
        user_name: attempt.user.name,
        user_id: attempt.user_id,
        attempt_id: attempt.attempt_id,
        quiz_title: attempt.quiz.title,
        quiz_id: attempt.quiz_id,
        created_at: new Date(attempt.created_at as string).toDateString(),
        score: `${attempt.score} / ${attempt.question_count}`,
      })) ?? [],
    [data]
  );

  const [filteredAttempts, setFilteredAttempts] =
    useState<TransformedAttempt[]>([]);

  useEffect(() => {
    if (userAttempts) {
      setFilteredAttempts(userAttempts);
    }
  }, [userAttempts]);

  const userAttemptColumns: ColumnDef<TransformedAttempt>[] = [
    {
      accessorKey: 'user_name',
      header: 'User',
    },
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

  const queryClient = useQueryClient();

  const deletion = useMutation({
    mutationFn: async (attemptId: string) => {
      const deleted = await fetch(`/api/attempt/${attemptId}`, {
        method: 'DELETE',
      });
      if (deleted.ok) {
        queryClient.invalidateQueries({ queryKey: ['attempts'] });
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

  function filterByUser(user: string) {
    setFilteredAttempts(
      userAttempts?.filter((attempt) =>
        attempt.user_name?.toLowerCase().includes(user.toLowerCase())
      )
    );
  }

  function filterByQuiz(quiz: string) {
    setFilteredAttempts(
      userAttempts?.filter((attempt) =>
        attempt.quiz_title?.toLowerCase().includes(quiz.toLowerCase())
      )
    );
  }

  const debouncedAttempts = useDebounce(filteredAttempts);

  return isLoading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>No Attempts found</div>
  ) : (
    <>
      <div className='flex gap-2 justify-start items-center'>
        <Filter className='w-4 min-w-4 h-4 min-h-4' />
        <Input
          placeholder='Filter by User'
          onChange={(e) => filterByUser(e.target.value)}
          className='max-w-72'
        />
        <Input
          placeholder='Filter by Quiz'
          onChange={(e) => filterByQuiz(e.target.value)}
          className='max-w-72'
        />
      </div>
      <DataTable columns={userAttemptColumns} data={debouncedAttempts!} />
    </>
  );
}
