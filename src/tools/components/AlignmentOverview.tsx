import React, { FC, useCallback } from 'react';
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
  const marginBottom = Math.floor(height / 6);
  const setTrackData = useCallback(
    (node): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = data;
        // not supported yet in protvista-track
        // node.margin = {
        //   bottom: marginBottom,
        // };
      }
    },
    [data]
  );

  return (
    <protvista-track
      height={height - marginBottom}
      ref={setTrackData}
      length={length}
      layout="overlapping"
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
      {data.map(({ trackData }, index) => {
        return (
          <AlignmentOverviewTrack
            data={trackData}
            height={singleTrackHeight}
            length={length}
            highlight={highlight}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          />
        );
      })}
    </div>
  );
};

export default AlignmentOverview;
