import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

import BaseLayout from '../../shared/components/layouts/BaseLayout';

import { Location, LocationToPath } from '../config/urls';

const HomePage = lazy(
  () =>
    import(
      /* webpackChunkName: "home-page" */ '../components/home-page/HomePage'
    )
);

export const routes = [
  {
    path: LocationToPath[Location.Home],
    element: (
      <BaseLayout>
        <HomePage />
        <Outlet />
      </BaseLayout>
    ),
  },
  {
    path: '/test',
    element: (
      <div>
        test page
        <Outlet />
      </div>
    ),
  },
];
