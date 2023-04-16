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
import App from './pages/App'
import './style.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <ErrorPage />
  },
  {
    path: "/cul",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
