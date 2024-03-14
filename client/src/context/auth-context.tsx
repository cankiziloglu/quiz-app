import { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import { UserType } from '@/lib/types';
import useLogout from '@/hooks/useLogout';
import { useToast } from '@/components/ui/use-toast';

type AuthContextType = {
  authState: UserType | null;
  setAuthState: (authInfo: UserType) => void;
  logout: () => void;
} | null;

const AuthContext = createContext<AuthContextType>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const token = Cookies.get('token')
    ? (Cookies.get('token') as string)
    : undefined;
  const user = Cookies.get('user')
    ? JSON.parse(Cookies.get('user') as string)
    : undefined;

  const logoutCall = useLogout();
  const { toast } = useToast();

  const [authState, setAuthState] = useState<UserType>({
    token: token ? token : '',
    user_id: user ? user.user_id : '',
    name: user ? user.name : '',
    email: user ? user.email : '',
    role: user ? user.role : '',
  });

  const setAuthInfo = (authInfo: UserType) => {
    setAuthState(authInfo);
  };

  const logout = () => {
    logoutCall.mutate(authState, {
      onSuccess: () => {
        Cookies.remove('token');
        Cookies.remove('user');
        toast({ description: 'Logged out succesfully' });
      },
      onError: (error) => {
        console.error(error);
      },
    });
    setAuthState({
      token: undefined,
      user_id: undefined,
      name: undefined,
      email: '',
      role: undefined,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: (authInfo: UserType) => setAuthInfo(authInfo),
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
