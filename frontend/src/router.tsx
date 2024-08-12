import Layout from 'components/Layout';
import HomePage from 'pages/home';
import QuizPage from 'pages/quiz';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/quiz/:quizId',
        element: <QuizPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
]);
