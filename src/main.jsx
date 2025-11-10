import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router";
import './index.css';
import AuthProvider from './Context/AuthProvider.jsx';
import { CartProvider } from './Pages/Cart/CartContext.jsx';
import MainRoute from './Routers/MainRoute.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={MainRoute} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
