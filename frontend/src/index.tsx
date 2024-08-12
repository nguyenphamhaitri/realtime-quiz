import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from 'router';
import { store } from 'store';
import 'assets/css/index.scss';
import reportWebVitals from './reportWebVitals';
import Layout from 'components/Layout';
import { createStandaloneToast } from '@chakra-ui/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
export const { ToastContainer, toast } = createStandaloneToast();
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>,
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
