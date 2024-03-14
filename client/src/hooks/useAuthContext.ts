import { AuthContext } from '@/context/auth-context';
import { useContext } from 'react';

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};

export default useAuthContext;
