import { memo } from 'react';

import parseDate from '../../../shared/utils/parseDate';
import styles from './styles/Timeline.module.scss';

type Props = {
  first?: string;
  last?: string;
  start?: string;
  end?: string;
};

const Timeline = ({ first, last, start, end }: Props) => {
  const firstDate = parseDate(first)?.getTime();
  const lastDate = parseDate(last)?.getTime();
  const startDate = parseDate(start)?.getTime();
  const endDate = parseDate(end)?.getTime();

  if (!(firstDate && lastDate && startDate && endDate)) {
    return null;
  }

  const entrySpan = lastDate - firstDate;

  const left = `${100 * ((startDate - firstDate) / entrySpan)}%`;
  const width = `${100 * ((endDate - startDate) / entrySpan)}%`;

  return (
    <div
      className={styles.container}
      title={`UniParc entry life span: ${first} to ${last}.`}
    >
      <span
        className={styles.xref}
        style={{ width, left }}
        title={`Cross-reference life span within this UniParc entry: ${start} to ${end}.`}
      />
    </div>
  );
};

export default memo(Timeline);
