import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router";
import './index.css'
import App from './App.jsx'
import AuthProvider from './Context/AuthProvider.jsx'
import MainRoute from './Routers/MainRoute.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={MainRoute}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
