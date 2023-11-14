import { HTMLAttributes, lazy, Suspense, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { createPath } from 'history';
import { Message } from 'franklin-sites';

import HTMLHead from '../HTMLHead';
import ErrorPage from './ErrorPage';
import ErrorBoundary from '../error-component/ErrorBoundary';

import * as logging from '../../utils/logging';

import { Namespace } from '../../types/namespaces';

import ArtWork from './svgs/404.img.svg';

const UniProtFooter = lazy(
  () => import(/* webpackChunkName: "footer" */ '../layouts/UniProtFooter')
);

type RedirectEntry = [pattern: RegExp, replacement: string];

export const misspeltHelpTuple: RedirectEntry = [
  /^\/(manual|faqs?|docs?|biocuration_project|program)(?<rest>\/.*)?$/i,
  `/help$<rest>`,
];

// Regular expression magic incantations 🪄
const redirectMap = new Map<RedirectEntry[0], RedirectEntry[1]>([
  // main data
  [
    /^\/(uniprot|entry|comment|alphafold)(?<rest>\/.*)?$/i,
    `/${Namespace.uniprotkb}$<rest>`,
  ],
  [/^\/unipark(?<rest>\/.*)?$/i, `/${Namespace.uniparc}$<rest>`],
  [/^\/proteome(?<rest>\/.*)?$/i, `/${Namespace.proteomes}$<rest>`],
  // supporting data
  [/^\/keyword(?<rest>\/.*)?$/i, `/${Namespace.keywords}$<rest>`],
  [
    /^\/(citation|literatures?|publications?|papers?)(?<rest>\/.*)?$/i,
    `/${Namespace.citations}$<rest>`,
  ],
  [/^\/disease(?<rest>\/.*)?$/i, `/${Namespace.diseases}$<rest>`],
  // exception, this one needs to be singular
  [
    /^\/(((cross|x)[-_ ]?)?reference(d|s)?[-_ ]?)?databases(?<rest>\/.*)?$/i,
    `/${Namespace.database}$<rest>`,
  ],
  [
    /^\/((sub[-_ ]?)?cellular[-_ ]?)?location(?<rest>\/.*)?$/i,
    `/${Namespace.locations}$<rest>`,
  ],
  // tools
  [/^\/(tools-?)?dashboard(?<rest>\/.*)?$/i, `/tool-dashboard$<rest>`],
  [/^\/peptidesearch(?<rest>\/.*)?$/i, `/peptide-search$<rest>`],
  [/^\/upload-?lists?(?<rest>\/.*)?$/i, `/id-mapping$<rest>`],
  // help
  misspeltHelpTuple,
  // release notes
  [/^\/(news|release-note)(?<rest>\/.*)?$/i, `/release-notes$<rest>`],
  // other
  [/^\/statistics?$/i, `/uniprotkb/statistics`],
  [/^\/downloads?$/i, `/help/downloads`],
]);

export const redirectFromTo = (
  from: string,
  redirectEntries: Iterable<RedirectEntry> = redirectMap.entries()
  // eslint-disable-next-line consistent-return
) => {
  for (const [pattern, replacement] of redirectEntries) {
    if (pattern.test(from)) {
      return from.replace(pattern, replacement);
    }
  }
};

const ErrorMessage = () => {
  useEffect(() => {
    logging.error('client-side 404');
  }, []);

  return (
    <Message level="failure">
      <h4>Sorry, this page can&apos;t be found!</h4>
      <span>Please check the address bar for any mistakes</span>
    </Message>
  );
};

const ResourceNotFoundPage = (props: HTMLAttributes<HTMLDivElement>) => {
  const location = useLocation();

  const newPathname = redirectFromTo(location.pathname);

  if (newPathname) {
    let state = { redirectFrom: location.pathname };
    if (location.state && typeof location.state === 'object') {
      state = { ...location.state, ...state };
    }
    const newLocation = { ...location, pathname: newPathname, state };
    const newURL = document.location.origin + createPath(newLocation);
    return (
      <>
        <HTMLHead>
          <meta httpEquiv="refresh" content={`0; URL=${newURL}`} />
        </HTMLHead>
        <Redirect to={newLocation} />
      </>
    );
  }

  return (
    <>
      <HTMLHead>
        {/* Don't index 4xx pages */}
        <meta name="robots" content="noindex" />
      </HTMLHead>
      <ErrorPage
        {...props}
        artwork={<img src={ArtWork} width="400" height="400" alt="" />}
        data-testid="error-page"
      >
        <ErrorMessage />
      </ErrorPage>
      <ErrorBoundary>
        <Suspense fallback={null}>
          <UniProtFooter />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default ResourceNotFoundPage;
