/* eslint-disable no-param-reassign */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Loader } from 'franklin-sites';

import AlignmentOverview from './AlignmentOverview';
import AlignLabel from '../align/components/results/AlignLabel';
import NightingaleMSA from '../../shared/custom-elements/NightingaleMSA';

import useCustomElement from '../../shared/hooks/useCustomElement';
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
  displaystart: string;
  displayend: string;
};

// NOTE: hardcoded for now, might need to change that in the future if need be
const sequenceHeight = 20;
const heightStyle = { height: `${sequenceHeight}px` };
const widthOfAA = 18;

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
  const [highlightPosition, setHighlightPosition] = useState('');
  const [initialDisplayEnd, setInitialDisplayEnd] = useState<
    number | undefined
  >();
  const [displayPosition, setDisplayPosition] = useState<
    [number | undefined, number | undefined]
  >([undefined, undefined]);
  const tracksOffset = Math.max(...alignment.map(({ from }) => from));
  const findHighlightPositions = useCallback(
    ({ displaystart, displayend }: EventDetail) => {
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

  const managerRef = useCallback(
    (node: {
      addEventListener: (
        name: 'change',
        event: ({ detail }: { detail: EventDetail }) => void
      ) => void;
      setAttribute: (
        attributre: 'displaystart' | 'displayend',
        value: number
      ) => void;
    }): void => {
      if (node && initialDisplayEnd) {
        node.addEventListener('change', ({ detail }: { detail: EventDetail }) =>
          findHighlightPositions(detail)
        );
        node.setAttribute('displaystart', 1);
        node.setAttribute('displayend', initialDisplayEnd);
        setHighlightPosition(
          (highlight) =>
            highlight || `${tracksOffset}:${tracksOffset + initialDisplayEnd}`
        );
      }
    },
    [initialDisplayEnd, findHighlightPositions, tracksOffset]
  );

  useEffect(() => {
    const handler = handleEvent(updateTooltip) as (e: Event) => void;
    const element = containerRef?.current;
    element?.addEventListener('change', handler);
    return () => {
      element?.removeEventListener('change', handler);
    };
  }, [updateTooltip]);

  const trackElement = useCustomElement(
    /* istanbul ignore next */
    () => import(/* webpackChunkName: "protvista-track" */ 'protvista-track'),
    'protvista-track'
  );
  const navigationElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-navigation" */ 'protvista-navigation'
      ),
    'protvista-navigation'
  );
  const managerElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-manager" */ 'protvista-manager'),
    'protvista-manager'
  );
  const ceDefined =
    trackElement.defined && navigationElement.defined && managerElement.defined;

  const setFeatureTrackData = useCallback(
    (node: { data: ReturnType<typeof createGappedFeature>[] }): void => {
      if (node && ceDefined && activeAnnotation && activeAlignment?.sequence) {
        node.data = activeAnnotation
          // The Overview feature track always starts from the start of the protein
          // hence the need to have `from` := 1
          .map((f) => createGappedFeature(f, activeAlignment?.sequence, 1))
          .filter(Boolean);
      }
    },
    [activeAlignment?.sequence, activeAnnotation, ceDefined]
  );

  const overviewHeight = (
    alignment && alignment.length > 10 ? alignment.length * 3 : 30
  ).toString();

  const alignmentOverviewData = useMemo(
    () => (alignment ? getFullAlignmentSegments(alignment) : []),
    [alignment]
  );

  useEffect(() => {
    const displayEndValue = alignmentLength / (15 / widthOfAA);
    const maxSequenceLength = Math.max(
      ...alignment.map((al) => al.sequence.length)
    );
    if (typeof displayPosition[1] === 'undefined') {
      setInitialDisplayEnd(Math.min(displayEndValue, maxSequenceLength));
    }
  }, [alignmentLength, alignment, displayPosition]);

  if (!ceDefined) {
    return <Loader />;
  }

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
          height={overviewHeight}
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
          <trackElement.name
            ref={setFeatureTrackData}
            length={totalLength}
            layout="non-overlapping"
            highlight={highlightPosition}
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
            style={heightStyle}
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
      <div className="track">
        <managerElement.name
          ref={managerRef}
          attributes="displaystart displayend"
        >
          <navigationElement.name length={alignmentLength} />
          <NightingaleMSA
            length={alignmentLength}
            height={alignment.length * sequenceHeight}
            color-scheme={highlightProperty}
            width={1000}
            hide-label
            tile-width={widthOfAA}
            features={selectedMSAFeatures}
            onFeatureClick={onMSAFeatureClick}
            data={alignment.map(({ name, sequence }) => ({
              name: name || '',
              sequence,
            }))}
            display-start={displayPosition[0]}
            display-end={displayPosition[1]}
            {...conservationOptions}
          />
        </managerElement.name>
      </div>
      <span className="right-coord">
        {alignment.map((s) => (
          <div style={heightStyle} key={s.name}>
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
      </span>
    </section>
  );
};

export default AlignOverview;
