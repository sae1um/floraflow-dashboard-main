import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import HealthMonitor from './pages/dashboard/health';
import MainDashboardLayout from './pages/dashboard/layout';

import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Dashboard from './pages/dashboard/main-dashboard';
import ErrorElementPage from './pages/errorElement';

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: MainDashboardLayout,
        // index: ,
        children: [
          {
            index: true,
            path: "dashboard",
            Component: Dashboard
          },
          {
            path: "health",
            Component: HealthMonitor
          }
        ]
      }
    ],
    errorElement: <ErrorElementPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

