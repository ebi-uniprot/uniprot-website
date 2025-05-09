import '../styles/BlastResultHitDistribution.scss';

import cn from 'classnames';
import { Histogram, Loader } from 'franklin-sites';
import { FC, useMemo, useRef, useState } from 'react';

import { BlastFacet, BlastHit } from '../../types/blastResults';
import { getBounds, getDataPoints } from '../../utils/blastFacetDataUtils';

const nBinOptions = ['auto', 5, 10, 25, 50, 100] as const;

type BlastResultHitDistributionProps = {
  loading: boolean;
  allHits: BlastHit[];
  filteredHits: BlastHit[];
};

const BlastResultHitDistribution: FC<
  React.PropsWithChildren<BlastResultHitDistributionProps>
> = ({ loading, allHits, filteredHits }) => {
  const [nBinsValue, setNBinsValue] =
    useState<(typeof nBinOptions)[number]>('auto');

  const values = useMemo(
    () => getDataPoints(filteredHits || []),
    [filteredHits]
  );
  // logic to keep stale data available
  const valuesRef = useRef(values);
  if (values[BlastFacet.SCORE].length || !loading) {
    valuesRef.current = values;
  }

  const [unfilteredValues, bounds, optimisedBinNumber] = useMemo(() => {
    const dataPoints = getDataPoints(allHits);
    return [
      dataPoints,
      getBounds(allHits),
      // see: https://en.wikipedia.org/wiki/Histogram#Square-root_choice
      // We chose the simplest implementation, 𝐤=⌈√𝐧⌉
      Math.ceil(Math.sqrt(dataPoints[BlastFacet.SCORE].length)),
    ];
  }, [allHits]);

  if (loading && !valuesRef.current[BlastFacet.SCORE].length) {
    return <Loader />;
  }

  return (
    <>
      <fieldset className="nbin-selection">
        <label>
          Number of bins:{' '}
          <select
            value={nBinsValue}
            onChange={(event) =>
              setNBinsValue(
                event.target.value === 'auto'
                  ? event.target.value
                  : (+event.target.value as (typeof nBinOptions)[number])
              )
            }
          >
            {nBinOptions.map((option) => (
              <option key={option} value={option}>
                {option}
                {option === 'auto' && ` (${optimisedBinNumber})`}
              </option>
            ))}
          </select>
        </label>
      </fieldset>
      {Object.entries(valuesRef.current).map(([name, values]) => {
        const { min, max } = bounds[name];
        if (min === max) {
          // If all values are the same then don't render the histogram
          return null;
        }
        return (
          <div className={cn('blast-result-hit-distribution', name)} key={name}>
            <Histogram
              values={values as number[]}
              unfilteredValues={unfilteredValues[name] as number[]}
              nBins={nBinsValue === 'auto' ? optimisedBinNumber : nBinsValue}
              min={min}
              max={max}
              xLabel={name}
              yLabel="hits"
              unfilteredValuesShadow={0.2}
            />
          </div>
        );
      })}
    </>
  );
};

export default BlastResultHitDistribution;
