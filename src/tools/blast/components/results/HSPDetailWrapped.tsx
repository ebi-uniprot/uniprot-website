/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import React, {
  FC,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from 'react';
import { debounce } from 'lodash-es';
import { sleep, schedule } from 'timing-functions';
import ProtvistaManager from 'protvista-manager';
import ProtvistaNavigation from 'protvista-navigation';
import ProtvistaTrack from 'protvista-track';
import ProtvistaMSA from 'protvista-msa';

import { loadWebComponent } from '../../../../shared/utils/utils';

import useSize from '../../../../shared/hooks/useSize';
import useSafeState from '../../../../shared/hooks/useSafeState';

import { ConservationOptions } from './HSPDetailPanel';
import { MsaColorScheme } from '../../../config/msaColorSchemes';

import FeatureType from '../../../../uniprotkb/types/featureType';

loadWebComponent('protvista-track', ProtvistaTrack);
loadWebComponent('protvista-msa', ProtvistaMSA);
loadWebComponent('protvista-manager', ProtvistaManager);
loadWebComponent('protvista-navigation', ProtvistaNavigation);

const widthOfAA = 20;
// number of chunks to render first
const firstPass = 4;

type Sequence = {
  name: string;
  sequence: string;
};

type Ranges = {
  hit: {
    start: number;
    end: number;
  };
  query: {
    start: number;
    end: number;
  };
};

type Chunk = {
  sequences: Sequence[];
  id: string;
  ranges: Ranges;
};

export type HSPDetailWrappedRowProps = {
  rowLength: number;
  highlightProperty: MsaColorScheme | undefined;
  conservationOptions: ConservationOptions;
  annotation: FeatureType | undefined;
  setFeatureTrackData: (node: HTMLElement) => void;
  sequences: Sequence[];
  ranges: Ranges;
};

const HSPDetailWrappedRow: FC<HSPDetailWrappedRowProps> = ({
  rowLength,
  sequences,
  ranges,
  annotation,
  setFeatureTrackData,
  conservationOptions,
  highlightProperty,
}) => {
  const setMSAAttributes = useCallback(
    (node): void => {
      if (!node) {
        return;
      }
      node.data = sequences;
    },
    [sequences]
  );

  return (
    <section
      data-testid="wrapped-hsp-detail"
      className="hsp-detail-panel__visualisation hsp-detail-panel__visualisation__wrapped-row"
    >
      <section className="query-ruler">
        <protvista-navigation
          length={rowLength}
          height={2}
          rulerstart={ranges.query.start}
        />
      </section>
      <section className="hsp-label hsp-label--msa">Alignment</section>
      <section className="hsp-detail-panel__visualisation--msa">
        <protvista-msa
          ref={setMSAAttributes}
          length={rowLength}
          colorscheme={highlightProperty}
          {...conservationOptions}
        />
      </section>
      <section className="hit-ruler">
        <protvista-navigation
          length={rowLength}
          height={2}
          rulerstart={ranges.hit.start}
        />
      </section>
      <section className="hsp-label hsp-label--track">{annotation}</section>
      <section className="hsp-detail-panel__visualisation--track">
        <protvista-track
          ref={setFeatureTrackData}
          length={ranges.hit.end - ranges.hit.start + 1}
          layout="non-overlapping"
          displaystart={ranges.hit.start}
          displayend={ranges.hit.end}
        />
      </section>
    </section>
  );
};

export type HSPDetailWrappedProps = {
  managerRef: (node: HTMLElement) => void;
  hsp_align_len: number;
  highlightProperty: MsaColorScheme | undefined;
  conservationOptions: ConservationOptions;
  setQueryTrackData: (node: HTMLElement) => void;
  highlightPosition: string;
  hitAccession: string;
  setMatchTrackData: (node: HTMLElement) => void;
  annotation: FeatureType | undefined;
  setFeatureTrackData: (node: HTMLElement) => void;
  hsp_qseq: string;
  hsp_hseq: string;
  hsp_hit_from: number;
  hsp_query_from: number;
};

const HSPDetailWrapped: FC<HSPDetailWrappedProps> = ({
  hsp_align_len,
  highlightProperty,
  conservationOptions,
  annotation,
  setFeatureTrackData,
  hsp_qseq,
  hsp_hseq,
  hsp_hit_from,
  hsp_query_from,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size] = useSize(containerRef);

  const [rowLength, setRowLength] = useSafeState(0);
  const [chunks, setChunks] = useState<Chunk[]>([]);

  const debouncedSetRowLength = useMemo(
    () =>
      debounce((width: number) => {
        // using 9 tenths of the available size as its the proportion assigned
        // to the track in the CSS
        setRowLength(Math.floor((0.9 * width) / widthOfAA));
      }, 1000),
    [setRowLength]
  );

  if (size?.width) {
    debouncedSetRowLength(size.width);
    if (!rowLength) {
      // when it passes from 0 to any value, don't debounce
      debouncedSetRowLength.flush();
    }
  }

  const sequenceChunks = useMemo<Chunk[]>(() => {
    if (!rowLength) {
      return [];
    }

    const numberRows = Math.ceil(hsp_align_len / rowLength);
    const chunks = [...Array(numberRows).keys()].map((index) => {
      const start = index * rowLength;
      const end = start + rowLength;
      return {
        // FIXME: UGLY trick to have the whole track re-render on change of size
        // at the moment when the track is updated instead of re-rendered, we
        // get a weird effect towards the end of the track.
        // Need to check with the MSA track itself in Nightingale
        id: `row-${Math.random()}`,
        ranges: {
          hit: {
            start: start + hsp_hit_from,
            end: end + hsp_hit_from - 1,
          },
          query: {
            start: start + hsp_query_from,
            end: end + hsp_query_from - 1,
          },
        },
        sequences: [
          {
            name: 'Query',
            sequence: hsp_qseq.slice(start, end),
          },
          {
            name: 'Match',
            sequence: hsp_hseq.slice(start, end),
          },
        ],
      };
    });
    return chunks;
  }, [
    hsp_align_len,
    hsp_hit_from,
    hsp_hseq,
    hsp_qseq,
    hsp_query_from,
    rowLength,
  ]);

  useEffect(() => {
    if (!sequenceChunks.length) {
      return;
    }
    if (sequenceChunks.length <= firstPass) {
      setChunks(sequenceChunks);
      return;
    }
    // there's a lot of chunks, render the first ones, then add the others to be
    // rendered at a later time
    setChunks(sequenceChunks.slice(0, firstPass));
    let cancelToken = false;
    (async () => {
      await sleep(1000);
      await schedule();
      if (!cancelToken) {
        setChunks(sequenceChunks);
      }
    })();
    // eslint-disable-next-line consistent-return
    return () => {
      // happens if the sequenceChunks have changed (e.g.: change of width)
      // or if unmounted
      cancelToken = true;
    };
  }, [sequenceChunks, setChunks]);

  return (
    <div ref={containerRef}>
      {chunks.map(({ sequences, id, ranges }) => (
        <HSPDetailWrappedRow
          key={id}
          rowLength={rowLength}
          sequences={sequences}
          ranges={ranges}
          annotation={annotation}
          setFeatureTrackData={setFeatureTrackData}
          highlightProperty={highlightProperty}
          conservationOptions={conservationOptions}
        />
      ))}
    </div>
  );
};

export default HSPDetailWrapped;
