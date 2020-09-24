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
import ProtvistaManager from 'protvista-manager';
import ProtvistaNavigation from 'protvista-navigation';
import ProtvistaTrack from 'protvista-track';
import ProtvistaMSA from 'protvista-msa';
import { MsaColorScheme } from '../config/msaColorSchemes';
import FeatureType from '../../uniprotkb/types/featureType';
import { loadWebComponent } from '../../shared/utils/utils';
import { MSAInput, ConservationOptions } from './AlignmentView';
import { processFeaturesData } from '../../uniprotkb/components/protein-data-views/FeaturesView';
import {
  transformFeaturesPositions,
  getFullAlignmentSegments,
} from '../utils/sequences';
import AlignmentOverview from './AlignmentOverview';

import './styles/alignment-view.scss';

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
  const [msaOffsetTop, setMsaOffsetTop] = useState<number | undefined>();
  const [displayPosition, setDisplayPosition] = useState<
    [number | null, number | null]
  >([null, null]);

  const tracksOffset = Math.max(...alignment.map(({ from }) => from));

  const findHighlighPositions = useCallback(
    (event: EventDetail) => {
      const displaystart = parseInt(event.displaystart, 10);
      const displayend = parseInt(event.displayend, 10);
      const start = tracksOffset + displaystart;
      const end = tracksOffset + displayend;
      setDisplayPosition([displaystart, displayend]);
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
      console.log(node.getBoundingClientRect());
      console.log(node.offsetLeft, node.offsetTop);
      setMsaOffsetTop(node.offsetTop);

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

  const overviewHeight: string = (alignment && alignment.length > 10
    ? alignment.length * 3
    : 30
  ).toString();

  return (
    <section data-testid="alignment-view" className="msa-view">
      {/* Query track */}
      {/* NOTE: both tracks currently merged into one - new Nightingale component needed */}

      <section className="msa-view__row msa-view__row">
        <span className="track-label">Overview</span>
        <div className="track">
          <AlignmentOverview
            height={overviewHeight}
            length={totalLength}
            highlight={highlightPosition}
            data={alignment ? getFullAlignmentSegments(alignment) : []}
          />
        </div>
      </section>

      <section className="msa-view__row">
        <span className="track-label">{annotation}</span>
        <div className="track">
          <protvista-track
            ref={setFeatureTrackData}
            length={totalLength}
            layout="non-overlapping"
            highlight={highlightPosition}
          />
        </div>
      </section>

      <section className="msa-view__row msa-view__row--msa-track">
        <div className="track-label">
          {alignment.map((s, index) => (
            <div
              style={{
                height: 20,
                marginTop: index === 0 ? msaOffsetTop : undefined,
              }}
              key={s.name}
            >
              {s.accession || s.name}
            </div>
          ))}
        </div>
        <span className="left-coord">
          {alignment.map((s, index) => (
            <div
              style={{
                height: 20,
                marginTop: index === 0 ? msaOffsetTop : undefined,
              }}
              key={s.name}
            >
              {displayPosition[0]}
            </div>
          ))}
        </span>
        <div className="track">
          <protvista-manager
            ref={managerRef}
            attributes="displaystart displayend"
          >
            <protvista-navigation length={alignmentLength} />
            <protvista-msa
              ref={setMSAAttributes}
              length={alignmentLength}
              height={alignment.length * 20}
              colorscheme={highlightProperty}
              {...conservationOptions}
            />
          </protvista-manager>
        </div>
        <span className="right-coord">
          {alignment.map((s, index) => (
            <div
              style={{
                height: 20,
                marginTop: index === 0 ? msaOffsetTop : undefined,
              }}
              key={s.name}
            >
              {displayPosition[1]}
            </div>
          ))}
        </span>
      </section>

      {/* <section className="hsp-label">{annotation}</section>
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
          length={alignmentLength}
          height={alignment.length * 20}
          colorscheme={highlightProperty}
          {...conservationOptions}
        />
      </protvista-manager> */}
    </section>
  );
};

export default MSAView;
