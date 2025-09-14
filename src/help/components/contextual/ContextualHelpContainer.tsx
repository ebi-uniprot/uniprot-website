import { SlidingPanel } from 'franklin-sites';
import { StrictMode, useContext, useEffect, useMemo, useRef } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import {
  createMemoryRouter,
  type LoaderFunction,
  Outlet,
  type RouteObject,
  RouterProvider,
  useLocation,
  useNavigate,
  useRouteError,
} from 'react-router';

import { getLocationEntryPath, Location } from '../../../app/config/urls';
import resultsOrLanding from '../../../app/routes/helpers/resultOrLanding';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import { ContextualHelpContext } from '../../../shared/contexts/ContextualHelp';
import helpURL from '../../config/apiUrls';
import { HelpSearchResponse } from '../../types/apiModel';
import CatchAll from './CatchAll';
import HelpEntryPage from './Entry';
import HelpLandingPage from './Landing';
import NavigationBar from './NavigationBar';
import HelpResultsPage from './Results';
import SearchBar from './SearchBar';
import styles from './styles/contextual-help.module.scss';

const ContextualHelpLayout = () => {
  const { articlePath, globalPathname, onClose } = useContext(
    ContextualHelpContext
  );
  const navigate = useNavigate();

  useEffect(() => {
    const [articleId, hash] = (articlePath || '').split('#');
    if (articleId) {
      navigate({
        pathname: getLocationEntryPath(Location.HelpEntry, articleId),
        hash,
      });
    }
  }, [articlePath, navigate]);

  return (
    <SlidingPanel
      title={<NavigationBar />}
      onClose={onClose}
      className={styles['contextual-help-panel']}
      size="small"
      position="right"
      pathname={globalPathname}
    >
      <ErrorBoundary>
        <SearchBar />
        <Outlet />
      </ErrorBoundary>
    </SlidingPanel>
  );
};

const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const sp = new URLSearchParams(url.search);
  const query = sp.get('query');

  if (query) {
    const response = await fetch(helpURL.search({ query, facets: null }), {
      signal: request.signal,
    });
    if (!response.ok) {
      throw response.status;
    }
    const data: HelpSearchResponse = await response.json();
    if (!data.results.length) {
      throw response.status;
    }
    return data;
  }
};

const routes: RouteObject[] = [
  {
    id: 'contextual-help-root',
    Component: ContextualHelpLayout,
    loader,
    children: [
      {
        path: '/',
        children: [
          {
            path: 'help',
            children: [
              {
                index: true,
                Component: resultsOrLanding(HelpResultsPage, HelpLandingPage),
              },
              {
                path: ':accession',
                Component: HelpEntryPage,
              },
            ],
          },
          {
            path: '*',
            Component: CatchAll,
          },
        ],
      },
    ],
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: [{ pathname: '/help', state: { initial: true } }],
});

type ContextualHelpContainerProps = {
  articlePath?: string;
  onClose: (reason: 'outside' | 'x-button' | 'navigation' | 'escape') => void;
};

const ContextualHelpContainer = ({
  articlePath,
  onClose,
}: ContextualHelpContainerProps) => {
  const { pathname: globalPathname } = useLocation();
  const globalNavigate = useNavigate();

  const reactRootRef = useRef<Root>();

  const contextValue = useMemo(
    () => ({ articlePath, onClose, globalPathname, globalNavigate }),
    [articlePath, onClose, globalPathname, globalNavigate]
  );

  useEffect(() => {
    if (!reactRootRef.current) {
      return;
    }
    reactRootRef.current.render(
      <StrictMode>
        <ContextualHelpContext.Provider value={contextValue}>
          <RouterProvider router={router} />
        </ContextualHelpContext.Provider>
      </StrictMode>
    );
  }, [contextValue]);

  // Unrender everything on unmount
  useEffect(() => () => reactRootRef.current?.render(null), []);

  return (
    <div
      ref={(node) => {
        if (node) {
          // Make sure to create it only once
          reactRootRef.current = createRoot(node);
        }
      }}
    />
  );
};

export default ContextualHelpContainer;
