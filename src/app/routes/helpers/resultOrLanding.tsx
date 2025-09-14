import { type ComponentType } from 'react';
import { Navigate, useSearchParams } from 'react-router';

import { SingleColumnLayout } from '../../../shared/components/layouts/SingleColumnLayout';

// Helper component to render a landing page or the results page depending on
// the presence of absence of a query and of a corresponding landing page
export default function resultsOrLanding(
  ResultsPage: ComponentType,
  LandingPage?: ComponentType
) {
  return () => {
    const [searchParams] = useSearchParams();
    // If there is a query is the URL
    if (searchParams.has('query')) {
      // ...and the query has a value
      if (searchParams.get('query')) {
        return <ResultsPage />;
      }
      // otherwise, if empty query value, redirect to star search
      return <Navigate to="?query=*" replace />;
    }
    // If no query at all, redirect to a landing page if it exists
    if (LandingPage) {
      return (
        <SingleColumnLayout>
          <LandingPage />
        </SingleColumnLayout>
      );
    }
    // Otherwise, if no landing page, redirect to star search
    return <Navigate to="?query=*" replace />;
  };
}
