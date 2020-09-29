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
import ProtvistaManager from 'protvista-manager';
import ProtvistaTrack from 'protvista-track';
import ProtvistaMSA from 'protvista-msa';

import { loadWebComponent } from '../../shared/utils/utils';

import useSize from '../../shared/hooks/useSize';
import useSafeState from '../../shared/hooks/useSafeState';
import useStaggeredRenderingHelper from '../../shared/hooks/useStaggeredRenderingHelper';

import { MsaColorScheme } from '../config/msaColorSchemes';

import FeatureType from '../../uniprotkb/types/featureType';
import { ConservationOptions, MSAInput } from './AlignmentView';
import {
  FeatureData,
  processFeaturesData,
} from '../../uniprotkb/components/protein-data-views/FeaturesView';
import {
  transformFeaturesPositions,
  getEndCoordinate,
} from '../utils/sequences';
import AlignLabel from '../align/components/results/AlignLabel';

loadWebComponent('protvista-track', ProtvistaTrack);
loadWebComponent('protvista-msa', ProtvistaMSA);
loadWebComponent('protvista-manager', ProtvistaManager);

const widthOfAA = 20;

export type Sequence = {
  name: string;
  sequence: string;
  start: number;
  end: number;
  features?: FeatureData;
  accession?: string;
};

type Chunk = {
  id: string;
  sequences: Sequence[];
};

export type MSAWrappedRowProps = {
  rowLength: number;
  highlightProperty: MsaColorScheme | undefined;
  conservationOptions: ConservationOptions;
  annotation: FeatureType | undefined;
  sequences: Sequence[];
  activeId?: string;
  setActiveId?: Dispatch<SetStateAction<string | undefined>>;
  omitInsertionsInCoords?: boolean;
  selectedEntries?: string[];
  handleSelectedEntries?: (rowId: string) => void;
};

// NOTE: hardcoded for now, might need to change that in the future if need be
const heightStyle = { height: '20px' };

const MSAWrappedRow: FC<MSAWrappedRowProps> = ({
  rowLength,
  highlightProperty,
  conservationOptions,
  annotation,
  sequences,
  activeId,
  setActiveId,
  omitInsertionsInCoords = true,
  selectedEntries,
  handleSelectedEntries,
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

  const setFeatureTrackData = useCallback(
    (node): void => {
      if (node && annotation) {
        const featuresSeq = sequences.find(
          ({ accession }) => accession && accession === activeId
        );
        const features = featuresSeq?.features?.filter(
          ({ type }) => type === annotation
        );
        if (featuresSeq && features) {
          let processedFeatures = processFeaturesData(features);
          processedFeatures = transformFeaturesPositions(processedFeatures);
          node.data = processedFeatures;
          node.setAttribute('length', featuresSeq.end - featuresSeq.start + 1);
          node.setAttribute('displaystart', featuresSeq.start);
          node.setAttribute('displayend', featuresSeq.end);
        }
      }
    },
    [annotation, activeId, sequences]
  );

  // TODO: replace this with fragments to have one big grid
  // -> to keep the right column of the right size to fit all possible values
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
            onSequenceChecked={handleSelectedEntries}
            onIdClick={() => setActiveId?.(s.accession)}
            active={!!activeId && setActiveId && activeId === s.accession}
          >
            {s.name || ''}
          </AlignLabel>
        ))}
      </div>
      <div className="track">
        <protvista-msa
          ref={setMSAAttributes}
          length={rowLength}
          height={sequences.length * 20}
          colorscheme={highlightProperty}
          {...conservationOptions}
        />
      </div>
      <span className="right-coord">
        {sequences.map((s) => (
          <div style={heightStyle} key={s.name}>
            {omitInsertionsInCoords
              ? getEndCoordinate(s.sequence, s.end)
              : s.end}
          </div>
        ))}
      </span>
      <span className="track-label annotation-label">{annotation}</span>
      <div className="track annotation-track">
        <protvista-track ref={setFeatureTrackData} />
      </div>
    </>
  );
};

export type MSAViewProps = {
  alignment: MSAInput[];
  alignmentLength: number;
  highlightProperty: MsaColorScheme | undefined;
  conservationOptions: ConservationOptions;
  totalLength: number;
  annotation: FeatureType | undefined;
  activeId?: string;
  setActiveId?: Dispatch<SetStateAction<string | undefined>>;
  omitInsertionsInCoords?: boolean;
  selectedEntries?: string[];
  handleSelectedEntries?: (rowId: string) => void;
};

const Wrapped: FC<MSAViewProps> = ({
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
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size] = useSize(containerRef);

  const [rowLength, setRowLength] = useSafeState(0);
  const nItemsToRender = useStaggeredRenderingHelper({
    first: 4,
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
      const end = start + rowLength;
      return {
        // NOTE: This is a bit of an ugly trick to have the whole track
        // re-render on change of size. Otherwise when the track is updated
        // instead of re-rendered, we get the track overflowing on the right.
        // Might be able to avoid that by playing with sizes in the panel grid
        // and from within the Nightingale component
        id: `row-${index}-${rowLength}`,
        sequences: alignment.map(
          ({ name, sequence, from, features, accession }) => ({
            name: name || '',
            sequence: sequence.slice(start, end),
            start: start + from,
            end: end + from - 1,
            features,
            accession,
          })
        ),
      };
    });
    return chunks;
  }, [alignment, alignmentLength, rowLength]);

  return (
    <div
      ref={containerRef}
      className="alignment-grid alignment-wrapped"
      data-testid="alignment-wrapped-view"
    >
      {sequenceChunks.map(({ sequences, id }, index) => {
        if (index < nItemsToRender) {
          return (
            <MSAWrappedRow
              key={id}
              rowLength={rowLength}
              sequences={sequences}
              annotation={annotation}
              highlightProperty={highlightProperty}
              conservationOptions={conservationOptions}
              activeId={activeId}
              setActiveId={setActiveId}
              omitInsertionsInCoords={omitInsertionsInCoords}
              selectedEntries={selectedEntries}
              handleSelectedEntries={handleSelectedEntries}
            />
          );
        }
        return <div key={id} className="alignment-grid__placeholder" />;
      })}
    </div>
  );
};

export default Wrapped;
