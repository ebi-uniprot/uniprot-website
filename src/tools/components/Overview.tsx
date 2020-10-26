/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { Loader } from 'franklin-sites';
import { formatTooltip } from 'protvista-feature-adapter';

import AlignmentOverview from './AlignmentOverview';
import AlignLabel from '../align/components/results/AlignLabel';

import useCustomElement from '../../shared/hooks/useCustomElement';
import { processFeaturesData } from '../../uniprotkb/components/protein-data-views/FeaturesView';
import {
  getFullAlignmentSegments,
  getEndCoordinate,
  createGappedFeature,
} from '../utils/sequences';

import { MsaColorScheme } from '../config/msaColorSchemes';
import FeatureType from '../../uniprotkb/types/featureType';

import { MSAInput, ConservationOptions } from './AlignmentView';

import './styles/alignment-view.scss';

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
  omitInsertionsInCoords?: boolean;
  selectedEntries?: string[];
  handleSelectedEntries?: (rowId: string) => void;
};

// NOTE: hardcoded for now, might need to change that in the future if need be
const sequenceHeight = 20;
const heightStyle = { height: `${sequenceHeight}px` };

const findSequenceFeature = (protvistaFeatureId, alignment) => {
  for (const sequence of alignment) {
    const foundFeature = sequence.features.find(
      (feature) => feature.protvistaFeatureId === protvistaFeatureId
    );
    if (foundFeature) {
      return { sequence, feature: foundFeature };
    }
  }
};

const AlignOverview: FC<BlastOverviewProps> = ({
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
  handleSelectedEntries,
}) => {
  const tooltipRef = useRef();
  const trackRef = useRef();

  const [highlightPosition, setHighlighPosition] = useState('');
  const [initialDisplayEnd, setInitialDisplayEnd] = useState<
    number | undefined
  >();
  const [displayEnd, setDisplayEnd] = useState<number>();
  const [tooltipContent, setTooltipContent] = useState();

  const tracksOffset = Math.max(...alignment.map(({ from }) => from));
  const findHighlighPositions = useCallback(
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

  const updateTooltip = useCallback(
    ({ id, x, y, event }) => {
      event.stopPropagation();
      event.preventDefault();
      console.log('in updatetooltip');
      const { feature } = findSequenceFeature(id, alignment);
      tooltipRef.current.title = `${feature.type} ${feature.start}-${feature.end}`;
      setTooltipContent({ __html: formatTooltip(feature) });
      const rect = trackRef.current.getBoundingClientRect();
      // tooltipRef.current.x = event.layerX; // event.x;
      tooltipRef.current.x = x - rect.x; // event.x;
      tooltipRef.current.y = y - rect.y; // event.y;
      // console.log(tooltipRef.current);
    },
    [alignment]
  );

  useEffect(() => {
    const f = (e) => {
      console.log('in closing fn');
      // If click is inside of the tooltip, don't do anything
      // if (tooltipContent && tooltipRef.current.contains(e.target)) {
      if (tooltipRef.current.contains(e.target)) {
        return;
      }
      setTooltipContent(null);
      // tooltipRef.current.visible = false;
    };
    console.log('window.addEventListener(click, f)');
    window.addEventListener('click', f);

    const handleEvent = (event) => {
      if (event.detail.eventtype === 'click') {
        // console.log(event.detail.feature);
        updateTooltip({
          event,
          id: event.detail.feature.protvistaFeatureId,
          x: event.detail.coords[0],
          y: event.detail.coords[1],
        });
      }
    };
    window.addEventListener('change', handleEvent);
    return () => {
      window.removeEventListener('change', handleEvent);
      window.removeEventListener('click', f);
    };
  }, []);

  const managerRef = useCallback(
    (node): void => {
      if (node && initialDisplayEnd) {
        // if (node && initialDisplayEnd && typeof displayEnd === 'undefined') {
        node.addEventListener('change', ({ detail }: { detail: EventDetail }) =>
          findHighlighPositions(detail)
        );
        node.setAttribute('displaystart', 1);
        node.setAttribute('displayend', initialDisplayEnd);
        setHighlighPosition(
          (highlight) =>
            highlight || `${tracksOffset}:${tracksOffset + initialDisplayEnd}`
        );
      }
    },
    [initialDisplayEnd, findHighlighPositions, tracksOffset]
  );

  const msaDefined = useCustomElement(
    () => import(/* webpackChunkName: "protvista-msa" */ 'protvista-msa'),
    'protvista-msa'
  );

  const getMSAFeature = (feature, sequence, sequenceIndex) => {
    const gappedFeature = createGappedFeature(feature, sequence);
    return {
      residues: { from: gappedFeature.start, to: gappedFeature.end },
      sequences: { from: sequenceIndex, to: sequenceIndex },
      id: feature.protvistaFeatureId,
      borderColor: 'black',
      fillColor: 'transparent',
      mouseOverFillColor: 'black',
    };
  };

  const selectedFeatures = useMemo(
    () =>
      alignment.flatMap(({ sequence, features = [] }, index) =>
        features
          .filter(({ type }) => type === annotation)
          .map((feature) => getMSAFeature(feature, sequence, index))
      ),
    [alignment, annotation]
  );

  const setMSAAttributes = useCallback(
    (node): void => {
      if (!(node && msaDefined)) {
        return;
      }

      node.features = selectedFeatures;
      node.onFeatureClick = ({ id, event }) => {
        updateTooltip({ id, x: event.x, y: event.y, event });
      };

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
      selectedFeatures,
      updateTooltip,
      alignmentLength,
      alignment,
      displayEnd,
    ]
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
  const tooltipDefined = useCustomElement(
    () =>
      import(/* webpackChunkName: "protvista-tooltip" */ 'protvista-tooltip'),
    'protvista-tooltip'
  );

  const ceDefined =
    trackDefined &&
    navigationDefined &&
    msaDefined &&
    managerDefined &&
    tooltipDefined;

  const activeAlignment = useMemo(
    () =>
      alignment.find(({ accession }) => accession && accession === activeId),
    [alignment, activeId]
  );

  const setFeatureTrackData = useCallback(
    (node): void => {
      if (node && ceDefined && activeAlignment?.features && annotation) {
        node.data = activeAlignment.features
          .filter(({ type }) => type === annotation)
          .map((f) => createGappedFeature(f, activeAlignment.sequence));

        node.test = 'test';
      }
    },
    [ceDefined, activeAlignment, annotation]
  );

  const overviewHeight = (alignment && alignment.length > 10
    ? alignment.length * 3
    : 30
  ).toString();

  const alignmentOverviewData = useMemo(() => {
    return alignment ? getFullAlignmentSegments(alignment) : [];
  }, [alignment]);

  if (!ceDefined) {
    return <Loader />;
  }

  // console.log('visible', !!tooltipContent);

  return (
    <section data-testid="alignment-view" className="alignment-grid">
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
      <span className="track-label">{annotation}</span>
      <div className="track" ref={trackRef}>
        <protvista-track
          ref={setFeatureTrackData}
          length={totalLength}
          layout="non-overlapping"
          highlight={highlightPosition}
          // onClick={(e) => {
          //   console.log(e.target, e.detail);
          // }}
        />
        <protvista-tooltip
          ref={tooltipRef}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={tooltipContent}
          visible={!!tooltipContent}
        />
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
            onSequenceChecked={handleSelectedEntries}
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
