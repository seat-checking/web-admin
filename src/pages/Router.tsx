import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PATH } from 'common/utils/constants';
import { AuthGuard } from 'components/AuthGuard';
import { DashboardLayout } from 'components/DashboardLayout';
import { GuestGuard } from 'components/GuestGuard';
import { JoinPage } from 'pages/JoinPage';
import { DragContextProvider } from 'pages/LayoutSettingPage/utils/DragContext';
import { LoginPage } from 'pages/LoginPage';

const LayoutSettingPage = lazy(() =>
  import('./LayoutSettingPage').then((module) => ({
    default: module.LayoutSettingPage,
  })),
);

export const router = createBrowserRouter([
  {
    path: `/${PATH.login}`,
    element: (
      <GuestGuard>
        <LoginPage />
      </GuestGuard>
    ),
  },
  {
    path: `/${PATH.join}`,
    element: (
      <GuestGuard>
        <JoinPage />
      </GuestGuard>
    ),
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        async lazy(): Promise<{ Component: React.FC }> {
          const { ShopStatusPage } = await import('./ShopStatusPage');
          return { Component: ShopStatusPage };
        },
      },
      {
        path: PATH.layout,
        element: (
          <Suspense fallback={<div>로딩...</div>}>
            <DragContextProvider>
              <LayoutSettingPage />
            </DragContextProvider>
          </Suspense>
        ),
      },
      {
        path: PATH.statistics,
        async lazy(): Promise<{ Component: React.FC }> {
          const { ShopStatisticsPage } = await import('./ShopStatisticsPage');
          return { Component: ShopStatisticsPage };
        },
      },
      {
        path: PATH.setting,
        async lazy(): Promise<{ Component: React.FC }> {
          const { ShopSettingPage } = await import('./ShopSettingPage');
          return { Component: ShopSettingPage };
        },
      },
    ],
  },

  {
    path: '*',
    element: <div>Wrong Access</div>,
  },
]);
