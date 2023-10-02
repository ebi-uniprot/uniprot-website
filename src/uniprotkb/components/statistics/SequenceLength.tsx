import { useMemo, useState } from 'react';
import cn from 'classnames';

import SequenceLengthLinePlot from './SequenceLengthLinePlot';

import { StatisticsItem } from './StatisticsPage';

import styles from './styles/sequence-length.module.scss';

export type SequenceLengthCount = [number, number];

const getSequenceLengthCounts = (
  items: StatisticsItem[]
): SequenceLengthCount[] =>
  items
    .map(({ name, count }): SequenceLengthCount => [+name, count])
    .sort(([aLength], [bLength]) => aLength - bLength);

type Dataset = 'reviewed' | 'unreviewed';

type Props = {
  reviewed: StatisticsItem[];
  unreviewed: StatisticsItem[];
};
const SequenceLength = ({ reviewed, unreviewed }: Props) => {
  const [dataset, setDataset] = useState<Dataset>('reviewed');

  const [reviewedSequenceLengthCounts, unreviewedSequenceLengthCounts] =
    useMemo(
      () => [
        getSequenceLengthCounts(reviewed),
        getSequenceLengthCounts(unreviewed),
      ],
      [reviewed, unreviewed]
    );

  return (
    <div className={styles.container}>
      <div className={cn('button-group', styles.buttons)}>
        <fieldset>
          <label>
            Data:{' '}
            <select
              value={dataset}
              onChange={(event) => setDataset(event.target.value as Dataset)}
            >
              <option value="reviewed">Reviewed (Swiss-Prot)</option>
              <option value="unreviewed">Unreviewed (TrEMBL)</option>
            </select>
          </label>
        </fieldset>
      </div>
      <SequenceLengthLinePlot
        sequenceLengthCounts={
          dataset === 'reviewed'
            ? reviewedSequenceLengthCounts
            : unreviewedSequenceLengthCounts
        }
      />
    </div>
  );
};

export default SequenceLength;
