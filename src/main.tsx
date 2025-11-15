import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { ImageDetailPage } from '@/pages/ImageDetailPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { UploadPage } from '@/pages/UploadPage';
import { AdminDashboardPage } from '@/pages/AdminDashboardPage';
import { CollectionDetailPage } from '@/pages/CollectionDetailPage';
import { TrendingPage } from '@/pages/TrendingPage';
import { MainLayout } from '@/components/layout/MainLayout';
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/art/:id",
        element: <ImageDetailPage />,
      },
      {
        path: "/profile/:username",
        element: <ProfilePage />,
      },
      {
        path: "/upload",
        element: <UploadPage />,
      },
      {
        path: "/admin",
        element: <AdminDashboardPage />,
      },
      {
        path: "/collection/:id",
        element: <CollectionDetailPage />,
      },
      {
        path: "/trending",
        element: <TrendingPage />,
      },
    ]
  }
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)