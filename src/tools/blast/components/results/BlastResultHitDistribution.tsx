import React, { FC, useRef, useMemo, useState } from 'react';
import { Histogram, Loader } from 'franklin-sites';

import { getDataPoints, getBounds } from '../../utils/blastFacetDataUtils';

import { BlastHit } from '../../types/blastResults';

import '../styles/BlastResultHitDistribution.scss';

const nBinOptions = ['auto', 5, 10, 25, 50, 100] as const;

type BlastResultHitDistributionProps = {
  loading: boolean;
  allHits: BlastHit[];
  filteredHits: BlastHit[];
};

const BlastResultHitDistribution: FC<BlastResultHitDistributionProps> = ({
  loading,
  allHits,
  filteredHits,
}) => {
  const [nBinsValue, setNBinsValue] = useState<typeof nBinOptions[number]>(
    'auto'
  );

  const values = useMemo(() => getDataPoints(filteredHits || []), [
    filteredHits,
  ]);
  // logic to keep stale data available
  const valuesRef = useRef(values);
  if (values.score.length || !loading) {
    valuesRef.current = values;
  }

  const [unfilteredValues, bounds, optimisedBinNumber] = useMemo(
    () => [
      getDataPoints(allHits),
      getBounds(allHits),
      // see: https://en.wikipedia.org/wiki/Histogram#Square-root_choice
      // We chose the simplest implementation, 𝐤=⌈√𝐧⌉
      Math.ceil(Math.sqrt(allHits.length)),
    ],
    [allHits]
  );

  if (loading && !valuesRef.current.score.length) {
    return <Loader />;
  }

  return (
    <>
      <fieldset>
        <label>
          Number of bins:{' '}
          <select
            value={nBinsValue}
            onChange={(event) =>
              setNBinsValue(
                event.target.value === 'auto'
                  ? event.target.value
                  : (+event.target.value as typeof nBinOptions[number])
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
      {Object.entries(valuesRef.current).map(([name, values]) => (
        <div className="blast-result-hit-distribution" key={name}>
          <Histogram
            values={values}
            unfilteredValues={unfilteredValues[name]}
            nBins={nBinsValue === 'auto' ? optimisedBinNumber : nBinsValue}
            min={bounds[name].min}
            max={bounds[name].max}
            xLabel={name}
            yLabel="hits"
          />
        </div>
      ))}
    </>
  );
};

export default BlastResultHitDistribution;
