import { lazy } from 'react';
import { type RouteObject } from 'react-router';

import App from '../components/App';
import GlobalContext from '../contexts/Global';

import ErrorComponent from '../../shared/components/error-component/ErrorComponent';

import { Location, LocationToPath } from '../config/urls';

const HomePage = lazy(
  () =>
    import(
      /* webpackChunkName: "home-page" */ '../components/home-page/HomePage'
    )
);
// Statistics pages
const UniProtKBStatisticsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-statistics" */ '../../uniprotkb/components/statistics/StatisticsPage'
    )
);

export const routes: RouteObject[] = [
  {
    element: (
      <GlobalContext>
        <App />
      </GlobalContext>
    ),
    errorElement: <ErrorComponent />,
    children: [
      {
        index: true,
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'uniprotkb',
        children: [
          {
            path: 'statistics',
            element: <UniProtKBStatisticsPage />,
          },
        ],
      },
    ],
  },
];
