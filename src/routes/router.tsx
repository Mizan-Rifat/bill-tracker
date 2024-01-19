import App from 'App';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from 'layout/MainLayout';
import Home from 'pages/home/Home';
import paths from './paths';
import Users from 'pages/users/Users';
import Test from 'pages/users/Test';

export const routes = [
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: paths.users,
            element: <Users />,
          },
          {
            path: 'test',
            element: <Test />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
