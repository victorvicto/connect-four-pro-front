import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Welcome from './pages/Welcome'
import App from './pages/App'
import './style.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/cul",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
