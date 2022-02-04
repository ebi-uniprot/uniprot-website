import { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Message } from 'franklin-sites';

import HTMLHead from '../HTMLHead';
import ErrorPage from './ErrorPage';

import * as logging from '../../utils/logging';

import { Namespace } from '../../types/namespaces';

import ArtWork from './svgs/404.svg';

type RedirectEntry = [pattern: RegExp, replacement: string];

export const misspeltHelpTuple: RedirectEntry = [
  /^\/(manual|faqs?|docs?|biocuration_project)(?<rest>\/.*)?$/i,
  `/help$<rest>`,
];

// Regular expression magic incantations 🪄
const redirectMap = new Map<RedirectEntry[0], RedirectEntry[1]>([
  // main data
  [/^\/uniprot(?<rest>\/.*)?$/i, `/${Namespace.uniprotkb}$<rest>`],
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
  // TODO: check final URL for those
  [/^\/upload-?lists?(?<rest>\/.*)?$/i, `/id-mapping$<rest>`],
  // help
  misspeltHelpTuple,
  // other
  [/^\/statistics?$/i, `/help/release-statistics`],
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

const ResourceNotFoundPage = () => {
  const location = useLocation();

  const newPathname = redirectFromTo(location.pathname);

  if (newPathname) {
    let state = { redirectFrom: location.pathname };
    if (location.state && typeof location.state === 'object') {
      state = { ...location.state, ...state };
    }
    return <Redirect to={{ ...location, pathname: newPathname, state }} />;
  }

  return (
    <>
      <HTMLHead>
        {/* Don't index 4xx pages */}
        <meta name="robots" content="noindex" />
      </HTMLHead>
      <ErrorPage
        artwork={<ArtWork />}
        message={<ErrorMessage />}
        data-testid="error-page"
      />
    </>
  );
};

export default ResourceNotFoundPage;
