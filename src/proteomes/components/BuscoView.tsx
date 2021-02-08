import { FC, useCallback, useMemo } from 'react';

import useCustomElement from '../../shared/hooks/useCustomElement';
import { formatPercentage } from '../../shared/utils/utils';

import { BuscoReport } from '../adapters/proteomesConverter';

import './styles/busco-view.scss';

export const buscoPartitions = [
  'completeSingle',
  'completeDuplicated',
  'fragmented',
  'missing',
];

export type BuscoPartition = typeof buscoPartitions[number];

export const buscoPartitionToColor: Record<BuscoPartition, string> = {
  completeSingle: '#BCE875',
  completeDuplicated: '#0BA5A6',
  fragmented: '#EECBA4',
  missing: '#314BB4',
};

const BuscoView: FC<{ report: BuscoReport }> = ({ report }) => {
  const ceDefined = useCustomElement(
    /* istanbul ignore next */
    () => import(/* webpackChunkName: "protvista-track" */ 'protvista-track'),
    'protvista-track'
  );

  const trackLength = 100;

  const getPercentageOfTotal = useCallback(
    (x: number) => (100 * x) / report.total,
    [report]
  );

  const buscoPartitionPercentages: Record<BuscoPartition, number> = useMemo(
    () => ({
      completeSingle: getPercentageOfTotal(report.completeSingle),
      completeDuplicated: getPercentageOfTotal(report.completeDuplicated),
      fragmented: getPercentageOfTotal(report.fragmented),
      missing: getPercentageOfTotal(report.missing),
    }),
    [report, getPercentageOfTotal]
  );

  const setTrackData = useCallback(
    (node): void => {
      if (node && ceDefined) {
        const data: { start: number; end: number; color: string }[] = [];
        let start = 0;
        for (const buscoTrackFeature of buscoPartitions) {
          const end = start + buscoPartitionPercentages[buscoTrackFeature];
          data.push({
            start,
            end,
            color: buscoPartitionToColor[buscoTrackFeature],
          });
          start = end;
        }
        // eslint-disable-next-line no-param-reassign
        node.data = data;
      }
    },
    [buscoPartitionPercentages, ceDefined]
  );

  const C = formatPercentage(getPercentageOfTotal(report.complete));
  const S = formatPercentage(buscoPartitionPercentages.completeSingle);
  const D = formatPercentage(buscoPartitionPercentages.completeDuplicated);
  const F = formatPercentage(buscoPartitionPercentages.fragmented);
  const M = formatPercentage(buscoPartitionPercentages.missing);
  return (
    <div className="busco-view">
      <protvista-track length={trackLength} height={10} ref={setTrackData} />
      <div>{`n:${report.total} · ${report.lineageDb}`}</div>
      <div>{`C:${C} (S:${S} D:${D}) F:${F} M:${M}`}</div>
    </div>
  );
};

export default BuscoView;
