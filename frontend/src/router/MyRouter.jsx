import React, { Suspense, lazy } from 'react'
import { Routes, Route, useRoutes } from 'react-router-dom';
import AuthLayout from '../layouts/auth/AuthLayout';
import LoginPage from '../pages/auth/LoginPage';
import MainLayout from '../layouts/main/MainLayout';
import RegisterPage from '../pages/auth/RegisterPage';
import HomePage from '../pages/home/HomePage';
import FindUsers from '../pages/home/FindUsers';
import ProfilePage from '../pages/home/ProfilePage';
import Inbox from '../pages/home/Inbox';


const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

const MyRouter = () => {
  return (
    useRoutes([
      {
        path: '/auth', element: <AuthLayout />,
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'register', element: <RegisterPage /> }
        ]
      },
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { path: '/app', element: <HomePage /> },
          { path: '/users', element: <FindUsers /> },
          { path: '/inbox', element: <Inbox /> },
          { path: '/inbox/t/:chatId/:userId', element: <Inbox /> },
          { path: '/:username', element: <ProfilePage /> },
        ]

      }
    ])
  )
}

export default MyRouter