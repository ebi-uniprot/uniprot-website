import { useState } from 'react';

import SequenceLengthHistogram from './SequenceLengthHistogram';

import { StatisticsItem } from './StatisticsPage';

import styles from './styles/sequence-length.module.scss';

const binSizeOptions = [1, 10, 100] as const;
export type BinSizeOptions = typeof binSizeOptions[number];

type Props = {
  reviewed: StatisticsItem[];
  unreviewed: StatisticsItem[];
};
const SequenceLength = ({ reviewed, unreviewed }: Props) => {
  const [binSize, setBinSize] = useState<BinSizeOptions>(binSizeOptions[0]);

  return (
    <div className={styles['container']}>
      <fieldset className={styles['bin-size-selection']}>
        <label>
          Bin size:{' '}
          <select
            value={binSize}
            onChange={(event) =>
              setBinSize(+event.target.value as BinSizeOptions)
            }
          >
            {binSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </fieldset>
      <SequenceLengthHistogram items={reviewed} binSize={binSize} />
    </div>
  );
};

export default SequenceLength;
