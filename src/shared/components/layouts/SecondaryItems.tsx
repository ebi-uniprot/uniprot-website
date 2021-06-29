import {
  CSSProperties,
  useMemo,
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { useSelector } from 'react-redux';
import { sumBy } from 'lodash-es';
import {
  HelpIcon,
  EnvelopeIcon,
  BasketIcon,
  ToolboxIcon,
  Bubble,
  SlidingPanel,
} from 'franklin-sites';
import colors from '../../../../node_modules/franklin-sites/src/styles/colours.json';

import ErrorBoundary from '../error-component/ErrorBoundary';
import BasketContent from '../basket/BasketContent';

import useBasket from '../../hooks/useBasket';

import { pluralise } from '../../utils/utils';

import { LocationToPath, Location } from '../../../app/config/urls';

import { RootState } from '../../../app/state/rootInitialState';
import { Status } from '../../../tools/types/toolsStatuses';

import styles from './styles/secondary-items.module.scss';

interface Style extends CSSProperties {
  // TODO: define and extend the supported custom properties in franklin
  // TODO: find a way to expose them globally when using franklin elements
  '--main-bubble-color': string;
}

const secondaryItemIconSize = '1.4em';

const ToolsDashboard = () => {
  const [count, failure] = useSelector<
    RootState,
    [count: number, failure: boolean]
  >((state) => {
    const unseenJobs = Object.values(state.tools).filter(
      (job) => 'seen' in job && job.seen === false
    );
    return [
      unseenJobs.length,
      // at the moment, will always be false
      unseenJobs.some((job) => job.status === Status.FAILURE),
    ];
  });

  return (
    <span title="Tools dashboard" className={styles['secondary-item']}>
      <ToolboxIcon width={secondaryItemIconSize} />
      {count ? (
        <Bubble
          className={styles.bubble}
          style={
            failure
              ? ({ '--main-bubble-color': colors.failure } as Style)
              : undefined
          }
          size="small"
          title={`${count} new job ${pluralise('result', count)}`}
        >
          {count}
        </Bubble>
      ) : null}
    </span>
  );
};

const repositionArrow = (element: HTMLSpanElement) => {
  const bcr = element.getBoundingClientRect();
  const iconWidth = bcr.width;
  const xPos = bcr.x;
  return xPos + iconWidth / 2;
};

export const Basket = ({
  display,
  setDisplay,
}: {
  display: boolean;
  setDisplay: Dispatch<SetStateAction<boolean>>;
}) => {
  const [basket] = useBasket();
  const [basketButtonX, setBasketButtonX] = useState<number>();

  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!display) {
      return;
    }
    const ro = new window.ResizeObserver(() => {
      if (spanRef.current) {
        setBasketButtonX(repositionArrow(spanRef.current));
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
          onClose={() => setDisplay(false)}
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
      label: <ToolsDashboard />,
      path: LocationToPath[Location.Dashboard],
    },
    {
      label: <Basket display={displayBasket} setDisplay={setDisplayBasket} />,
      onClick: () => {
        if (!displayBasket) {
          setDisplayBasket(true);
        }
      },
    },
  ];
};

export default SecondaryItems;
