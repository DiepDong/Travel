import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import TourDetail from './pages/TourDetail';
import RegionPage from './pages/RegionPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import { TourProvider } from './contexts/TourContext';
import './styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'gioi-thieu', element: <AboutPage /> },
      { path: 'region/:region', element: <RegionPage /> },
      { path: 'tour/:slug', element: <TourDetail /> },
      { path: 'lien-he', element: <ContactPage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#3aa346',
          colorInfo: '#3aa346',
          fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
          colorText: '#0e2230',
        },
      }}
    >
      <TourProvider>
        <RouterProvider router={router} />
      </TourProvider>
    </ConfigProvider>
  </React.StrictMode>
);


