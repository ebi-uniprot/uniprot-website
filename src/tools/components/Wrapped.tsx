/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import React, {
  FC,
  useCallback,
  useMemo,
  useRef,
  SetStateAction,
  Dispatch,
} from 'react';
import { debounce } from 'lodash-es';
import { Loader } from 'franklin-sites';
import useEventListener from '@use-it/event-listener';

import useSize from '../../shared/hooks/useSize';
import useSafeState from '../../shared/hooks/useSafeState';
import useStaggeredRenderingHelper from '../../shared/hooks/useStaggeredRenderingHelper';
import useCustomElement from '../../shared/hooks/useCustomElement';

import { MsaColorScheme } from '../config/msaColorSchemes';

import {
  AlignmentComponentProps,
  ConservationOptions,
  MSAInput,
  handleEvent,
} from './AlignmentView';
import { ProcessedFeature } from '../../uniprotkb/components/protein-data-views/FeaturesView';
import {
  createGappedFeature,
  getEndCoordinate,
  MSAFeature,
} from '../utils/sequences';
import AlignLabel from '../align/components/results/AlignLabel';

import FeatureType from '../../uniprotkb/types/featureType';

const widthOfAA = 20;

export type Sequence = {
  name: string;
  sequence: string;
  fullSequence: string;
  start: number;
  end: number;
  features?: ProcessedFeature[];
  accession?: string;
};

type Chunk = {
  id: string;
  sequences: Sequence[];
  trackStart: number;
  trackEnd: number;
};

export type WrappedRowProps = {
  rowLength: number;
  highlightProperty: MsaColorScheme | undefined;
  conservationOptions: ConservationOptions;
  annotation: FeatureType | undefined;
  sequences: Sequence[];
  activeId?: string;
  setActiveId?: Dispatch<SetStateAction<string | undefined>>;
  selectedEntries?: string[];
  handleSelectedEntries?: (rowId: string) => void;
  trackStart: number;
  trackEnd: number;
  delayRender: boolean;
  selectedMSAFeatures?: MSAFeature[];
  activeAnnotation: ProcessedFeature[];
  activeAlignment?: MSAInput;
  onMSAFeatureClick: ({ event, id }: { event: Event; id: string }) => void;
};

// NOTE: hardcoded for now, might need to change that in the future if need be
const sequenceHeight = 20;
const heightStyle = { height: `${sequenceHeight}px` };

export const WrappedRow: FC<WrappedRowProps> = ({
  rowLength,
  highlightProperty,
  conservationOptions,
  annotation,
  sequences,
  activeId,
  setActiveId,
  selectedEntries,
  handleSelectedEntries,
  trackStart,
  trackEnd,
  delayRender,
  activeAnnotation,
  activeAlignment,
  selectedMSAFeatures,
  onMSAFeatureClick,
}) => {
  const msaDefined = useCustomElement(
    /* istanbul ignore next */
    () => import(/* webpackChunkName: "protvista-msa" */ 'protvista-msa'),
    'protvista-msa'
  );
  const setMSAAttributes = useCallback(
    (node): void => {
      if (node && msaDefined) {
        node.features = selectedMSAFeatures?.map((f) => ({
          ...f,
          residues: {
            from: f.residues.from - trackStart + 1,
            to: f.residues.to - trackStart + 1,
          },
        }));
        node.onFeatureClick = onMSAFeatureClick;
        node.data = sequences;
      }
    },
    [msaDefined, onMSAFeatureClick, selectedMSAFeatures, sequences, trackStart]
  );

  const trackDefined = useCustomElement(
    /* istanbul ignore next */
    () => import(/* webpackChunkName: "protvista-track" */ 'protvista-track'),
    'protvista-track'
  );

  const setFeatureTrackData = useCallback(
    (node): void => {
      if (node && trackDefined && activeAlignment?.sequence) {
        node.data = activeAnnotation
          .map((f) =>
            createGappedFeature(
              f,
              activeAlignment?.sequence,
              // We want to offset all of the features by `from`
              // in the Wrapped view.
              activeAlignment?.from
            )
          )
          .filter(Boolean);
      }
    },
    // TODO: replace this with fragments to have one big grid
    // -> to keep the right column of the right size to fit all possible values
    [activeAlignment, activeAnnotation, trackDefined]
  );
  if (!(msaDefined && trackDefined)) {
    return <Loader />;
  }
  return (
    <>
      <div className="track-label track-label--align-labels">
        {sequences.map((s) => {
          return (
            <AlignLabel
              accession={s.accession}
              info={s}
              loading={false}
              key={s.name}
              style={heightStyle}
              checked={Boolean(
                s.accession && selectedEntries?.includes(s.accession)
              )}
              onSequenceChecked={handleSelectedEntries}
              onIdClick={
                setActiveId ? () => setActiveId(s.accession) : undefined
              }
              active={!!activeId && setActiveId && activeId === s.accession}
            >
              {s.name}
            </AlignLabel>
          );
        })}
      </div>
      <div className="track">
        {!delayRender && (
          <protvista-msa
            ref={setMSAAttributes}
            length={rowLength}
            height={sequences.length * sequenceHeight}
            colorscheme={highlightProperty}
            hidelabel
            {...conservationOptions}
          />
        )}
      </div>
      <span className="right-coord">
        {sequences.map((s) => (
          <div style={heightStyle} key={s.name}>
            {s.end}
          </div>
        ))}
      </span>
      <span className="track-label annotation-label">
        {annotation &&
          activeAlignment?.accession &&
          `${activeAlignment?.accession}:${annotation}`}
      </span>
      <div className="track annotation-track">
        {annotation && !delayRender && (
          <protvista-track
            ref={setFeatureTrackData}
            displaystart={trackStart}
            displayend={trackEnd}
            length={trackEnd - trackStart + 1}
            layout="non-overlapping"
          />
        )}
      </div>
    </>
  );
};

