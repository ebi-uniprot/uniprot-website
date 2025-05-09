import cn from 'classnames';
import {
  BasketIcon,
  Bubble,
  EnvelopeIcon,
  Loader,
  SlidingPanel,
  ToolboxIcon,
} from 'franklin-sites';
import { sumBy } from 'lodash-es';
import {
  memo,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { generatePath, Link, useLocation } from 'react-router-dom';
import { schedule } from 'timing-functions';

import { Location, LocationToPath } from '../../../app/config/urls';
import { ContactLocationState } from '../../../contact/adapters/contactFormAdapter';
import useBasket from '../../hooks/useBasket';
import useJobState from '../../hooks/useJobsState';
import useSafeState from '../../hooks/useSafeState';
import useSupportsJobs from '../../hooks/useSupportsJobs';
import helper from '../../styles/helper.module.scss';
import { Namespace } from '../../types/namespaces';
import {
  PanelCloseReason,
  sendGtagEventPanelClose,
  sendGtagEventPanelOpen,
} from '../../utils/gtagEvents';
import lazy from '../../utils/lazy';
import { pluralise } from '../../utils/utils';
import { Status } from '../../workers/jobs/types/jobStatuses';
import ErrorBoundary from '../error-component/ErrorBoundary';
import styles from './styles/secondary-items.module.scss';

const BasketMiniView = lazy(
  () =>
    import(
      /* webpackChunkName: "basket-mini-view" */ '../../../basket/BasketMiniView'
    )
);

const Dashboard = lazy(
  () =>
    import(
      /* webpackChunkName: "dashboard" */ '../../../jobs/dashboard/components/Dashboard'
    )
);

const secondaryItemIconSize = '1.4em';
const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;

const getArrowX = (element: HTMLSpanElement) => {
  const bcr = element.getBoundingClientRect();
  const iconWidth = bcr.width;
  const xPos = bcr.x;
  return xPos + iconWidth / 2;
};

const statusesToNotify = new Set([
  Status.FINISHED,
  Status.FAILURE,
  Status.ERRORED,
]);

const JobsDashboard = () => {
  const jobs = useJobState();
  const { pathname } = useLocation();

  const count = useMemo(() => {
    const now = new Date();
    return Object.values(jobs ?? {}).filter(
      (job) =>
        'seen' in job &&
        job.seen === false &&
        statusesToNotify.has(job.status) &&
        now.getTime() - new Date(job.timeCreated).getTime() < SEVEN_DAYS
    ).length;
  }, [jobs]);

  const [display, setDisplay] = useState(false);
  const close = useCallback((reason: PanelCloseReason) => {
    sendGtagEventPanelClose('job_dashboard', reason);
    setDisplay(false);
  }, []);
  const [buttonX, setButtonX] = useSafeState<number | undefined>(undefined);

  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!display) {
      return;
    }
    const ro = new window.ResizeObserver(() => {
      schedule().then(() => {
        if (ref.current) {
          setButtonX(getArrowX(ref.current));
        }
      });
    });
    ro.observe(document.body);

    return () => ro.unobserve(document.body);
  }, [display, setButtonX]);

  return (
    <>
      <Link
        ref={ref}
        to={LocationToPath[Location.Dashboard]}
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey) {
            return; // default behaviour of opening a new tab or new window
          }
          event.preventDefault();
          sendGtagEventPanelOpen('job_dashboard');
          setDisplay(true);
        }}
        title="Jobs dashboard"
        className={cn(styles['secondary-item'], helper['no-small'])}
        onPointerOver={Dashboard.preload}
        onFocus={Dashboard.preload}
      >
        <ToolboxIcon width={secondaryItemIconSize} />
        {count ? (
          <Bubble
            className={styles.bubble}
            size="small"
            title={`${count} new job ${pluralise('result', count)}`}
          />
        ) : null}
      </Link>
      {display && (
        <SlidingPanel
          title={
            <Link
              className={styles['link-in-panel-title']}
              to={LocationToPath[Location.Dashboard]}
              onClick={() => close('full-view')}
            >
              <ToolboxIcon width="0.8em" /> Job results
            </Link>
          }
          position="right"
          size="medium"
          onClose={close}
          arrowX={buttonX}
          pathname={pathname}
        >
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <Dashboard onFullView={() => close('full-view')} />
            </Suspense>
          </ErrorBoundary>
        </SlidingPanel>
      )}
    </>
  );
};

const Basket = () => {
  const [basket] = useBasket();
  const { pathname } = useLocation();

  const [display, setDisplay] = useState(false);
  const close = useCallback((reason: PanelCloseReason) => {
    sendGtagEventPanelClose('basket', reason);
    setDisplay(false);
  }, []);
  const [buttonX, setButtonX] = useSafeState<number | undefined>(undefined);

  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!display) {
      return;
    }
    const ro = new window.ResizeObserver(() => {
      schedule().then(() => {
        if (ref.current) {
          setButtonX(getArrowX(ref.current));
        }
      });
    });
    ro.observe(document.body);

    return () => ro.unobserve(document.body);
  }, [display, setButtonX]);

  const count = useMemo(
    () => sumBy(Array.from(basket.values()), 'size'),
    [basket]
  );

  return (
    <>
      <Link
        ref={ref}
        to={generatePath(LocationToPath[Location.Basket], {
          namespace: Namespace.uniprotkb,
        })}
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey) {
            return; // default behaviour of opening a new tab or new window
          }
          event.preventDefault();
          sendGtagEventPanelOpen('basket');
          setDisplay(true);
        }}
        title="Basket"
        className={cn(styles['secondary-item'], helper['no-small'])}
        onPointerOver={BasketMiniView.preload}
        onFocus={BasketMiniView.preload}
      >
        <BasketIcon width={secondaryItemIconSize} />
        {count ? (
          <Bubble
            className={styles.bubble}
            size="small"
            title={`${count} ${pluralise('item', count)} in the basket`}
          >
            {count}
          </Bubble>
        ) : null}
      </Link>
      {display && (
        <SlidingPanel
          title={
            <Link
              className={styles['link-in-panel-title']}
              to={generatePath(LocationToPath[Location.Basket], {
                namespace: Namespace.uniprotkb,
              })}
              onClick={() => close('full-view')}
            >
              <BasketIcon width="0.8em" /> My Basket
            </Link>
          }
          position="right"
          size="medium"
          onClose={close}
          arrowX={buttonX}
          className={styles['basket-panel']}
          pathname={pathname}
        >
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <BasketMiniView onFullView={() => close('full-view')} />
            </Suspense>
          </ErrorBoundary>
        </SlidingPanel>
      )}
    </>
  );
};

const SecondaryItems = () => {
  const supportsJobs = useSupportsJobs();
  return (
    <>
      {supportsJobs && <JobsDashboard />}
      <Basket />
      <Link<ContactLocationState>
        to={(location) => ({
          pathname: LocationToPath[Location.ContactGeneric],
          state: { referrer: location },
        })}
        title="Contact"
        className={styles['secondary-item']}
      >
        <EnvelopeIcon width={secondaryItemIconSize} />
      </Link>
      <Link to={LocationToPath[Location.HelpResults]}>Help</Link>
    </>
  );
};

export default memo(SecondaryItems);
