import React, { FC } from 'react';
import { Histogram } from 'franklin-sites';
import { BlastHit } from '../../types/blastResults';
import {
  getSmallerMultiple,
  getLargerMultiple,
} from '../../../../shared/utils/utils';
import '../styles/BlastResultHitDistribution.scss';

const BlastResultHitDistribution: FC<{ hits: BlastHit[] }> = ({ hits }) => {
  const scores = hits
    .map((hit) => hit.hit_hsps.map((hsp) => hsp.hsp_score))
    .flat();
  const binSize = 100;
  const min = getSmallerMultiple(Math.min(...scores), binSize);
  const max = getLargerMultiple(Math.max(...scores), binSize);
  return (
    <div className="blast-result-hit-distribution">
      <Histogram
        values={scores}
        binSize={binSize}
        min={min}
        max={max}
        xLabel="Score"
        yLabel="Hits"
      />
    </div>
  );
};

export default BlastResultHitDistribution;
