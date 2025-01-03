import useQuizzes from '@/hooks/useQuizzes';
import { Question, Quiz } from '@/lib/types';
import {
  useMutation,
  useQuery,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select';
import { SelectItem } from '@radix-ui/react-select';
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
import { useToast } from './ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { questionSchema } from '@/lib/schemas';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

export default function QuestionsDashboard() {
  const [quizId, setQuizId] = useState<string | undefined>();
  const [quiz, setQuiz] = useState<Quiz | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState<Question>();

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  // fetch quizzes from backend
  const { data: quizzes, isLoading, error } = useQuizzes();

  // Find selected Quiz
  useEffect(() => {
    setQuiz(quizzes?.find((quiz) => quiz.quiz_id === quizId));
  }, [quizzes, quizId]);

  // fetch questions from backend
  const {
    data: questions,
    isLoading: questionsLoading,
    error: questionsError,
  } = useQuery<Question[]>({
    queryKey: ['questions', quizId],
    queryFn: async () => {
      return axios
        .get(`/api/quizzes/${quizId}/questions`)
        .then((res) => res.data);
    },
    enabled: !!quizId,
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // create questions view/edit function
  function handleViewQuestion(questionId?: string) {
    if (questionId) {
      setQuestion(questions?.find((item) => questionId === item.question_id));
    } else {
      setQuestion(undefined);
    }
    toggleOpen();
  }

  // create questions table columns
  const questionsDashboardColumns: ColumnDef<Question>[] = [
    {
      accessorKey: 'content',
      header: 'Question',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const question = row.original;

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
                onClick={() => handleViewQuestion(question.question_id)}
              >
                View & Edit Question
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDeleteQuestion(question.question_id)}
              >
                Delete Question
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // create questions delete function

  const deleteQuestion = useMutation({
    mutationFn: async (questionId: string) => {
      const deleted = await fetch(
        `/api/quizzes/${quizId}/questions/${questionId}`,
        {
          method: 'DELETE',
        }
      );
      if (deleted.ok) {
        queryClient.invalidateQueries({ queryKey: ['questions'] });
      }
    },
  });
  function handleDeleteQuestion(questionId: string) {
    deleteQuestion.mutate(questionId, {
      onSuccess: () => {
        toast({ description: 'Question deleted successfully' });
      },
      onError: () => {
        toast({ description: 'Failed to delete Question' });
      },
    });
  }

  // Error and loading state handling
  if (error || questionsError) {
    return <div>There was a problem getting data</div>;
  } else if (isLoading || questionsLoading) {
    return <div>Loading...</div>;
  }

  return (
    // Select quiz to bring questions
    <>
      <div className='w-[300px]'>
        <Select value={quizId} onValueChange={setQuizId}>
          <SelectTrigger className='font-bold'>
            <SelectValue placeholder='Select a Quiz to view questions'>
              {quiz?.title}
            </SelectValue>
          </SelectTrigger>
          <SelectContent position='popper'>
            {quizzes &&
              quizzes.map((quiz) => (
                <SelectItem key={quiz.quiz_id} value={quiz.quiz_id}>
                  {quiz.title}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      {quiz && (
        <div className='flex justify-start gap-4 text-sm font-medium'>
          <span>Quiz: </span>
          <span>{quiz?.question_count} Questions</span>-
          <span>{quiz?.duration} minutes</span>
        </div>
      )}
      {questions && (
        <>
          <div className='flex justify-between items-center'>
            <Button onClick={() => handleViewQuestion()} className='my-2'>
              Create New Questions
            </Button>
            <span>{questions.length} Total Questions</span>
          </div>
          <DataTable data={questions} columns={questionsDashboardColumns} />

          <Dialog open={isOpen} onOpenChange={toggleOpen}>
            <DialogContent className='max-h-screen overflow-y-scroll overflow-x-hidden max-w-2xl text-sm'>
              <DialogHeader>
                <DialogTitle>Question Details</DialogTitle>
              </DialogHeader>
              {/* {question ? (
                <EditQuestionForm
                  question={question}
                  setQuestion={setQuestion}
                  toggleOpen={toggleOpen}
                />
              ) : ( */}
              <CreateQuestionForm
                quizId={quizId!}
                setQuestion={setQuestion}
                toggleOpen={toggleOpen}
                queryClient={queryClient}
              />
              {/* )} */}
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}

// create create questions form function
function CreateQuestionForm({
  quizId,
  setQuestion,
  toggleOpen,
  queryClient,
}: {
  quizId: string;
  setQuestion: React.Dispatch<React.SetStateAction<Question | undefined>>;
  toggleOpen: () => void;
  queryClient: QueryClient;
}) {
  const [questions, setQuestions] = useState<Question[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<Question>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      content: '',
      answers: Array(4).fill({ content: '', is_correct: false }),
    },
  });

  const createQuestion = useMutation({
    mutationFn: async (data: Question[]) => {
      const created = await fetch(`/api/quizzes/${quizId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (created.ok) {
        queryClient.invalidateQueries({ queryKey: ['questions'] });
        toggleOpen();
        setQuestion(undefined);
      }
    },
  });

  const { toast } = useToast();

  const handleCreateQuestions = () => {
    const data = getValues();
    const allQuestions = [...questions, data];
    createQuestion.mutate(allQuestions, {
      onSuccess: () => {
        toast({ description: 'Questions created successfully' });
        reset();
        setQuestions([]);
      },
      onError: () => {
        toast({ description: 'Failed to create the questions' });
      },
    });
  };

  const onSubmit = (data: Question) => {
    setQuestions((prev) => [...prev, data]);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col justify-center gap-4'
    >
      <div>
        <Label htmlFor='content'>Question</Label>
        <Textarea
          id='content'
          {...register('content')}
          placeholder='Enter the question'
        />
        {errors.content && (
          <span className='text-red-500 text-sm'>{errors.content.message}</span>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2'>
          <span className='font-medium flex-grow'>Answers</span>
          <span className='font-medium shrink'>Correct Answer</span>
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className='flex gap-4 justify-between'>
            <div className='flex-grow'>
              <Textarea
                {...register(`answers.${index}.content`)}
                placeholder={`Answer ${index + 1}`}
              />
              {errors.answers?.at?.(index)?.content && (
                <span className='text-red-500 text-sm'>
                  {errors.answers?.at?.(index)?.content?.message}
                </span>
              )}
            </div>
            <div>
              <input
                type='checkbox'
                {...register(`answers.${index}.is_correct`)}
              />
              {errors.answers?.at?.(index)?.is_correct && (
                <span className='text-red-500 text-sm'>
                  {errors.answers?.at?.(index)?.is_correct?.message}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-end gap-4'>
        <Button type='submit' className=''>
          Next Question
        </Button>
        <Button type='button' className='' onClick={handleCreateQuestions}>
          Save
        </Button>
      </div>
    </form>
  );
}
// create questions submit function

// create edit question form function
