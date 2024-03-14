import { useMutation } from '@tanstack/react-query';
import { AttemptType } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';

const useAttempt = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (quiz_id: string): Promise<AttemptType> => {
      const res = await fetch('/api/attempt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quiz_id }),
      });
      if (!res.ok) {
        toast({ description: 'Something went wrong when submitting the quiz' });
      }

      return res.json();
    },
  });
};

export default useAttempt;
