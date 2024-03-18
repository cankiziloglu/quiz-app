import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './routes/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/auth-context';
import { QuizProvider } from './context/quiz-context';
import { UserAttemptProvider } from './context/userAttempt-context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <QuizProvider>
          <UserAttemptProvider>
            <RouterProvider router={router} />
          </UserAttemptProvider>
        </QuizProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
