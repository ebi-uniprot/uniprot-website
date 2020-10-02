/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import React, {
  FC,
  useCallback,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { Loader } from 'franklin-sites';

import { MSAInput, ConservationOptions } from './MSAWrapper';
import AlignmentOverview from './AlignmentOverview';

import { processFeaturesData } from '../../uniprotkb/components/protein-data-views/FeaturesView';
import {
  transformFeaturesPositions,
  getFullAlignmentSegments,
} from '../utils/sequences';
import useCustomElement from '../../shared/hooks/useCustomElement';

import { MsaColorScheme } from '../config/msaColorSchemes';
import FeatureType from '../../uniprotkb/types/featureType';

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
  selectedId?: string;
  setSelectedId: Dispatch<SetStateAction<string | undefined>>;
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

  const msaDefined = useCustomElement(
    () => import(/* webpackChunkName: "protvista-msa" */ 'protvista-msa'),
    'protvista-msa'
  );

  const setMSAAttributes = useCallback(
    (node): void => {
      if (!(node && msaDefined)) {
        return;
      }

      const singleBaseWidth =
        'getSingleBaseWidth' in node ? node.getSingleBaseWidth() : 15;
      const displayEndValue = alignmentLength / (15 / singleBaseWidth);

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
    [msaDefined, alignment, alignmentLength]
  );

  const trackDefined = useCustomElement(
    () => import(/* webpackChunkName: "protvista-track" */ 'protvista-track'),
    'protvista-track'
  );
  const navigationDefined = useCustomElement(
    () =>
      import(
        /* webpackChunkName: "protvista-navigation" */ 'protvista-navigation'
      ),
    'protvista-navigation'
  );
  const managerDefined = useCustomElement(
    () =>
      import(/* webpackChunkName: "protvista-manager" */ 'protvista-manager'),
    'protvista-manager'
  );

  const ceDefined =
    trackDefined && navigationDefined && msaDefined && managerDefined;

  // This should use state to handle selection of alignment and set features
  const features = useMemo(() => alignment[1].features, [alignment]);

  const setFeatureTrackData = useCallback(
    (node): void => {
      if (node && ceDefined && features && annotation) {
        let processedFeatures = processFeaturesData(
          features.filter(({ type }) => type === annotation)
        );
        processedFeatures = transformFeaturesPositions(processedFeatures);
        node.data = processedFeatures;
      }
    },
    [ceDefined, features, annotation]
  );

  const overviewHeight: string = (alignment && alignment.length > 10
    ? alignment.length * 3
    : 30
  ).toString();

  if (!ceDefined) {
    return <Loader />;
  }

  return (
    <section
      data-testid="overview-hsp-detail"
      className="hsp-detail-panel__visualisation"
    >
      {/* Query track */}
      {/* NOTE: both tracks currently merged into one - new Nightingale component needed */}
      <section className="hsp-label">Overview</section>

      <AlignmentOverview
        height={overviewHeight}
        length={totalLength}
        highlight={highlightPosition}
        data={alignment ? getFullAlignmentSegments(alignment) : []}
      />
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
