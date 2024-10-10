import { lazy, ReactElement, Suspense } from 'react';
import { Message } from 'franklin-sites';

import ErrorBoundary from '../../error-component/ErrorBoundary';
import HTMLHead from '../../HTMLHead';
import ErrorComponent from '../ErrorComponent';

import ArtWork from '../svgs/no-results-found.img.svg';

const UniProtFooter = lazy(
  () => import(/* webpackChunkName: "footer" */ '../../layouts/UniProtFooter')
);

const ErrorMessage = () => (
  <Message level="info">
    <small>
      <h1 className="small">Sorry, no results were found!</h1>
      <span>Please try different criteria</span>
    </small>
  </Message>
);

type Props = {
  children?: ReactElement;
};

const NoResultsPage = ({ children = <ErrorMessage /> }: Props) => (
  <>
    <HTMLHead>
      {/* Don't index error pages */}
      <meta name="robots" content="noindex" />
    </HTMLHead>
    <ErrorComponent
      artwork={<img src={ArtWork} width="400" height="400" alt="" />}
    >
      {children}
    </ErrorComponent>
    <ErrorBoundary>
      <Suspense fallback={null}>
        <UniProtFooter />
      </Suspense>
    </ErrorBoundary>
  </>
);

export default NoResultsPage;
