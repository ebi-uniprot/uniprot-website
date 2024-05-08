/* eslint-disable no-param-reassign */
import {
  useCallback,
  useMemo,
  useRef,
  SetStateAction,
  Dispatch,
  useEffect,
  lazy,
} from 'react';
import { debounce } from 'lodash-es';
import { Loader } from 'franklin-sites';

import useSize from '../../shared/hooks/useSize';
import useSafeState from '../../shared/hooks/useSafeState';
import useStaggeredRenderingHelper from '../../shared/hooks/useStaggeredRenderingHelper';
import useCustomElement from '../../shared/hooks/useCustomElement';

import { MsaColorScheme } from '../config/msaColorSchemes';

import { ProcessedFeature } from '../../shared/components/views/FeaturesView';
import {
  createGappedFeature,
  getEndCoordinate,
  MSAFeature,
} from '../utils/sequences';
import AlignLabel from '../align/components/results/AlignLabel';

import FeatureType from '../../uniprotkb/types/featureType';
import {
  AlignmentComponentProps,
  ConservationOptions,
  MSAInput,
  NightingaleChangeEvent,
  OnMSAFeatureClick,
  UpdateTooltip,
} from '../types/alignment';

const NightingaleMSA = lazy(
  () =>
    import(
      /* webpackChunkName: "nightingale-msa" */ '../../shared/custom-elements/NightingaleMSA'
    )
);

const widthOfAA = 18;

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
  highlightProperty: MsaColorScheme | undefined;
  conservationOptions: ConservationOptions;
  annotation: FeatureType | undefined;
  sequences: Sequence[];
  activeId?: string;
  setActiveId?: Dispatch<SetStateAction<string | undefined>>;
  selectedEntries?: string[];
  handleEntrySelection?: (rowId: string) => void;
  trackStart: number;
  trackEnd: number;
  delayRender: boolean;
  selectedMSAFeatures?: MSAFeature[];
  activeAnnotation: ProcessedFeature[];
  activeAlignment?: MSAInput;
  onMSAFeatureClick: OnMSAFeatureClick;
};

// NOTE: hardcoded for now, might need to change that in the future if need be
const sequenceHeight = 20;
const heightStyle = { height: `${sequenceHeight}px` };

export const handleEvent =
  (updateTooltip: UpdateTooltip) =>
  (event: CustomEvent<NightingaleChangeEvent>) => {
    event.stopPropagation();
    if (event?.detail?.eventtype === 'click') {
      updateTooltip({
        id: event.detail.feature.protvistaFeatureId,
        x: event.detail.coords[0],
        y: event.detail.coords[1],
      });
    }
  };

export const WrappedRow = ({
  highlightProperty,
  conservationOptions,
  annotation,
  sequences,
  activeId,
  setActiveId,
  selectedEntries,
  handleEntrySelection,
  trackStart,
  trackEnd,
  delayRender,
  activeAnnotation,
  activeAlignment,
  selectedMSAFeatures,
  onMSAFeatureClick,
}: WrappedRowProps) => {
  const trackElement = useCustomElement(
    /* istanbul ignore next */
    () => import(/* webpackChunkName: "protvista-track" */ 'protvista-track'),
    'protvista-track'
  );

  const setFeatureTrackData = useCallback(
    (node: { data: ReturnType<typeof createGappedFeature>[] }): void => {
      if (node && trackElement.defined && activeAlignment?.sequence) {
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
    [activeAlignment, activeAnnotation, trackElement.defined]
  );
  if (!trackElement.defined) {
    return <Loader />;
  }
  const width = Math.max(...sequences.map(({ start, end }) => end - start));
  return (
    <>
      <div className="track-label track-label--align-labels">
        {sequences.map((s) => (
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
            {s.name}
          </AlignLabel>
        ))}
      </div>
      <div className="track">
        {!delayRender && (
          <NightingaleMSA
            length={width}
            height={sequences.length * sequenceHeight}
            width={width * widthOfAA}
            tile-width={widthOfAA}
            color-scheme={highlightProperty}
            features={selectedMSAFeatures?.map((f) => ({
              ...f,
              residues: {
                from: f.residues.from - trackStart + 1,
                to: f.residues.to - trackStart + 1,
              },
            }))}
            data={sequences.map(({ sequence, name }) => ({
              sequence,
              name,
            }))}
            onFeatureClick={onMSAFeatureClick}
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
          <trackElement.name
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

const Wrapped = ({
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
  handleEntrySelection,
  selectedMSAFeatures,
  activeAnnotation,
  activeAlignment,
  onMSAFeatureClick,
}: AlignmentComponentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size] = useSize(containerRef);

  useEffect(() => {
    const handler = handleEvent(updateTooltip) as (e: Event) => void;
    const element = containerRef?.current;
    element?.addEventListener('change', handler);
    return () => {
      element?.removeEventListener('change', handler);
    };
  }, [updateTooltip]);

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
        // I had to play with the constant when upgrading to nightingale-msa to get a better fit
        setRowLength(Math.floor((0.85 * width) / widthOfAA));
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
          sequences={sequences}
          annotation={annotation}
          highlightProperty={highlightProperty}
          conservationOptions={conservationOptions}
          activeId={activeId}
          setActiveId={setActiveId}
          selectedEntries={selectedEntries}
          handleEntrySelection={handleEntrySelection}
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
