/* eslint-disable no-param-reassign */
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Loader } from 'franklin-sites';

import AlignmentOverview from './AlignmentOverview';
import AlignLabel from '../align/components/results/AlignLabel';

import useCustomElement from '../../shared/hooks/useCustomElement';
import {
  getFullAlignmentSegments,
  getEndCoordinate,
  createGappedFeature,
} from '../utils/sequences';

import { AlignmentComponentProps, handleEvent } from './AlignmentView';

import './styles/alignment-view.scss';

// Do we have this defined somewhere else?
type EventDetail = {
  displaystart: string;
  displayend: string;
};

// NOTE: hardcoded for now, might need to change that in the future if need be
const sequenceHeight = 20;
const heightStyle = { height: `${sequenceHeight}px` };

const AlignOverview: FC<AlignmentComponentProps> = ({
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
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [highlightPosition, setHighlighPosition] = useState('');
  const [initialDisplayEnd, setInitialDisplayEnd] = useState<
    number | undefined
  >();
  const [displayEnd, setDisplayEnd] = useState<number>();
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
      setHighlighPosition(`${start}:${end}`);
      setDisplayEnd(displayEnd);
    },
    [tracksOffset]
  );

  const managerRef = useCallback(
    (node): void => {
      if (node && initialDisplayEnd) {
        node.addEventListener('change', ({ detail }: { detail: EventDetail }) =>
          findHighlightPositions(detail)
        );
        node.setAttribute('displaystart', 1);
        node.setAttribute('displayend', initialDisplayEnd);
        setHighlighPosition(
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

  const msaDefined = useCustomElement(
    /* istanbul ignore next */
    () => import(/* webpackChunkName: "protvista-msa" */ 'protvista-msa'),
    'protvista-msa'
  );

  const setMSAAttributes = useCallback(
    (node): void => {
      if (!(node && msaDefined)) {
        return;
      }

      node.features = selectedMSAFeatures;
      node.onFeatureClick = onMSAFeatureClick;

      const singleBaseWidth =
        'getSingleBaseWidth' in node ? node.getSingleBaseWidth() : 15;
      const displayEndValue = alignmentLength / (15 / singleBaseWidth);

      const maxSequenceLength = Math.max(
        ...alignment.map((al) => al.sequence.length)
      );
      if (typeof displayEnd === 'undefined') {
        setInitialDisplayEnd(Math.min(displayEndValue, maxSequenceLength));
      }

      node.data = alignment.map(({ name, sequence }) => ({ name, sequence }));
    },
    [
      msaDefined,
      selectedMSAFeatures,
      alignmentLength,
      alignment,
      displayEnd,
      onMSAFeatureClick,
    ]
  );

  const trackDefined = useCustomElement(
    /* istanbul ignore next */
    () => import(/* webpackChunkName: "protvista-track" */ 'protvista-track'),
    'protvista-track'
  );
  const navigationDefined = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-navigation" */ 'protvista-navigation'
      ),
    'protvista-navigation'
  );
  const managerDefined = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-manager" */ 'protvista-manager'),
    'protvista-manager'
  );
  const ceDefined =
    trackDefined && navigationDefined && msaDefined && managerDefined;

  const setFeatureTrackData = useCallback(
    (node): void => {
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
          <protvista-track
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
        <protvista-manager
          ref={managerRef}
          attributes="displaystart displayend"
        >
          <protvista-navigation length={alignmentLength} />
          <protvista-msa
            ref={setMSAAttributes}
            length={alignmentLength}
            height={alignment.length * sequenceHeight}
            colorscheme={highlightProperty}
            hidelabel
            {...conservationOptions}
          />
        </protvista-manager>
      </div>
      <span className="right-coord">
        {alignment.map((s) => (
          <div style={heightStyle} key={s.name}>
            {Math.floor(
              omitInsertionsInCoords
                ? getEndCoordinate(
                    s.sequence,
                    displayEnd ?? initialDisplayEnd ?? 0
                  )
                : displayEnd ?? initialDisplayEnd ?? 0
            )}
          </div>
        ))}
      </span>
    </section>
  );
};

export default AlignOverview;
