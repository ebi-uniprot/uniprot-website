import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { sumBy } from 'lodash-es';
import {
  HelpIcon,
  EnvelopeIcon,
  BasketIcon,
  ToolboxIcon,
  Bubble,
  SlidingPanel,
} from 'franklin-sites';

import BasketContent from '../basket/BasketContent';
import Dashboard from '../../../tools/dashboard/components/Dashboard';
import ErrorBoundary from '../error-component/ErrorBoundary';

import useBasket from '../../hooks/useBasket';

import { pluralise } from '../../utils/utils';

import { LocationToPath, Location } from '../../../app/config/urls';

import { RootState } from '../../../app/state/rootInitialState';

import styles from './styles/secondary-items.module.scss';

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

const ToolsDashboard = ({ display, close }: Props) => {
  const count = useSelector<RootState, number>(
    (state) =>
      Object.values(state.tools).filter(
        (job) => 'seen' in job && job.seen === false
      ).length
  );
  const [dashboardButtonX, setDashboardButtonX] = useState<number>();

  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!display) {
      return;
    }
    const ro = new window.ResizeObserver(() => {
      if (spanRef.current) {
        setDashboardButtonX(getArrowX(spanRef.current));
      }
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
              Tool results
            </Link>
          }
          withCloseButton
          position="right"
          size="medium"
          onClose={close}
          arrowX={dashboardButtonX}
        >
          <ErrorBoundary>
            <Dashboard closePanel={close} />
          </ErrorBoundary>
        </SlidingPanel>
      )}
    </>
  );
};

export const Basket = ({ display, close }: Props) => {
  const [basket] = useBasket();
  const [basketButtonX, setBasketButtonX] = useState<number>();

  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!display) {
      return;
    }
    const ro = new window.ResizeObserver(() => {
      if (spanRef.current) {
        setBasketButtonX(getArrowX(spanRef.current));
      }
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
      <span title="Basket" className={styles['secondary-item']} ref={spanRef}>
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
          title="My Basket"
          withCloseButton
          position="right"
          size="small"
          onClose={close}
          arrowX={basketButtonX}
        >
          <ErrorBoundary>
            <BasketContent />
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

  return [
    {
      label: (
        <span title="Help" className={styles['secondary-item']}>
          <HelpIcon width={secondaryItemIconSize} />
        </span>
      ),
      // TODO: update link
      href: '//www.uniprot.org/help',
    },
    {
      label: (
        <span title="Contact" className={styles['secondary-item']}>
          <EnvelopeIcon width={secondaryItemIconSize} />
        </span>
      ),
      // TODO: update link
      href: '//www.uniprot.org/contact',
    },
    {
      label: (
        <ToolsDashboard
          display={displayDashboard}
          close={closeDisplayDashboard}
        />
      ),
      onClick: () => {
        if (!displayDashboard) {
          setDisplayDashboard(true);
        }
      },
    },
    {
      label: <Basket display={displayBasket} close={closeDisplayBasket} />,
      onClick: () => {
        if (!displayBasket) {
          setDisplayBasket(true);
        }
      },
    },
  ];
};

export default SecondaryItems;
