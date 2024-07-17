import { useCallback, useMemo } from 'react';

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

type NodeData = { start: number; end: number; color: string };

const trackLength = 100;

const getPercentageOfTotal = (total: number) => (x: number) =>
  (100 * x) / total;

const BuscoView = ({ report }: { report: BuscoReport }) => {
  const protvistaTrackElement = useCustomElement(
    /* istanbul ignore next */
    () => import(/* webpackChunkName: "protvista-track" */ 'protvista-track'),
    'protvista-track'
  );

  const buscoPartitionPercentages: Record<BuscoPartition, number> =
    useMemo(() => {
      const getPercentage = getPercentageOfTotal(report.total);
      return {
        complete: getPercentage(report.complete),
        completeSingle: getPercentage(report.completeSingle),
        completeDuplicated: getPercentage(report.completeDuplicated),
        fragmented: getPercentage(report.fragmented),
        missing: getPercentage(report.missing),
      };
    }, [report]);

  const setTrackData = useCallback(
    (node: { data: NodeData[] }): void => {
      if (node && protvistaTrackElement.defined) {
        const data: NodeData[] = [];
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
    [buscoPartitionPercentages, protvistaTrackElement.defined]
  );

  const C = formatPercentage(buscoPartitionPercentages.complete);
  const S = formatPercentage(buscoPartitionPercentages.completeSingle);
  const D = formatPercentage(buscoPartitionPercentages.completeDuplicated);
  const F = formatPercentage(buscoPartitionPercentages.fragmented);
  const M = formatPercentage(buscoPartitionPercentages.missing);
  return (
    <div className="busco-view">
      <protvistaTrackElement.name
        length={trackLength}
        height={10}
        ref={setTrackData}
      />
      {/* TODO: add after implementation from backend - the creation date of the dataset (format: 2019-01-04) */}
      <div className="busco-view__report">{`n:${report.total} · ${report.lineageDb}`}</div>
      <div>{`C:${C} (S:${S} D:${D}) F:${F} M:${M}`}</div>
    </div>
  );
};

export default BuscoView;
