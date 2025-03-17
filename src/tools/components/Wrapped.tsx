import { Region } from '@nightingale-elements/nightingale-msa';
import NightingaleTrack, {
  Feature,
} from '@nightingale-elements/nightingale-track';
import { debounce } from 'lodash-es';
import {
  Dispatch,
  lazy,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { ProcessedFeature } from '../../shared/components/views/FeaturesView';
import NightingalTrackComponent from '../../shared/custom-elements/NightingaleTrack';
import useSafeState from '../../shared/hooks/useSafeState';
import useSize from '../../shared/hooks/useSize';
import useStaggeredRenderingHelper from '../../shared/hooks/useStaggeredRenderingHelper';
import FeatureType from '../../uniprotkb/types/featureType';
import AlignLabel from '../align/components/results/AlignLabel';
import { MsaColorScheme } from '../config/msaColorSchemes';
import {
  AlignmentComponentProps,
  ConservationOptions,
  MSAInput,
  NightingaleChangeEvent,
  OnMSAFeatureClick,
  UpdateTooltip,
} from '../types/alignment';
import {
  createGappedFeature,
  getEndCoordinate,
  MSAFeature,
} from '../utils/sequences';

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
  lastRow?: boolean;
};

// NOTE: hardcoded for now, might need to change that in the future if need be
const sequenceHeight = 20;
const heightStyle = { height: `${sequenceHeight}px` };

export const handleEvent =
  (updateTooltip: UpdateTooltip) =>
  (event: CustomEvent<NightingaleChangeEvent>) => {
    event.stopPropagation();
    if (event?.detail?.eventType === 'click') {
      updateTooltip({
        id: event.detail.feature.accession,
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
  lastRow,
}: WrappedRowProps) => {
  const setFeatureTrackData = useCallback(
    (node: NightingaleTrack | null): void => {
      if (node && activeAlignment?.sequence) {
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
          .filter((f): f is Feature => Boolean(f));
      }
    },
    // TODO: replace this with fragments to have one big grid
    // -> to keep the right column of the right size to fit all possible values
    [activeAlignment, activeAnnotation]
  );

  // Using just the sequences resulted in occassional off by one errors so do this only for
  // the last row which will most likely be less than trackEnd - trackStart
  const width =
    (lastRow
      ? Math.max(...sequences.map(({ start, end }) => end - start))
      : trackEnd - trackStart) * widthOfAA;
  const length = trackEnd - trackStart + 1;

  const setMSAAttributes = useCallback(
    (
      node: {
        data: { name: string; sequence: string }[];
        'display-end'?: number;
        width: number;
        features?: Region[];
      } | null
    ) => {
      if (!node) {
        return;
      }
      requestAnimationFrame(() => {
        node.data = sequences.map(({ sequence, name }) => ({
          sequence,
          name,
        }));
        node.features = (selectedMSAFeatures || []).map((f) => ({
          ...f,
          residues: {
            from: f.residues.from - trackStart + 1,
            to: f.residues.to - trackStart + 1,
          },
        }));
        node['display-end'] = length;
        node.width = width;
      });
    },
    [length, selectedMSAFeatures, sequences, trackStart, width]
  );

  return (
    <>
      <div
        className="track-label track-label--align-labels"
        style={{ bottom: 7, position: 'relative' }}
      >
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
      <div className="track" style={{ width }}>
        {!delayRender && (
          <NightingaleMSA
            ref={setMSAAttributes}
            margin-left={0}
            margin-right={0}
            length={length}
            height={sequences.length * sequenceHeight}
            tile-width={widthOfAA}
            tile-height={sequenceHeight}
            color-scheme={highlightProperty}
            display-start={1}
            onFeatureClick={onMSAFeatureClick}
            {...conservationOptions}
          />
        )}
      </div>
      <span className="right-coord" style={{ bottom: 2, position: 'relative' }}>
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
      <div className="track annotation-track" style={{ width }}>
        {annotation && !delayRender && (
          <NightingalTrackComponent
            ref={setFeatureTrackData}
            display-start={trackStart}
            display-end={trackEnd}
            length={length}
            layout="non-overlapping"
            height={40}
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
        // Determine width of left/rigth labels and subtract from total width.
        // Unfortunately this causes the initial render to be a little off then this corrects itself.
        const leftLabelChars = Math.max(
          ...alignment.map(({ name }) => name?.length || 0)
        );
        const rightLabelChars = alignment[0].length.toString().length;

        const leftLabelWidth =
          document.querySelector('.track-label')?.getBoundingClientRect()
            .width || 8.5 * leftLabelChars;
        const rightLabelWidth =
          document.querySelector('.right-coord')?.getBoundingClientRect()
            .width || 8.5 * rightLabelChars;
        setRowLength(
          Math.floor((width - leftLabelWidth - rightLabelWidth) / widthOfAA)
        );
      }, 500),
    [alignment, setRowLength]
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
          lastRow={index === sequenceChunks.length - 1}
        />
      ))}
    </div>
  );
};

export default Wrapped;
