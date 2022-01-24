import { lazy, Suspense, useMemo, useEffect, useState } from 'react';
import { Button, Loader, SlidingPanel } from 'franklin-sites';
import { createMemoryHistory, createPath } from 'history';
import {
  generatePath,
  Redirect,
  Route,
  RouteChildrenProps,
  Router,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import cn from 'classnames';

import {
  misspeltHelpTuple,
  redirectFromTo,
} from '../../../shared/components/error-pages/ResourceNotFoundPage';

import { LocationToPath, Location } from '../../../app/config/urls';

import helper from '../../../shared/styles/helper.module.scss';
import styles from './styles/contextual-help.module.scss';

// Help
const HelpEntryPage = lazy(
  () => import(/* webpackChunkName: "help-entry" */ '../entry/Entry')
);
const HelpResults = lazy(
  () => import(/* webpackChunkName: "help-results" */ '../results/Results')
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

const ContextualHelpContainer = ({ articleId, onClose }: Props) => {
  const globalHistory = useHistory();
  const localHistory = useMemo(
    () =>
      createMemoryHistory({
        initialEntries: [
          articleId
            ? generatePath(LocationToPath[Location.HelpEntry], {
                accession: articleId,
              })
            : createPath({
                pathname: LocationToPath[Location.HelpResults],
                search: 'query=*',
              }),
        ],
      }),
    // Want to stick with whatever value was passed on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLocalLocation] = useState(localHistory.location);
  useEffect(
    () =>
      localHistory.listen((location) => {
        setLocalLocation(location);
      }),
    [localHistory]
  );

  return (
    <SlidingPanel
      title={
        <>
          <Button
            variant="tertiary"
            className={cn({ [helper.disabled]: !localHistory.canGo(-1) })}
            disabled={!localHistory.canGo(-1)}
            onClick={() => localHistory.go(-1)}
          >
            ←
          </Button>{' '}
          Help{' '}
          <Button
            variant="tertiary"
            className={cn({ [helper.disabled]: !localHistory.canGo(1) })}
            disabled={!localHistory.canGo(1)}
            onClick={() => localHistory.go(1)}
          >
            →
          </Button>
        </>
      }
      onClose={onClose}
      withCloseButton
      className={styles['contextual-help-panel']}
      size="small"
      position="right"
    >
      <Suspense fallback={<Loader />}>
        <Router history={localHistory}>
          <HistoryDebug />
          <Switch>
            <Route path={LocationToPath[Location.HelpEntry]}>
              {(props: RouteChildrenProps<{ accession: string }>) => (
                <HelpEntryPage inPanel {...props} />
              )}
            </Route>
            {/* Will get content from page later, for now, star search */}
            <Route path={LocationToPath[Location.HelpResults]}>
              {(props) => <HelpResults inPanel {...props} />}
            </Route>
            {/* Catch-all handler -> Redirect or not found use ResourceNotFoundPage */}
            <Route path="*">
              {({ location }) => {
                const newPathname = redirectFromTo(location.pathname, [
                  misspeltHelpTuple,
                ]);

                if (newPathname) {
                  return (
                    <Redirect to={{ ...location, pathname: newPathname }} />
                  );
                }

                // TODO: put in a useEffect
                // eslint-disable-next-line uniprot-website/use-config-location
                globalHistory.push(location);
                return null;
              }}
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </SlidingPanel>
  );
};

export default ContextualHelpContainer;
