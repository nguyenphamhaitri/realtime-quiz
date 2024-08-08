import Home from 'pages/Home';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '',
    element: <Home />,
  },
  {
    path: '*',
    element: <Navigate to="" />,
  },
]);
