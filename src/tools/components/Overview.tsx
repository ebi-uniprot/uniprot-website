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
  getEndCoordinate,
} from '../utils/sequences';
import AlignmentOverview from './AlignmentOverview';
import AlignLabel from '../align/components/results/AlignLabel';

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

export type BlastOverviewProps = {
  alignment: MSAInput[];
  alignmentLength: number;
  highlightProperty: MsaColorScheme | undefined;
  conservationOptions: ConservationOptions;
  totalLength: number;
  annotation: FeatureType | undefined;
  activeId?: string;
  setActiveId?: Dispatch<SetStateAction<string | undefined>>;
  onSequenceChecked?: (id: string) => void;
  omitInsertionsInCoords?: boolean;
};

const AlignOverview: FC<BlastOverviewProps> = ({
  alignment,
  alignmentLength,
  highlightProperty,
  conservationOptions,
  totalLength,
  annotation,
  activeId,
  setActiveId = () => null,
  onSequenceChecked,
  omitInsertionsInCoords,
}) => {
  const [highlightPosition, setHighlighPosition] = useState('');
  const [initialDisplayEnd, setInitialDisplayEnd] = useState<
    number | undefined
  >();
  const [displayEnd, setDisplayEnd] = useState<number>();
  const [msaOffsetTop, setMsaOffsetTop] = useState<number | undefined>();

  const tracksOffset = Math.max(...alignment.map(({ from }) => from));

  const findHighlighPositions = useCallback(
    ({ displaystart, displayend }: EventDetail) => {
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
    <section data-testid="alignment-view" className="alignment-grid">
      {/* Query track */}
      {/* NOTE: both tracks currently merged into one - new Nightingale component needed */}

      <section className="alignment-grid__row">
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

      <section className="alignment-grid__row">
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

      <section className="alignment-grid__row alignment-grid__row--msa-track">
        <div className="track-label track-label--align-labels">
          {alignment.map((s, index) => (
            <AlignLabel
              accession={s.accession}
              info={s}
              loading={false}
              key={s.name}
              style={{
                height: 20,
                marginTop: index === 0 ? msaOffsetTop : undefined,
              }}
              onSequenceChecked={onSequenceChecked}
              onIdClick={() => setActiveId(s.accession)}
              active={!!activeId && activeId === s.accession}
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
              {omitInsertionsInCoords
                ? getEndCoordinate(
                    s.sequence,
                    displayEnd ?? initialDisplayEnd ?? 0
                  )
                : displayEnd ?? initialDisplayEnd ?? 0}
            </div>
          ))}
        </span>
      </section>
    </section>
  );
};

export default AlignOverview;
