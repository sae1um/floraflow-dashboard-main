import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Route, RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import ErrorElement from './pages/ErrorElement.jsx'
import Landing from './pages/Landing'

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
        element: <div>Login Page</div>,
      },
      {
        path: "/register",
        element: <div>Register Page</div>,
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
