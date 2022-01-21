import { lazy, Suspense } from 'react';
import { Loader, SlidingPanel } from 'franklin-sites';
import {
  generatePath,
  MemoryRouter,
  Route,
  RouteChildrenProps,
  Switch,
  useLocation,
} from 'react-router-dom';

import { LocationToPath, Location } from '../../../app/config/urls';

import styles from './styles/contextual-help.module.scss';

// Help
const HelpEntryPage = lazy(
  () => import(/* webpackChunkName: "help-entry" */ '../entry/Entry')
);
const HelpResults = lazy(
  () => import(/* webpackChunkName: "help-results" */ '../results/Results')
);
const ResourceNotFoundPage = lazy(
  () =>
    import(
      /* webpackChunkName: "resource-not-found" */ '../../../shared/components/error-pages/ResourceNotFoundPage'
    )
);

type Props = {
  articleId?: string;
  onClose: (reason: 'outside' | 'button' | 'navigation' | 'escape') => void;
};

const HistoryDebug = () => {
  const { pathname, search } = useLocation();
  return (
    <pre>
      {pathname}
      {search}
    </pre>
  );
};

const ContextualHelpContainer = ({ articleId, onClose }: Props) => (
  <SlidingPanel
    title="Help"
    onClose={onClose}
    withCloseButton
    className={styles['contextual-help-panel']}
    size="small"
    position="right"
  >
    <Suspense fallback={<Loader />}>
      <MemoryRouter
        initialEntries={[
          articleId
            ? generatePath(LocationToPath[Location.HelpEntry], {
                accession: articleId,
              })
            : {
                pathname: LocationToPath[Location.HelpResults],
                search: 'query=*',
              },
        ]}
      >
        <HistoryDebug />
        <Switch>
          {/* Will get content from page later, for now, star search */}
          <Route path={LocationToPath[Location.HelpEntry]}>
            {(props: RouteChildrenProps<{ accession: string }>) => (
              <HelpEntryPage inPanel {...props} />
            )}
          </Route>
          <Route path={LocationToPath[Location.HelpResults]}>
            {(props) => <HelpResults inPanel {...props} />}
          </Route>
          {/* Catch-all handler -> Redirect or not found use ResourceNotFoundPage */}
          <Route path="*" component={ResourceNotFoundPage} />
        </Switch>
      </MemoryRouter>
    </Suspense>
  </SlidingPanel>
);

export default ContextualHelpContainer;
