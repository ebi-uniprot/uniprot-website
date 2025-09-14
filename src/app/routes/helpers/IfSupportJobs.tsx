import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router';

import useSupportsJobs from '../../../shared/hooks/useSupportsJobs';

const JobsNotSupportedPage = lazy(
  () =>
    import(
      /* webpackChunkName: "jobs-not-supported" */ '../../../shared/components/error-pages/JobsNotSupported'
    )
);
export default function IfSupportsJobs() {
  const supportsJobs = useSupportsJobs();
  return (
    <Suspense>{supportsJobs ? <Outlet /> : <JobsNotSupportedPage />}</Suspense>
  );
}
