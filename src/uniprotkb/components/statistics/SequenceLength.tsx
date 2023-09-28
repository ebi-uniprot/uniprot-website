import { useCallback, useMemo, useState } from 'react';
import cn from 'classnames';

import SequenceLengthHistogram, {
  SequenceLengthToCounts,
} from './SequenceLengthHistogram';

import { StatisticsItem } from './StatisticsPage';

import styles from './styles/sequence-length.module.scss';

const binSizeOptions = [1, 10, 100] as const;
export type BinSizeOptions = typeof binSizeOptions[number];

const getItemMap = (items: StatisticsItem[]) => {
  const itemMap: SequenceLengthToCounts = new Map();
  for (const { name, count } of items) {
    itemMap.set(+name, count);
  }
  return itemMap;
};

const mergeItemMaps = (
  a: SequenceLengthToCounts,
  b: SequenceLengthToCounts
) => {
  const merged = new Map(a);
  for (const [sequenceLength, count] of b) {
    merged.set(sequenceLength, (merged.get(sequenceLength) || 0) + count);
  }
  return merged;
};

type Dataset = 'reviewed' | 'unreviewed';

type Props = {
  reviewed: StatisticsItem[];
  unreviewed: StatisticsItem[];
};
const SequenceLength = ({ reviewed, unreviewed }: Props) => {
  const [binSize, setBinSize] = useState<BinSizeOptions>(binSizeOptions[0]);
  const [dataset, setDataset] = useState<Dataset>('reviewed');

  const [reviewedMap, unreviewedMap] = useMemo(
    () => [getItemMap(reviewed), getItemMap(unreviewed)],
    [reviewed, unreviewed]
  );

  return (
    <div className={styles['container']}>
      <div className={cn('button-group', styles['buttons'])}>
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
        <fieldset>
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
      </div>
      <SequenceLengthHistogram
        items={dataset === 'reviewed' ? reviewedMap : unreviewedMap}
        binSize={binSize}
      />
    </div>
  );
};

export default SequenceLength;
