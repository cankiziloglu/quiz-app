import { AuthContext } from '@/context/auth-context';
import { useContext } from 'react';
import {
  Link,
  Navigate,
  Outlet,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Users, BookOpenCheck, FileQuestion, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  const sidebarItems = [
    { title: 'Users', icon: Users, path: 'users' },
    { title: 'Quizzes', icon: BookOpenCheck, path: 'quizzes' },
    { title: 'Questions', icon: FileQuestion, path: 'questions' },
    { title: 'Attempts', icon: BarChart2, path: 'attempts' },
  ];

  if (auth?.authState?.role !== 'ADMIN') {
    return <Navigate to='/' />;
  }

  return (
    <div className='flex flex-col md:flex-row gap-6 w-full h-full'>
      <aside className='flex flex-wrap md:flex-col gap-2 w-full md:w-1/5 md:h-full justify-center md:justify-start'>
        {sidebarItems.map((item) => (
          <Button
            asChild
            key={item.path}
            variant={params.section === item.path ? 'default' : 'outline'}
            onClick={() => navigate(`/dashboard/${item.path}`)}
            className='w-36'
          >
            <Link to={item.path}>
              <item.icon className='h-4 w-4 mr-2' />
              {item.title}
            </Link>
          </Button>
        ))}
      </aside>

      <section className='w-full md:h-full md:w-4/5 flex-grow space-y-4'>
        <Outlet />
      </section>
    </div>
  );
};

export default Dashboard;
