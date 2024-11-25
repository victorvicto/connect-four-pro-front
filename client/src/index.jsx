import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom";
import Welcome from './pages/Welcome'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Forgotten from './pages/Forgotten'
import DashBoard from './pages/DashBoard'
import AuthRoute from './utils/AuthRoute';
import NoAuthRoute from './utils/NoAuthRoute';
import './style.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <NoAuthRoute><Welcome /></NoAuthRoute>,
        errorElement: <ErrorPage />
    },
    {
        path: "/dashboard/*",
        element: <AuthRoute><DashBoard /></AuthRoute>
    },
    {
        path: "/login",
        element: <NoAuthRoute><Login /></NoAuthRoute>
    },
    {
        path: "/register",
        element: <NoAuthRoute><Register /></NoAuthRoute>
    },
    {
        path: "/forgotten-password",
        element: <NoAuthRoute><Forgotten /></NoAuthRoute>
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
        <RouterProvider router={router} />
    // </React.StrictMode>
);
