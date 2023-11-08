import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomeScreen } from './pages/Home';
import { BlogScreen } from './pages/Blog';

const router = createBrowserRouter([
  {
    path:"/", 
    element: <HomeScreen/>
  }, 
  {
    path:"/blog", 
    element: <BlogScreen/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

