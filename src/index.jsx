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
import './style.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Welcome />,
        errorElement: <ErrorPage />
    },
    {
        path: "/dashboard",
        element: <DashBoard />,
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/forgotten-password",
        element: <Forgotten />
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
