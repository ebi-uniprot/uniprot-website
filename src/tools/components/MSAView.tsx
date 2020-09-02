/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import React, { FC, useCallback, useMemo, useState } from 'react';
import ProtvistaManager from 'protvista-manager';
import ProtvistaNavigation from 'protvista-navigation';
import ProtvistaTrack from 'protvista-track';
import ProtvistaMSA from 'protvista-msa';
import { MsaColorScheme } from '../config/msaColorSchemes';
import FeatureType from '../../uniprotkb/types/featureType';
import { loadWebComponent } from '../../shared/utils/utils';
import { MSAInput, ConservationOptions } from './MSAWrapper';
import { processFeaturesData } from '../../uniprotkb/components/protein-data-views/FeaturesView';
import {
  transformFeaturesPositions,
  getFullAlignmentSegments,
} from '../utils/sequences';

loadWebComponent('protvista-navigation', ProtvistaNavigation);
loadWebComponent('protvista-track', ProtvistaTrack);
loadWebComponent('protvista-msa', ProtvistaMSA);
loadWebComponent('protvista-manager', ProtvistaManager);

// Do we have this defined somewhere else?
type EventDetail = {
  displaystart: string;
  displayend: string;
};

export type MSAViewProps = {
  alignment: MSAInput[];
  alignmentLength: number;
  highlightProperty: MsaColorScheme | undefined;
  conservationOptions: ConservationOptions;
  totalLength: number;
  annotation: FeatureType | undefined;
};

const MSAView: FC<MSAViewProps> = ({
  alignment,
  alignmentLength,
  highlightProperty,
  conservationOptions,
  totalLength,
  annotation,
}) => {
  const [highlightPosition, setHighlighPosition] = useState('');
  const [initialDisplayEnd, setInitialDisplayEnd] = useState<
    number | undefined
  >();

  const tracksOffset = Math.max(...alignment.map(({ from }) => from));

  const findHighlighPositions = useCallback(
    ({ displaystart, displayend }: EventDetail) => {
      const start = tracksOffset + parseInt(displaystart, 10);
      const end = tracksOffset + parseInt(displayend, 10);
      setHighlighPosition(`${start}:${end}`);
    },
    [tracksOffset]
  );

  const managerRef = useCallback(
    (node): void => {
      if (node && initialDisplayEnd) {
        node.addEventListener('change', ({ detail }: { detail: EventDetail }) =>
          findHighlighPositions(detail)
        );
        node.setAttribute('displaystart', 1);
        node.setAttribute('displayend', initialDisplayEnd);
        setHighlighPosition(
          `${tracksOffset}:${tracksOffset + initialDisplayEnd}`
        );
      }
    },
    [initialDisplayEnd, findHighlighPositions, tracksOffset]
  );

  const setMSAAttributes = useCallback(
    (node): void => {
      if (!node) {
        return;
      }

      const displayEndValue =
        alignmentLength / (15 / node.getSingleBaseWidth());

      const maxSequenceLength = Math.max(
        ...alignment.map((al) => al.sequence.length)
      );
      if (displayEndValue < maxSequenceLength) {
        setInitialDisplayEnd(displayEndValue);
      } else {
        setInitialDisplayEnd(maxSequenceLength);
      }

      node.data = alignment.map(({ name, sequence }) => ({ name, sequence }));
    },
    [alignment, alignmentLength]
  );

  // This should use state to handle selection of alignment and set features
  const features = useMemo(() => alignment[1].features, [alignment]);

  const setFeatureTrackData = useCallback(
    (node): void => {
      if (node && features && annotation) {
        let processedFeatures = processFeaturesData(
          features.filter(({ type }) => type === annotation)
        );
        processedFeatures = transformFeaturesPositions(processedFeatures);
        node.data = processedFeatures;
      }
    },
    [features, annotation]
  );

  const setOverviewTrackData = useCallback(
    (node): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = getFullAlignmentSegments(alignment)
          .map(({ trackData }) => trackData)
          .flat();
      }
    },
    [alignment]
  );

  return (
    <section
      data-testid="overview-hsp-detail"
      className="hsp-detail-panel__visualisation"
    >
      {/* Query track */}
      {/* NOTE: both tracks currently merged into one - new Nightingale component needed */}
      <section className="hsp-label">Overview</section>
      <protvista-track
        height="30"
        ref={setOverviewTrackData}
        length={totalLength}
        layout="non-overlapping"
        highlight={highlightPosition}
      />
      {/* Match track - coloured based on score */}
      {/* <section className="hsp-label">
        <Link to={`/uniprotkb/${hitAccession}`}>{hitAccession}</Link>
      </section>
      <protvista-track
        height="30"
        ref={setMatchTrackData}
        length={totalLength}
        layout="overlapping"
        highlight={highlightPosition}
      /> */}
      <section className="hsp-label">{annotation}</section>
      <protvista-track
        ref={setFeatureTrackData}
        length={totalLength}
        layout="non-overlapping"
        highlight={highlightPosition}
      />
      <section className="hsp-label">Alignment</section>
      <protvista-manager ref={managerRef} attributes="displaystart displayend">
        <protvista-navigation length={alignmentLength} />
        <protvista-msa
          ref={setMSAAttributes}
          // Looks like displaylength initialisation is ignored when there's labels - bug in MSA
          // labelwidth={200}
          length={alignmentLength}
          height={alignment.length * 20}
          colorscheme={highlightProperty}
          {...conservationOptions}
        />
      </protvista-manager>
    </section>
  );
};

export default MSAView;
