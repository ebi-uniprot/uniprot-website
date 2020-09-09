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
import { ConservationOptions } from './MSAWrapper';
import { MSAViewProps } from './MSAView';
import {
  FeatureData,
  processFeaturesData,
} from '../../uniprotkb/components/protein-data-views/FeaturesView';
import { transformFeaturesPositions } from '../utils/sequences';

loadWebComponent('protvista-track', ProtvistaTrack);
loadWebComponent('protvista-msa', ProtvistaMSA);
loadWebComponent('protvista-manager', ProtvistaManager);

const widthOfAA = 20;

type Sequence = {
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
  selectedId?: string;
  setSelectedId: Dispatch<SetStateAction<string | undefined>>;
};

const MSAWrappedRow: FC<MSAWrappedRowProps> = ({
  rowLength,
  highlightProperty,
  conservationOptions,
  annotation,
  sequences,
  selectedId,
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
          ({ accession }) => accession && accession === selectedId
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
    [annotation, selectedId, sequences]
  );

  return (
    <section
      data-testid="wrapped-hsp-detail"
      className="hsp-detail-panel__visualisation hsp-detail-panel__visualisation__wrapped-row"
    >
      <section className="hsp-label hsp-label--msa">Alignment</section>
      <section className="hsp-detail-panel__visualisation--msa">
        <protvista-msa
          ref={setMSAAttributes}
          length={rowLength}
          height={sequences.length * 20}
          colorscheme={highlightProperty}
          {...conservationOptions}
        />
      </section>
      <section className="hsp-label hsp-label--track">{annotation}</section>
      <section className="hsp-detail-panel__visualisation--track">
        <protvista-track ref={setFeatureTrackData} />
      </section>
    </section>
  );
};

const MSAWrappedView: FC<MSAViewProps> = ({
  alignment,
  alignmentLength,
  highlightProperty,
  conservationOptions,
  annotation,
  selectedId,
  setSelectedId,
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
    <div ref={containerRef}>
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
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          );
        }
        return <section key={id} className="hsp-detail-panel__placeholder" />;
      })}
    </div>
  );
};

export default MSAWrappedView;
