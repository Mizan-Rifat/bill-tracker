import App from 'App';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from 'layout/MainLayout';
import paths from './paths';
import Users from 'pages/users/Users';
import SignIn from 'pages/auth/SignIn';
import SignUp from 'pages/auth/SignUp';
import { AuthProtectedRoute, GuestProtectedRoute } from 'components/auth/ProtectedRoute';
// import Test from 'pages/users/Test';

export const routes = [
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            element: <AuthProtectedRoute />,
            children: [
              {
                index: true,
                element: <Users />,
              },
            ],
          },
          {
            element: <GuestProtectedRoute />,
            children: [
              {
                path: paths.signin,
                element: <SignIn />,
              },
              {
                path: paths.signup,
                element: <SignUp />,
              },
            ],
          },

          // {
          //   path: 'test',
          //   element: <Test />,
          // },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
