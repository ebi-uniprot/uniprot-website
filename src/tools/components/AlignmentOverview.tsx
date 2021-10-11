import { FC, useCallback, memo } from 'react';

import useCustomElement from '../../shared/hooks/useCustomElement';
import { SegmentTrackData } from '../utils/sequences';

type AlignmentOverviewProps = {
  height: string;
  data: SegmentTrackData[][];
  length: number;
  highlight: string;
};

type AlignmentOverviewTrackProps = {
  height: number;
  data: SegmentTrackData[];
  length: number;
  highlight: string;
};

const AlignmentOverviewTrack: FC<AlignmentOverviewTrackProps> = ({
  data,
  highlight,
  length,
  height,
}) => {
  const ceDefined = useCustomElement(
    /* istanbul ignore next */
    () => import(/* webpackChunkName: "protvista-track" */ 'protvista-track'),
    'protvista-track'
  );

  const setTrackData = useCallback(
    (node): void => {
      if (node && ceDefined) {
        // eslint-disable-next-line no-param-reassign
        node.data = data;
      }
    },
    [data, ceDefined]
  );

  return (
    <protvista-track
      height={height}
      ref={setTrackData}
      length={length}
      layout="non-overlapping"
      highlight={highlight}
    />
  );
};

const AlignmentOverview: FC<AlignmentOverviewProps> = memo(
  ({ height, data, length, highlight }) => {
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
