import 'franklin-sites/franklin.css';
import './styles/app.scss';

import {
  init as SentryInit,
  // reactRouterV5BrowserTracingIntegration,
  setTag as sentrySetTag,
} from '@sentry/react';
import { lazy, Suspense } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Outlet } from 'react-router';
import { sleep } from 'timing-functions';

import pkg from '../../../package.json';
import ErrorBoundary from '../../shared/components/error-component/ErrorBoundary';
import GDPR from '../../shared/components/gdpr/GDPR';
import BaseLayout from '../../shared/components/layouts/BaseLayout';
import apiUrls from '../../shared/config/apiUrls/apiUrls';
import { IDMappingDetailsProvider } from '../../shared/contexts/IDMappingDetails';
import { MessagesProvider } from '../../shared/contexts/Messages';
import useReloadApp from '../../shared/hooks/useReloadApp';
import useScrollToTop from '../../shared/hooks/useScrollToTop';
import { Namespace } from '../../shared/types/namespaces';
import { DatabaseInfo } from '../../uniprotkb/types/databaseRefs';
import {
  databaseInfoColumnsSanityCheck,
  getDatabaseInfoMaps,
} from '../../uniprotkb/utils/database';
import description from '../config/description';
import DevDeploymentWarning from './DevDeploymentWarning';

// This is hackery is to prevent define being repeatedly called for the same
// name. This has been observed in Variant viewer and Feature viewer tabs.
const originalDefine = customElements.define;
function newDefine(
  this: typeof customElements.define,
  name: string,
  constructor: CustomElementConstructor
) {
  if (!customElements.get(name)) {
    originalDefine.call(this, name, constructor);
  }
}
customElements.define = newDefine;

if (process.env.NODE_ENV !== 'development') {
  SentryInit({
    // Key
    dsn: 'https://474bb7c44e8b4a99ba4e408b5a64569b@o308327.ingest.sentry.io/5996901',
    // Release name in order to track which version is causing which report
    release: `${pkg.name}@${pkg.version}#${GIT_COMMIT_HASH}`,
    //
    // integrations: [reactRouterV5BrowserTracingIntegration({ history })],
    maxBreadcrumbs: 50,
    // Proportion of sessions being used to track performance
    // Adjust to a low value when we start getting enough data
    // tracesSampleRate: 0.01, // Not able to use this data yet, so don't track
    // Proportion of errors being reported
    // Adjust, higher if we fix errors and end up not maxing out our quota
    sampleRate: 0.02,
    // errors to be ignored completely
    ignoreErrors: [
      'chrome-extension://', // errors caused by an extension
      'chrome-extensions://', // errors caused by an extension
      'Request aborted', // aborted network requests, expected to happen
    ],
    denyUrls: [
      /didyoumean=true/i, // errors caused by Did You Mean requests
    ],
    // Programmatically filter out errors from Sentry
    // beforeSend(event, hint){
    //   if (/* condition to discard error */) {
    //     return null;
    //   }
    //   return event;
    // },
  });
  sentrySetTag('bundle', MODERN_BUNDLE ? 'modern' : 'legacy');
}

const ContextualHelp = lazy(() =>
  sleep(1000).then(
    () =>
      import(
        /* webpackChunkName: "contextual-help" */ '../../help/components/contextual/ContextualHelp'
      )
  )
);

const BackToTheTop = lazy(() =>
  sleep(1000).then(
    () =>
      import(
        /* webpackChunkName: "back-to-the-top" */ '../../shared/components/BackToTheTop'
      )
  )
);

export const loader = async () => {
  try {
    const response = await fetch(
      apiUrls.configure.allDatabases(Namespace.uniprotkb)
    );
    if (!response.ok) {
      new Response(response.statusText, { status: response.status });
    }
    const uniProtDataVersion = {
      releaseNumber: response.headers.get('x-uniprot-release'),
      releaseDate: new Date(response.headers.get('x-uniprot-release-date')!),
    };
    const data: DatabaseInfo = await response.json();
    if (process.env.NODE_ENV === 'development' && data) {
      databaseInfoColumnsSanityCheck(data);
    }
    const databaseInfoMaps = getDatabaseInfoMaps(data);
    return { uniProtDataVersion, databaseInfoMaps };
  } catch {
    throw new Response('Unexpected error', { status: 500 });
  }
};

const Root = () => {
  useReloadApp();
  useScrollToTop();

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <MessagesProvider>
          <IDMappingDetailsProvider>
            <Helmet titleTemplate="%s | UniProt" defaultTitle="UniProt">
              <meta
                name="description"
                // default description, to override wherever needed
                content={description}
              />
            </Helmet>
            <DevDeploymentWarning />
            <BaseLayout>
              <Outlet />
            </BaseLayout>
            <ErrorBoundary fallback={null}>
              <GDPR />
            </ErrorBoundary>
            <Suspense fallback={null}>
              <ErrorBoundary fallback={null}>
                <ContextualHelp />
              </ErrorBoundary>
            </Suspense>
            <Suspense fallback={null}>
              <ErrorBoundary fallback={null}>
                <BackToTheTop />
              </ErrorBoundary>
            </Suspense>
          </IDMappingDetailsProvider>
        </MessagesProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default Root;
