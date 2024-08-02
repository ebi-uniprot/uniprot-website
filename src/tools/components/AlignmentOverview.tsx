import { Feature } from '@nightingale-elements/nightingale-track';
import { useCallback, memo } from 'react';
import NightingalTrackComponent from '../../shared/custom-elements/NightingaleTrack';

type AlignmentOverviewProps = {
  height: string;
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
        // eslint-disable-next-line no-param-reassign
        node.data = data;
      }
    },
    [data]
  );

  return (
    <NightingalTrackComponent
      height={height}
      ref={setTrackData}
      length={length}
      layout="non-overlapping"
      highlight={highlight}
    />
  );
};

const AlignmentOverview = memo(
  ({ height, data, length, highlight }: AlignmentOverviewProps) => {
    if (!data?.length) {
      return null;
    }

    const singleTrackHeight = Math.floor(parseInt(height, 10) / data.length);

    return (
      <div>
        {data.map((trackData, index) => (
          <AlignmentOverviewTrack
            data={trackData}
            height={singleTrackHeight}
            length={length}
            highlight={highlight}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          />
        ))}
      </div>
    );
  }
);

export default AlignmentOverview;
