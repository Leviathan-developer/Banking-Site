import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home/home.jsx'
import Register from './Register/register.jsx'
import Signin from './SignUp/signin.jsx'
import Dashboard from './Dashboard/dashboard.jsx';
import Transfer from './Transfer/transfer.jsx';

function Router() {
    const router = createBrowserRouter([
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/transfer',
        element: <Transfer />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/signup',
        element: <Signin />
      },
    ]);
  
    return (
      <>
        <RouterProvider router={router} />
      </>
    );
  }
  
  export default Router;
  