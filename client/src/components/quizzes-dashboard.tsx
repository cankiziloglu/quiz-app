import { Quiz } from '@/lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './ui/use-toast';
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
import { DataTable } from './ui/data-table';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quizSchema } from '@/lib/schemas';
import { Label } from './ui/label';
import { Input } from './ui/input';
import useQuizzes from '@/hooks/useQuizzes';
import { Filter } from 'lucide-react';
import { useDebounce } from '@/lib/utils';

export default function QuizzesDashboard() {
  const { data, isLoading, error } = useQuizzes();

  const [isOpen, setIsOpen] = useState(false);
  const [quiz, setQuiz] = useState<Quiz>();
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleViewDetails = (quizId?: string) => {
    if (quizId) {
      setQuiz(data?.find((item) => quizId === item.quiz_id));
    } else {
      setQuiz(undefined);
    }
    toggleOpen();
  };

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteQuiz = useMutation({
    mutationFn: async (quizId: string) => {
      const deleted = await fetch(`/api/quizzes/${quizId}`, {
        method: 'DELETE',
      });
      if (deleted.ok) {
        queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      }
    },
  });

  const handleDeleteQuiz = (userId: string) => {
    deleteQuiz.mutate(userId, {
      onSuccess: () => {
        toast({ description: 'Quiz deleted successfully' });
      },
      onError: () => {
        toast({ description: 'Failed to delete quiz' });
      },
    });
  };

  const quizzesDashboardColumns: ColumnDef<Quiz>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'question_count',
      header: 'Questions',
    },
    {
      accessorKey: 'duration',
      header: 'Duration',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const quiz = row.original;

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
                onClick={() => handleViewDetails(quiz.quiz_id!)}
              >
                View & Edit Quiz
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteQuiz(quiz.quiz_id!)}>
                Delete Quiz
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredQuizzes(data);
    }
  }, [data]);

  function filter(quiz: string) {
    setFilteredQuizzes(
      data?.filter((qu) =>
        qu.title?.toLowerCase().includes(quiz.toLowerCase())
      ) ?? []
    );
  }

  const debouncedQuizzes = useDebounce(filteredQuizzes);

  if (error) {
    console.error(error);
    return null;
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <div className='flex gap-2 justify-start items-center'>
        <Button onClick={() => handleViewDetails()} className='my-2 mr-6'>
          New Quiz
        </Button>

        <Filter className='w-4 min-w-4 h-4 min-h-4' />
        <Input
          placeholder='Filter'
          onChange={(e) => filter(e.target.value)}
          className='max-w-72'
        />
      </div>
      <DataTable columns={quizzesDashboardColumns} data={debouncedQuizzes!} />

      <Dialog open={isOpen} onOpenChange={toggleOpen}>
        <DialogContent className='max-h-screen overflow-y-scroll overflow-x-hidden max-w-2xl text-sm'>
          <DialogHeader>
            <DialogTitle>Quiz Details</DialogTitle>
          </DialogHeader>
          {quiz ? (
            <EditQuizForm
              quiz={quiz}
              setQuiz={setQuiz}
              toggleOpen={toggleOpen}
            />
          ) : (
            <CreateQuizForm setQuiz={setQuiz} toggleOpen={toggleOpen} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function EditQuizForm({
  quiz,
  setQuiz,
  toggleOpen,
}: {
  quiz: Quiz;
  setQuiz: React.Dispatch<React.SetStateAction<Quiz | undefined>>;
  toggleOpen: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Quiz>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: quiz.title,
      description: quiz.description,
      question_count: quiz.question_count,
      duration: quiz.duration,
    },
  });

  const queryClient = useQueryClient();

  const updateQuiz = useMutation({
    mutationFn: async (data: Quiz) => {
      const updated = await fetch(`/api/quizzes/${quiz.quiz_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (updated.ok) {
        queryClient.invalidateQueries({ queryKey: ['quizzes'] });
        toggleOpen();
        setQuiz(undefined);
      }
    },
  });

  const { toast } = useToast();

  const handleEditQuiz = (data: Quiz) => {
    updateQuiz.mutate(data, {
      onSuccess: () => {
        toast({ description: 'Quiz updated successfully' });
      },
      onError: () => {
        toast({ description: 'Failed to update the quiz' });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleEditQuiz)}
      className='flex flex-col justify-center gap-4'
    >
      <div>
        <Label htmlFor='title'>Title</Label>
        <Input type='text' id='title' {...register('title')} />
        {errors.title && (
          <span className='text-red-500 text-sm'>{errors.title.message}</span>
        )}
      </div>
      <div>
        <Label htmlFor='description'>Description</Label>
        <Input type='text' id='description' {...register('description')} />
        {errors.description && (
          <span className='text-red-500 text-sm'>
            {errors.description.message}
          </span>
        )}
      </div>
      <div>
        <Label htmlFor='question_count'>Question Count</Label>
        <Input
          type='number'
          id='question_count'
          {...register('question_count')}
        />
        {errors.question_count && (
          <span className='text-red-500 text-sm'>
            {errors.question_count.message}
          </span>
        )}
      </div>
      <div>
        <Label htmlFor='duration'>Duration</Label>
        <Input type='number' id='duration' {...register('duration')} />
        {errors.duration && (
          <span className='text-red-500 text-sm'>
            {errors.duration.message}
          </span>
        )}
      </div>
      <div className='flex justify-end gap-4'>
        <Button
          type='button'
          variant='outline'
          className=''
          onClick={() => {
            toggleOpen();
          }}
        >
          Cancel
        </Button>
        <Button type='submit' size='lg'>
          Save
        </Button>
      </div>
    </form>
  );
}

function CreateQuizForm({
  setQuiz,
  toggleOpen,
}: {
  setQuiz: React.Dispatch<React.SetStateAction<Quiz | undefined>>;
  toggleOpen: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Quiz>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: '',
      description: '',
      question_count: 0,
      duration: 0,
    },
  });

  const queryClient = useQueryClient();

  const createQuiz = useMutation({
    mutationFn: async (data: Quiz) => {
      const created = await fetch('/api/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (created.ok) {
        queryClient.invalidateQueries({ queryKey: ['quizzes'] });
        toggleOpen();
        setQuiz(undefined);
      }
    },
  });

  const { toast } = useToast();

  const handleCreateQuiz = (data: Quiz) => {
    createQuiz.mutate(data, {
      onSuccess: () => {
        toast({ description: 'Quiz created successfully' });
      },
      onError: () => {
        toast({ description: 'Failed to create the quiz' });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateQuiz)}
      className='flex flex-col justify-center gap-4'
    >
      <div>
        <Label htmlFor='title'>Title</Label>
        <Input type='text' id='title' {...register('title')} />
        {errors.title && (
          <span className='text-red-500 text-sm'>{errors.title.message}</span>
        )}
      </div>
      <div>
        <Label htmlFor='description'>Description</Label>
        <Input type='text' id='description' {...register('description')} />
        {errors.description && (
          <span className='text-red-500 text-sm'>
            {errors.description.message}
          </span>
        )}
      </div>
      <div>
        <Label htmlFor='question_count'>Question Count</Label>
        <Input
          type='number'
          id='question_count'
          {...register('question_count')}
        />
        {errors.question_count && (
          <span className='text-red-500 text-sm'>
            {errors.question_count.message}
          </span>
        )}
      </div>
      <div>
        <Label htmlFor='duration'>Duration</Label>
        <Input type='number' id='duration' {...register('duration')} />
        {errors.duration && (
          <span className='text-red-500 text-sm'>
            {errors.duration.message}
          </span>
        )}
      </div>
      <div className='flex justify-end gap-4'>
        <Button
          type='button'
          variant='outline'
          className=''
          onClick={() => {
            toggleOpen();
          }}
        >
          Cancel
        </Button>
        <Button type='submit' size='lg'>
          Save
        </Button>
      </div>
    </form>
  );
}
