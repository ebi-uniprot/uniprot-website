import 'franklin-sites/franklin.css';
import '../../src/app/components/styles/app.scss';

import { Loader } from 'franklin-sites';
import type { ReactNode } from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import BaseLayout from '../../src/shared/components/layouts/BaseLayout';
import apiUrls from '../../src/shared/config/apiUrls/apiUrls';
import { Namespace } from '../../src/shared/types/namespaces';
import type { DatabaseInfo } from '../../src/uniprotkb/types/databaseRefs';
import {
  databaseInfoColumnsSanityCheck,
  getDatabaseInfoMaps,
} from '../../src/uniprotkb/utils/database';
import type { Route } from './+types/root';

export const links: Route.LinksFunction = () => [
  // CSS
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  // Font file
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export async function loader() {
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
}

export function headers() {
  return {
    'Accept-CH': 'Save-Data, Downlink, Device-Memory, RTT, ECT',
  };
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <BaseLayout>{children}</BaseLayout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return <Loader />;
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
