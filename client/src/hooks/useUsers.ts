import { UserType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useUsers = () => {
  return useQuery<UserType[], Error>({
    queryKey: ['users'],
    queryFn: async () => {
      return await axios.get('/api/users').then((res) => res.data);
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

export default useUsers;
