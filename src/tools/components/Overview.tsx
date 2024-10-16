/* eslint-disable no-param-reassign */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import NightingaleNavigationComponent from '../../shared/custom-elements/NightingaleNavigation';
import NightingalTrackComponent from '../../shared/custom-elements/NightingaleTrack';
import NightingaleManagerComponent from '../../shared/custom-elements/NightingaleManager';

import AlignmentOverview from './AlignmentOverview';
import AlignLabel from '../align/components/results/AlignLabel';
import NightingaleMSA from '../../shared/custom-elements/NightingaleMSA';

import {
  getFullAlignmentSegments,
  getEndCoordinate,
  createGappedFeature,
} from '../utils/sequences';
import { handleEvent } from './Wrapped';

import { AlignmentComponentProps } from '../types/alignment';

import './styles/alignment-view.scss';

// Do we have this defined somewhere else?
type EventDetail = {
  'display-start': string;
  'display-end': string;
};

// NOTE: hardcoded for now, might need to change that in the future if need be
const sequenceHeight = 20;
const labelHeightStyle = { height: `${sequenceHeight}px` };
const widthOfAA = 9;

const AlignOverview = ({
  alignment,
  alignmentLength,
  highlightProperty,
  conservationOptions,
  totalLength,
  annotation,
  activeId,
  setActiveId,
  omitInsertionsInCoords,
  selectedEntries,
  handleEntrySelection,
  onMSAFeatureClick,
  selectedMSAFeatures,
  activeAnnotation,
  activeAlignment,
  updateTooltip,
}: AlignmentComponentProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const [highlightPosition, setHighlightPosition] = useState('');
  const [initialDisplayEnd, setInitialDisplayEnd] = useState<
    number | undefined
  >();
  const [displayPosition, setDisplayPosition] = useState<
    [number | undefined, number | undefined]
  >([undefined, undefined]);
  const tracksOffset = Math.max(...alignment.map(({ from }) => from));
  const findHighlightPositions = useCallback(
    ({
      'display-start': displaystart,
      'display-end': displayend,
    }: EventDetail) => {
      if (
        typeof displaystart === 'undefined' ||
        typeof displayend === 'undefined'
      ) {
        return;
      }
      const displayStart = parseInt(displaystart, 10);
      const displayEnd = parseInt(displayend, 10);

      const start = tracksOffset + displayStart;
      const end = tracksOffset + displayEnd;
      setHighlightPosition(`${start}:${end}`);
      setDisplayPosition([displayStart, displayEnd]);
    },
    [tracksOffset]
  );

  const setMSAAttributes = useCallback(
    (
      node: {
        data: { name: string; sequence: string }[];
        'display-end'?: number;
        width: number;
      } | null
    ) => {
      if (!node) {
        return;
      }
      requestAnimationFrame(() => {
        node.data = alignment.map(({ name, sequence }) => ({
          name: name || '',
          sequence,
        }));
        node['display-end'] = initialDisplayEnd;
        node.width = 550;
      });
    },
    [alignment, initialDisplayEnd]
  );
  const managerRef = useCallback(
    (node: {
      addEventListener: (
        name: 'change',
        event: ({ detail }: { detail: EventDetail }) => void
      ) => void;
      setAttribute: (
        attributre: 'display-start' | 'display-end' | 'height',
        value: number
      ) => void;
    }): void => {
      if (node && initialDisplayEnd) {
        node.addEventListener('change', ({ detail }: { detail: EventDetail }) =>
          findHighlightPositions(detail)
        );
        node.setAttribute('display-start', 1);
        node.setAttribute('display-end', initialDisplayEnd);
        setHighlightPosition(
          (highlight) =>
            highlight || `${tracksOffset}:${tracksOffset + initialDisplayEnd}`
        );
      }
    },
    [initialDisplayEnd, findHighlightPositions, tracksOffset]
  );

  const navigationHeight =
    navigationRef.current?.getClientRects()?.[0]?.height || 0;

  useEffect(() => {
    const handler = handleEvent(updateTooltip) as (e: Event) => void;
    const element = containerRef?.current;
    element?.addEventListener('change', handler);
    return () => {
      element?.removeEventListener('change', handler);
    };
  }, [updateTooltip]);

  const setFeatureTrackData = useCallback(
    (node: { data: ReturnType<typeof createGappedFeature>[] }): void => {
      if (node && activeAnnotation && activeAlignment?.sequence) {
        node.data = activeAnnotation
          // The Overview feature track always starts from the start of the protein
          // hence the need to have `from` := 1
          .map((f) => createGappedFeature(f, activeAlignment?.sequence, 1))
          .filter(Boolean);
      }
    },
    [activeAlignment?.sequence, activeAnnotation]
  );

  const alignmentOverviewData = useMemo(
    () => (alignment ? getFullAlignmentSegments(alignment) : []),
    [alignment]
  );

  const overviewHeight =
    alignment && alignment.length > 10 ? alignment.length * 3 : 30;
  const trackHeight = Math.floor(overviewHeight / alignmentOverviewData.length);

  useEffect(() => {
    const displayEndValue = Math.round(alignmentLength / widthOfAA);
    const maxSequenceLength = Math.max(
      ...alignment.map((al) => al.sequence.length)
    );
    if (typeof displayPosition[1] === 'undefined') {
      setInitialDisplayEnd(Math.min(displayEndValue, maxSequenceLength));
    }
  }, [alignmentLength, alignment, displayPosition]);

  return (
    <section
      data-testid="alignment-view"
      className="alignment-grid"
      ref={containerRef}
    >
      {/* first row */}
      <span className="track-label">Overview</span>
      <div className="track">
        <AlignmentOverview
          trackHeight={trackHeight}
          length={totalLength}
          highlight={highlightPosition}
          data={alignmentOverviewData}
        />
      </div>
      {/* second row */}
      <span className="track-label" data-testid="track-label">
        {annotation && `${activeAlignment?.accession}:${annotation}`}
      </span>
      <div className="track">
        {annotation && (
          <NightingalTrackComponent
            ref={setFeatureTrackData}
            length={totalLength}
            highlight={highlightPosition}
            display-start={1}
            display-end={totalLength}
            height={trackHeight}
          />
        )}
      </div>
      {/* third row */}
      <div className="track-label track-label--align-labels">
        {alignment.map((s) => (
          <AlignLabel
            accession={s.accession}
            info={s}
            loading={false}
            key={s.name}
            style={labelHeightStyle}
            checked={Boolean(
              s.accession && selectedEntries?.includes(s.accession)
            )}
            onSequenceChecked={handleEntrySelection}
            onIdClick={setActiveId ? () => setActiveId(s.accession) : undefined}
            active={!!activeId && setActiveId && activeId === s.accession}
          >
            {s.name || ''}
          </AlignLabel>
        ))}
      </div>
      <div
        className="track"
        // Need to set this explicitly as for some reason the MSA will come up a few
        // pixels longer and will mess up the alignment with the left/right labels.
        style={{
          height: navigationHeight
            ? navigationHeight + alignment.length * sequenceHeight
            : 'undefined',
        }}
      >
        <NightingaleManagerComponent
          ref={managerRef}
          reflected-attributes="display-start,display-end"
        >
          <NightingaleNavigationComponent
            ref={navigationRef}
            length={alignmentLength}
          />
          <NightingaleMSA
            ref={setMSAAttributes}
            length={alignmentLength}
            height={alignment.length * sequenceHeight}
            color-scheme={highlightProperty}
            hide-label
            tile-width={widthOfAA}
            tile-height={sequenceHeight}
            features={selectedMSAFeatures}
            onFeatureClick={onMSAFeatureClick}
            display-start={displayPosition[0]}
            display-end={displayPosition[1]}
            {...conservationOptions}
          />
        </NightingaleManagerComponent>
      </div>
      <div className="right-coord">
        {alignment.map((s) => (
          <div style={labelHeightStyle} key={s.name}>
            {Math.floor(
              omitInsertionsInCoords
                ? getEndCoordinate(
                    s.sequence,
                    displayPosition[1] ?? initialDisplayEnd ?? 0
                  )
                : displayPosition[1] ?? initialDisplayEnd ?? 0
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AlignOverview;
