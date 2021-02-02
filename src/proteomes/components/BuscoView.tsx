import { FC, useCallback, useMemo } from 'react';

import useCustomElement from '../../shared/hooks/useCustomElement';
import { formatPercentage } from '../../shared/utils/utils';

import { BuscoReport } from '../adapters/proteomesConverter';

const buscoFeatures = [
  'completeSingle',
  'completeDuplicated',
  'fragmented',
  'missing',
] as const;

type BuscoFeature = typeof buscoFeatures[number];

const buscoTrackFeatureToColor: Record<BuscoFeature, string> = {
  completeSingle: '#BCE875',
  completeDuplicated: '#0BA5A6',
  fragmented: '#EECBA4',
  missing: '#314BB4',
};

const BuscoView: FC<{ busco: BuscoReport }> = ({ busco }) => {
  const ceDefined = useCustomElement(
    /* istanbul ignore next */
    () => import(/* webpackChunkName: "protvista-track" */ 'protvista-track'),
    'protvista-track'
  );

  const trackLength = 100;

  const getPercentageOfTotal = useCallback(
    (x: number) => (100 * x) / busco.total,
    [busco]
  );

  const buscoTrackPercentages: Record<BuscoFeature, number> = useMemo(
    () => ({
      completeSingle: getPercentageOfTotal(busco.completeSingle),
      completeDuplicated: getPercentageOfTotal(busco.completeDuplicated),
      fragmented: getPercentageOfTotal(busco.fragmented),
      missing: getPercentageOfTotal(busco.missing),
    }),
    [busco, getPercentageOfTotal]
  );

  const setTrackData = useCallback(
    (node): void => {
      if (node && ceDefined) {
        const data: { start: number; end: number; color: string }[] = [];
        let start = 0;
        for (const buscoTrackFeature of buscoFeatures) {
          const end = start + buscoTrackPercentages[buscoTrackFeature];
          data.push({
            start,
            end,
            color: buscoTrackFeatureToColor[buscoTrackFeature],
          });
          start = end;
        }
        // eslint-disable-next-line no-param-reassign
        node.data = data;
      }
    },
    [buscoTrackPercentages, ceDefined]
  );

  const C = formatPercentage(getPercentageOfTotal(busco.complete));
  const S = formatPercentage(buscoTrackPercentages.completeSingle);
  const D = formatPercentage(buscoTrackPercentages.completeDuplicated);
  const F = formatPercentage(buscoTrackPercentages.fragmented);
  const M = formatPercentage(buscoTrackPercentages.missing);
  return (
    <>
      <protvista-track length={trackLength} height={10} ref={setTrackData} />
      <div>{`n:${busco.total} · ${busco.lineageDb}`}</div>
      <div>{`C:${C} (S:${S} D:${D}) F:${F} M:${M}`}</div>
    </>
  );
};

export default BuscoView;
