import { CSSProperties, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  HelpIcon,
  EnvelopeIcon,
  BasketIcon,
  ToolboxIcon,
  Bubble,
} from 'franklin-sites';
import colors from '../../../../node_modules/franklin-sites/src/styles/colours.json';

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

export const Basket = () => {
  const [basket] = useBasket();

  const count = useMemo(
    () =>
      Array.from(basket.values())
        .map((ns) => ns.size)
        .reduce((total, current) => total + current, 0),
    [basket]
  );

  return (
    <span title="Basket" className={styles['secondary-item']}>
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
  );
};

export default [
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
    label: <Basket />,
    path: '/',
  },
];