const Wrapped: FC<AlignmentComponentProps> = ({
  updateTooltip,
  alignment,
  alignmentLength,
  highlightProperty,
  conservationOptions,
  annotation,
  activeId,
  setActiveId,
  omitInsertionsInCoords = false,
  selectedEntries,
  handleSelectedEntries,
  selectedMSAFeatures,
  activeAnnotation,
  activeAlignment,
  onMSAFeatureClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size] = useSize(containerRef);

  useEventListener(
    'change',
    handleEvent(updateTooltip) as (e: Event) => void,
    containerRef?.current
  );

  const [rowLength, setRowLength] = useSafeState(0);
  const nItemsToRender = useStaggeredRenderingHelper({
    first: 10,
    increment: +Infinity,
    max: +Infinity,
    delay: 500,
  });
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

    const numberRows = Math.ceil(alignmentLength / rowLength);
    const chunks = [...Array(numberRows).keys()].map((index) => {
      const start = index * rowLength;
      const end = Math.min(start + rowLength, alignmentLength);
      return {
        // NOTE: This is a bit of an ugly trick to have the whole track
        // re-render on change of size. Otherwise when the track is updated
        // instead of re-rendered, we get the track overflowing on the right.
        // Might be able to avoid that by playing with sizes in the panel grid
        // and from within the Nightingale component
        id: `row-${index}-${rowLength}`,
        trackStart: start + 1,
        trackEnd: start + rowLength,
        sequences: alignment.map(
          ({ name = '', sequence, from, features, accession }) => ({
            name,
            sequence: sequence.slice(start, end),
            fullSequence: sequence,
            start:
              from -
              1 + // because 'from' value starts from 1 instead of 0
              (omitInsertionsInCoords
                ? getEndCoordinate(sequence, start)
                : start),
            end:
              from -
              1 + // because 'from' value starts from 1 instead of 0
              (omitInsertionsInCoords ? getEndCoordinate(sequence, end) : end),
            features,
            accession,
          })
        ),
      };
    });
    return chunks;
  }, [alignment, alignmentLength, omitInsertionsInCoords, rowLength]);

  return (
    <div
      ref={containerRef}
      className="alignment-grid alignment-wrapped"
      data-testid="alignment-wrapped-view"
    >
      {sequenceChunks.map(({ sequences, id, trackStart, trackEnd }, index) => (
        <WrappedRow
          key={id}
          rowLength={rowLength}
          sequences={sequences}
          annotation={annotation}
          highlightProperty={highlightProperty}
          conservationOptions={conservationOptions}
          activeId={activeId}
          setActiveId={setActiveId}
          selectedEntries={selectedEntries}
          handleSelectedEntries={handleSelectedEntries}
          delayRender={index >= nItemsToRender}
          trackStart={trackStart}
          trackEnd={trackEnd}
          activeAnnotation={activeAnnotation}
          activeAlignment={activeAlignment}
          selectedMSAFeatures={selectedMSAFeatures}
          onMSAFeatureClick={onMSAFeatureClick}
        />
      ))}
    </div>
  );
};

export default Wrapped;
