import { useMutation } from '@tanstack/react-query';
import { Attempt, UserAnswer } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';

const useSubmitAttempt = (attemptId: string) => {

  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (answers: UserAnswer[]): Promise<Attempt> => {
      const res = await fetch(`/api/attempt/${attemptId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });
      if (!res.ok) {
        toast({ description: 'Something went wrong when submitting the quiz' })
      }

      return res.json();
    },
  });
};

export default useSubmitAttempt;
