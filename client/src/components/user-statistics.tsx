import { useQuery } from '@tanstack/react-query';

const UserStatistics = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['userAttempts'],
    queryFn: () => fetch('/api/attempt/me').then((res) => res.json()),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
  console.log(data);

  return isLoading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>Error</div>
  ) : (
    <div>UserStatistics</div>
  );
};

export default UserStatistics;
