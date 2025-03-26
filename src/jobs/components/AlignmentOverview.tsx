import { Feature } from '@nightingale-elements/nightingale-track';
import { memo, useCallback } from 'react';

import NightingalTrackCanvasComponent from '../../shared/custom-elements/NightingaleTrackCanvas';

type AlignmentOverviewProps = {
  trackHeight: number;
  data: Feature[][];
  length: number;
  highlight: string;
};

type AlignmentOverviewTrackProps = {
  height: number;
  data: Feature[];
  length: number;
  highlight: string;
};

const AlignmentOverviewTrack = ({
  data,
  highlight,
  length,
  height,
}: AlignmentOverviewTrackProps) => {
  const setTrackData = useCallback(
    (node: { data: Feature[] } | null): void => {
      if (node) {
        node.data = data;
      }
    },
    [data]
  );

  return (
    <NightingalTrackCanvasComponent
      height={height}
      ref={setTrackData}
      length={length}
      highlight={highlight}
    />
  );
};

const AlignmentOverview = memo(
  ({ trackHeight, data, length, highlight }: AlignmentOverviewProps) =>
    !data?.length ? null : (
      <div>
        {data.map((trackData, index) => (
          <AlignmentOverviewTrack
            data={trackData}
            height={trackHeight}
            length={length}
            highlight={highlight}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          />
        ))}
      </div>
    )
);

export default AlignmentOverview;
