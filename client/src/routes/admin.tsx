import { AuthContext } from '@/context/auth-context';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const auth = useContext(AuthContext);

  if (auth?.authState?.role !== 'ADMIN') {
    return <Navigate to='/' />;
  }
  return <div>Dashboard</div>;
};

export default Dashboard;
