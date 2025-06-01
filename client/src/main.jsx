import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Route, RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import ErrorElement from './pages/ErrorElement.jsx'
import Landing from './pages/Landing'
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: <div>Dashboard Page</div>,
      },
      {
        path: "/support",
        element: <div>Support Page</div>,
      },
      {
        path: "/docs",
        element: <div>Documentation Page</div>,
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
