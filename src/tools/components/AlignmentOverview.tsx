import React, { FC, useCallback } from 'react';
import { v1 } from 'uuid';
import ProtvistaTrack from 'protvista-track';
import { loadWebComponent } from '../../shared/utils/utils';
import { FullAlignmentSegments, SegmentTrackData } from '../utils/sequences';

loadWebComponent('protvista-track', ProtvistaTrack);

type AlignmentOverviewProps = {
  height: string;
  data: FullAlignmentSegments[];
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
  const setTrackData = useCallback(
    (node): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = data;
      }
    },
    [data]
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

const AlignmentOverview: FC<AlignmentOverviewProps> = ({
  height,
  data,
  length,
  highlight,
}) => {
  if (!data || data.length < 1) {
    return null;
  }

  const singleTrackHeight = Math.floor(parseInt(height, 10) / data.length);

  return (
    <div>
      {data.map(({ trackData }) => {
        return (
          <AlignmentOverviewTrack
            data={trackData}
            height={singleTrackHeight}
            length={length}
            highlight={highlight}
            key={v1()}
          />
        );
      })}
    </div>
  );
};

export default AlignmentOverview;
