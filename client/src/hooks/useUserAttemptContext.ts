import { UserAttemptContext } from '@/context/userAttempt-context';
import { useContext } from 'react';

const useUserAttemptContext = () => {
  const context = useContext(UserAttemptContext);
  if (!context) {
    throw new Error(
      'useUserAttemptContext must be used within a UserAttemptProvider'
    );
  }
  return context;
};

export default useUserAttemptContext;
