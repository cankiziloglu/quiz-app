import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { UserType } from '@/lib/types';

const useEditAccount = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: UserType): Promise<UserType> => {
      const res = await fetch(`/api/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });
      if (!res.ok) {
        toast({ description: 'Something went wrong when submitting' });
      }

      return await res.json();
    },
  });
};

export default useEditAccount;
