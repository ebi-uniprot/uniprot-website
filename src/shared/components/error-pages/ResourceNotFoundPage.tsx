import { Redirect, useLocation } from 'react-router-dom';
import { Message } from 'franklin-sites';

import HTMLHead from '../HTMLHead';
import ErrorPage from './ErrorPage';

import { Namespace } from '../../types/namespaces';

import ArtWork from './svgs/404.svg';

// Regular expression magic incantations 🪄
const redirectMap = new Map<RegExp, string>([
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
  [/^\/(manual|faqs?|docs?)(?<rest>\/.*)?$/i, `/help$<rest>`],
]);

// eslint-disable-next-line consistent-return
export const redirectFromTo = (from: string) => {
  for (const [pattern, replacement] of redirectMap.entries()) {
    if (pattern.test(from)) {
      return from.replace(pattern, replacement);
    }
  }
};

const ErrorMessage = () => (
  <Message level="failure">
    <h4>Sorry, this page can&apos;t be found!</h4>
    <span>Please check the address bar for any mistakes</span>
  </Message>
);

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
