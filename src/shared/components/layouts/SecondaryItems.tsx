import {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
  Suspense,
} from 'react';
import { generatePath, Link } from 'react-router-dom';
import { schedule } from 'timing-functions';
import { sumBy } from 'lodash-es';
import {
  EnvelopeIcon,
  BasketIcon,
  ToolboxIcon,
  Bubble,
  SlidingPanel,
  Loader,
} from 'franklin-sites';

import ErrorBoundary from '../error-component/ErrorBoundary';

import useBasket from '../../hooks/useBasket';
import useSafeState from '../../hooks/useSafeState';
import { useToolsState } from '../../contexts/Tools';

import lazy from '../../utils/lazy';
import { pluralise } from '../../utils/utils';

import { LocationToPath, Location } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';
import { Status } from '../../../tools/types/toolsStatuses';

import styles from './styles/secondary-items.module.scss';
import { Button } from 'franklin-sites';
import { ContactLocationState } from '../../../contact/components/ContactForm';

const BasketMiniView = lazy(
  () =>
    import(
      /* webpackChunkName: "basket-mini-view" */ '../../../basket/BasketMiniView'
    )
);

const Dashboard = lazy(
  () =>
    import(
      /* webpackChunkName: "dashboard" */ '../../../tools/dashboard/components/Dashboard'
    )
);

const secondaryItemIconSize = '1.4em';

const getArrowX = (element: HTMLSpanElement) => {
  const bcr = element.getBoundingClientRect();
  const iconWidth = bcr.width;
  const xPos = bcr.x;
  return xPos + iconWidth / 2;
};

type Props = {
  display: boolean;
  close: () => void;
};

const statusesToNotify = new Set([
  Status.FINISHED,
  Status.FAILURE,
  Status.ERRORED,
]);

const ToolsDashboard = ({ display, close }: Props) => {
  const tools = useToolsState();

  const count = useMemo(
    () =>
      Object.values(tools ?? {}).filter(
        (job) =>
          'seen' in job &&
          job.seen === false &&
          statusesToNotify.has(job.status)
      ).length,
    [tools]
  );

  const [dashboardButtonX, setDashboardButtonX] = useSafeState<
    number | undefined
  >(undefined);

  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!display) {
      return;
    }
    const ro = new window.ResizeObserver(() => {
      schedule().then(() => {
        if (spanRef.current) {
          setDashboardButtonX(getArrowX(spanRef.current));
        }
      });
    });
    ro.observe(document.body);
    // eslint-disable-next-line consistent-return
    return () => ro.unobserve(document.body);
  }, [display, setDashboardButtonX]);

  return (
    <>
      <span
        title="Tools dashboard"
        className={styles['secondary-item']}
        ref={spanRef}
        onPointerOver={Dashboard.preload}
        // Not a focus target, so no need, do that when we can use a link as a
        // secondary item (after franklin's Header refactor/simplification)
        // onFocus={Dashboard.preload}
      >
        <ToolboxIcon width={secondaryItemIconSize} />
        {count ? (
          <Bubble
            className={styles.bubble}
            size="small"
            title={`${count} new job ${pluralise('result', count)}`}
          />
        ) : null}
      </span>
      {display && (
        <SlidingPanel
          title={
            <Link
              className={styles['link-in-panel-title']}
              to={LocationToPath[Location.Dashboard]}
              onClick={close}
            >
              <ToolboxIcon width="0.8em" /> Tool results
            </Link>
          }
          withCloseButton
          position="right"
          size="medium"
          onClose={close}
          arrowX={dashboardButtonX}
        >
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <Dashboard closePanel={close} />
            </Suspense>
          </ErrorBoundary>
        </SlidingPanel>
      )}
    </>
  );
};

export const Basket = ({ display, close }: Props) => {
  const [basket] = useBasket();
  const [basketButtonX, setBasketButtonX] = useSafeState<number | undefined>(
    undefined
  );

  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!display) {
      return;
    }
    const ro = new window.ResizeObserver(() => {
      schedule().then(() => {
        if (spanRef.current) {
          setBasketButtonX(getArrowX(spanRef.current));
        }
      });
    });
    ro.observe(document.body);
    // eslint-disable-next-line consistent-return
    return () => ro.unobserve(document.body);
  }, [display, setBasketButtonX]);

  const count = useMemo(
    () => sumBy(Array.from(basket.values()), 'size'),
    [basket]
  );

  return (
    <>
      <span
        title="Basket"
        className={styles['secondary-item']}
        ref={spanRef}
        onPointerOver={BasketMiniView.preload}
        // Not a focus target, so no need, do that when we can use a link as a
        // secondary item (after franklin's Header refactor/simplification)
        // onFocus={BasketMiniView.preload}
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
      </span>
      {display && (
        <SlidingPanel
          title={
            <Link
              className={styles['link-in-panel-title']}
              to={generatePath(LocationToPath[Location.Basket], {
                namespace: Namespace.uniprotkb,
              })}
              onClick={close}
            >
              <BasketIcon width="0.8em" /> My Basket
            </Link>
          }
          withCloseButton
          position="right"
          size="medium"
          onClose={close}
          arrowX={basketButtonX}
          className={styles['basket-panel']}
        >
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <BasketMiniView closePanel={close} />
            </Suspense>
          </ErrorBoundary>
        </SlidingPanel>
      )}
    </>
  );
};

const SecondaryItems = () => {
  const [displayBasket, setDisplayBasket] = useState(false);
  const closeDisplayBasket = useCallback(() => setDisplayBasket(false), []);
  const [displayDashboard, setDisplayDashboard] = useState(false);
  const closeDisplayDashboard = useCallback(
    () => setDisplayDashboard(false),
    []
  );

  return (
    <>
      <Button
        variant="tertiary"
        onClick={() => {
          if (!displayDashboard) {
            setDisplayDashboard(true);
          }
        }}
      >
        <ToolsDashboard
          display={displayDashboard}
          close={closeDisplayDashboard}
        />
      </Button>
      <Button
        variant="tertiary"
        onClick={() => {
          if (!displayBasket) {
            setDisplayBasket(true);
          }
        }}
      >
        <Basket display={displayBasket} close={closeDisplayBasket} />
      </Button>
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

export default SecondaryItems;
