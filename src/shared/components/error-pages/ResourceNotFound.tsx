import { Message } from 'franklin-sites';
import { createPath } from 'history';
import { HTMLAttributes, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';

import { CustomError } from '../../hooks/useDataApi';
import { Namespace } from '../../types/namespaces';
import * as logging from '../../utils/logging';
import HTMLHead from '../HTMLHead';
import ErrorComponent from './ErrorComponent';
import ArtWork from './svgs/404.img.svg';

type RedirectEntry = [pattern: RegExp, replacement: string];

// TODO: add logic currently in useMatchWithRedirect when creating the loader
// redirect logic in the new version of react-router
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
) => {
  for (const [pattern, replacement] of redirectEntries) {
    if (pattern.test(from)) {
      return from.replace(pattern, replacement);
    }
  }
};

const ErrorMessage = ({ error }: { error?: CustomError }) => {
  useEffect(() => {
    logging.error('client-side 404');
  }, []);

  return (
    <Message level="failure">
      <h4>Sorry, this page can&apos;t be found!</h4>
      <div>Please check the address bar for any mistakes</div>
      {error?.response?.data?.messages?.length ? (
        <div>
          Error message: <em>{error.response.data.messages}</em>
        </div>
      ) : null}
    </Message>
  );
};

type ResourceNotFoundProps = {
  error?: CustomError;
} & HTMLAttributes<HTMLDivElement>;

const ResourceNotFound = ({ error, ...props }: ResourceNotFoundProps) => {
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
        <Navigate replace to={newLocation} />
      </>
    );
  }

  return (
    <ErrorComponent
      {...props}
      artwork={<img src={ArtWork} width="400" height="400" alt="" />}
      data-testid="error-page"
    >
      <ErrorMessage error={error} />
    </ErrorComponent>
  );
};

export default ResourceNotFound;
