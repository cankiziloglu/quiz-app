import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout';
import ErrorPage from './Error-page';
import Home from './Home';
import Login from './login';
import Signup from './signup';
import Quiz from './quiz';
import PrivateRoutes from './private-routes';
import Admin from './admin';

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
          { path: 'quiz', element: <Quiz /> },
          { path: 'admin', element: <Admin /> },
        ],
      },
    ],
  },
]);

export default router;
