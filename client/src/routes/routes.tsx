import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout';
import ErrorPage from './error-page';
import Home from './home';
import Login from './login';
import Signup from './signup';
import Quiz from './quiz';
import PrivateRoutes from './private-routes';
import Dashboard from './admin';
import Me from './me';
import UsersDashboard from '@/components/users-dashboard';
import QuizzesDashboard from '@/components/quizzes-dashboard';
import QuestionsDashboard from '@/components/questions-dashboard';
import AttemptsDashboard from '@/components/attmepts-dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Home /> },
          { path: 'login', element: <Login /> },
          { path: 'signup', element: <Signup /> },
        ],
      },
      {
        element: <PrivateRoutes />,
        errorElement: <ErrorPage />,
        children: [
          { path: 'me', element: <Me /> },
          { path: 'quiz', element: <Quiz /> },
          {
            path: 'dashboard',
            element: <Dashboard />,
            children: [
              { index: true, element: <UsersDashboard /> },
              { path: 'users', element: <UsersDashboard /> },
              { path: 'quizzes', element: <QuizzesDashboard /> },
              { path: 'questions', element: <QuestionsDashboard /> },
              { path: 'attempts', element: <AttemptsDashboard /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
