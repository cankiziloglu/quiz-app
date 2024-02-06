import { AuthContext } from '@/context/auth-context';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Login from './login';

const PrivateRoutes = () => {
  // TODO: Add authentication logic here
  const auth = useContext(AuthContext);

  if (!auth?.authState?.name) {
    return <Login />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
