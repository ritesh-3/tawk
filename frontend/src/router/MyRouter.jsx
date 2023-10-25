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
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import NotFoundPage from '../pages/NotFoundPage';
import AccountEditPage from '../pages/home/AccountEditPage';


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
          { path: 'register', element: <RegisterPage /> },
          { path: 'forgot', element: <ForgotPasswordPage /> },
          { path: 'reset/:token', element: <ResetPasswordPage /> }
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
          { path: '/accounts/edit', element: <AccountEditPage /> },
        ]

      },
      { path: '*', element: <NotFoundPage /> }
    ])
  )
}

export default MyRouter