import React, {
  useState,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
  useRef,
  useCallback,
} from 'react';
import { TreeSelect, Loader } from 'franklin-sites';
import { formatTooltip } from 'protvista-feature-adapter';
import useEventListener from '@use-it/event-listener';

import Wrapped from './Wrapped';
import Overview from './Overview';

import {
  MsaColorScheme,
  colorSchemeTree,
  msaColorSchemeToString,
} from '../config/msaColorSchemes';

import useCustomElement from '../../shared/hooks/useCustomElement';
import {
  findSequenceFeature,
  getFullAlignmentLength,
  getMSAFeature,
  MSAFeature,
} from '../utils/sequences';

import FeatureType from '../../uniprotkb/types/featureType';
import { ProcessedFeature } from '../../uniprotkb/components/protein-data-views/FeaturesView';

import './styles/AlignmentView.scss';
import { prepareFeatureForTooltip } from '../utils/feature';

export type ConservationOptions = {
  'calculate-conservation'?: true;
  'overlay-conservation'?: true;
};

export enum View {
  overview = 'Overview',
  wrapped = 'Wrapped',
}

export enum Tool {
  align = 'Align',
  blast = 'BLAST',
}

export type MSAInput = {
  name?: string;
  accession?: string;
  sequence: string;
  from: number;
  to: number;
  length: number;
  features?: ProcessedFeature[];
};

type PossiblyEmptyMenuItem = {
  label: string | undefined;
  id: string | undefined;
  items: {
    label: FeatureType;
    id: string;
  }[];
};
type MenuItem = {
  label: string;
  id: string;
  items: {
    label: FeatureType;
    id: string;
  }[];
};

type NightingaleChangeEvent = {
  eventtype: string;
  feature: { protvistaFeatureId: string };
  coords: number[];
};

export type AlignmentComponentProps = {
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
  selectedMSAFeatures?: MSAFeature[];
  activeAnnotation: ProcessedFeature[];
  activeAlignment?: MSAInput;
  onMSAFeatureClick: ({ event, id }: { event: Event; id: string }) => void;
  updateTooltip: UpdateTooltip;
};

const isNonEmptyMenuItem = (item: PossiblyEmptyMenuItem): item is MenuItem =>
  Boolean(item.id && item.label && item.items.length);

type UpdateTooltip = (arg: {
  id: string;
  x: number;
  y: number;
  event: CustomEvent<NightingaleChangeEvent>;
}) => void;

export const handleEvent = (updateTooltip: UpdateTooltip) => (
  event: CustomEvent<NightingaleChangeEvent>
) => {
  if (event?.detail?.eventtype === 'click') {
    updateTooltip({
      event,
      id: event.detail.feature.protvistaFeatureId,
      x: event.detail.coords[0],
      y: event.detail.coords[1],
    });
  }
};

const AlignmentView: React.FC<{
  alignment: MSAInput[];
  alignmentLength: number;
  defaultView?: View;
  tool: Tool;
  selectedEntries?: string[];
  handleSelectedEntries?: (rowId: string) => void;
  containerSelector?: string;
}> = ({
  alignment,
  alignmentLength,
  defaultView,
  tool,
  selectedEntries,
  handleSelectedEntries,
  containerSelector,
}) => {
  const [tooltipContent, setTooltipContent] = useState<{
    __html: string;
  } | null>();
  const tooltipRef = useRef<JSX.IntrinsicElements['protvista-tooltip']>();

  const tooltipDefined = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-tooltip" */ 'protvista-tooltip'),
    'protvista-tooltip'
  );

  const annotationChoices = useMemo(() => {
    const features = alignment
      .map(({ features }) => features)
      .flat()
      .filter((features) => features);

    return Array.from(new Set(features?.map((feature) => feature?.type)));
  }, [alignment]);

  const annotationsPerEntry = useMemo(
    () =>
      alignment
        .map((sequence) => ({
          label: sequence.name,
          id: sequence.accession,
          items: Array.from(
            new Set(sequence.features?.map((f) => f.type))
          ).map((label) => ({ label, id: `${sequence.accession}|${label}` })),
        }))
        .filter(isNonEmptyMenuItem),
    [alignment]
  );
  const defaultActiveAnnotation = useMemo(
    () =>
      annotationsPerEntry.length
        ? [annotationsPerEntry[0].id, annotationsPerEntry[0].items[0].id]
        : undefined,
    [annotationsPerEntry]
  );

  const [activeView, setActiveView] = useState<View>(
    defaultView || View.wrapped
  );
  const [annotation, setAnnotation] = useState<FeatureType | undefined>(
    annotationChoices[0]
  );
  const annotationChanged = useRef(false);
  const [highlightProperty, setHighlightProperty] = useState<MsaColorScheme>(
    MsaColorScheme.CONSERVATION
  );
  const highlightChanged = useRef(false);
  const [activeId, setActiveId] = useState<string | undefined>(
    alignment
      .filter(({ accession }) => accession)
      .map(({ accession }) => accession)[0]
  );

  const activeAlignment = useMemo(
    () =>
      alignment.find(({ accession }) => accession && accession === activeId),
    [alignment, activeId]
  );

  const activeAnnotation = useMemo(
    () =>
      (activeAlignment?.features || []).filter(
        ({ type }) => type === annotation
      ),
    [activeAlignment, annotation]
  );

  useEffect(() => {
    // if no default value was available on first render, set it now
    if (!annotation && annotationChoices.length) {
      setAnnotation(annotationChoices[0]);
    }
  }, [annotation, annotationChoices]);

  const selectedMSAFeatures = useMemo(
    // This gets the features to display on all of the MSA sequences (ie not
    // just the active. Notice the final filter(Boolean), this is to remove
    // any features that occure before the start of the hit. This is only
    // relevant to BLAST results (hsp_query_from or hsp_hit_from).
    () => {
      if (!activeAlignment) {
        return;
      }

      // eslint-disable-next-line consistent-return
      return alignment.flatMap(
        ({ sequence, features = [] }, index) =>
          features
            .filter(({ type }) => type === annotation)
            .map((feature) =>
              getMSAFeature(feature, sequence, index, activeAlignment.from)
            )
            .filter(Boolean) as MSAFeature[]
      );
    },
    [activeAlignment, alignment, annotation]
  );

  const totalLength = getFullAlignmentLength(alignment, alignmentLength);

  const conservationOptions: ConservationOptions =
    highlightProperty === MsaColorScheme.CONSERVATION
      ? {
          'calculate-conservation': true,
          'overlay-conservation': true,
        }
      : {};

  const AlignmentComponent = activeView === View.overview ? Overview : Wrapped;
  const additionalAlignProps =
    tool === Tool.align
      ? {
          setActiveId,
          omitInsertionsInCoords: true,
          selectedEntries,
          handleSelectedEntries,
        }
      : {};

  const handleHighlightSelect = useCallback(
    ({ id }: { id: MsaColorScheme }) => {
      // switch the flag when a user manually changes the highlight
      highlightChanged.current = true;
      setHighlightProperty(id);
    },
    []
  );

  const handleAnnotationSelect = useCallback(({ id }: { id: string }) => {
    // switch the flag when a user manually changes the annotation
    const [accession, feature] = id.split('|') as [string, FeatureType];
    annotationChanged.current = true;
    setAnnotation(feature);
    setActiveId(accession);
  }, []);

  const tooltipCloseCallback = useCallback(
    (e) => {
      // If click is inside of the tooltip, don't do anything
      if (tooltipRef.current.contains(e.target)) {
        return;
      }

      setTooltipContent(null);
    },
    [setTooltipContent]
  );

  if (tooltipRef?.current) {
    tooltipRef.current.container = containerSelector;
  }

  const updateTooltip: UpdateTooltip = useCallback(
    ({ id, x, y, event }) => {
      event.stopPropagation();
      const sequenceFeature = findSequenceFeature(id, alignment);

      if (!sequenceFeature) {
        return;
      }

      const preparedFeature = prepareFeatureForTooltip(sequenceFeature);
      let yOffset = 0;
      if (containerSelector) {
        const panel = document.querySelector(containerSelector);
        const rect = panel?.getBoundingClientRect();
        if (rect?.y) {
          yOffset = rect.y;
        }
      }
      tooltipRef.current.title = `${preparedFeature.type} ${preparedFeature.start}-${preparedFeature.end}`;
      setTooltipContent({ __html: formatTooltip(preparedFeature) });
      tooltipRef.current.x = x;
      tooltipRef.current.y = y - yOffset;
    },
    [alignment, containerSelector]
  );

  const onMSAFeatureClick = useCallback(
    ({ event, id }) => {
      updateTooltip({ id, x: event.x, y: event.y, event });
    },
    [updateTooltip]
  );

  useEffect(() => {
    if (tooltipContent) {
      window.addEventListener('click', tooltipCloseCallback, true);
    } else {
      window.removeEventListener('click', tooltipCloseCallback, true);
    }

    return () =>
      window.removeEventListener('click', tooltipCloseCallback, true);
  }, [tooltipCloseCallback, tooltipContent]);

  // Need to listen for scroll events to close the tooltip to prevent
  // it from persisting and giving the appearance of floating, unanchored.
  // Can see this in the Wrapped view specifically when the number of rows
  // causes the page to scroll.
  const mainContentAndFooter = useMemo(() => {
    const className = '.main-content-and-footer';
    const el = document.querySelector(className);
    // tooltip is here but main-content-and-footer isn't
    if (tooltipRef.current && !el) {
      throw Error(`Cannot find :${className}`);
    }
    return el;
  }, [tooltipRef]);
  useEventListener(
    'scroll',
    () => {
      setTooltipContent(null);
    },
    mainContentAndFooter as HTMLElement
  );

  const tooltipVisibility = tooltipContent ? { visible: true } : {};

  const defaultActiveNodes = useMemo(() => [MsaColorScheme.CONSERVATION], []);

  if (!tooltipDefined) {
    return <Loader />;
  }

  return (
    <>
      <div className="button-group">
        <TreeSelect
          data={colorSchemeTree}
          onSelect={handleHighlightSelect}
          autocomplete
          autocompleteFilter
          autocompletePlaceholder="Enter a color scheme"
          label={
            highlightChanged.current
              ? `"${msaColorSchemeToString[highlightProperty]}" highlight`
              : 'Highlight properties'
          }
          defaultActiveNodes={defaultActiveNodes}
          className="tertiary"
        />
        {!!annotationsPerEntry.length && (
          <TreeSelect
            data={annotationsPerEntry}
            onSelect={handleAnnotationSelect}
            autocomplete
            autocompleteFilter
            autocompletePlaceholder="Look for an annotation"
            label={
              annotationChanged.current
                ? `Showing "${annotation}" in "${
                    annotationsPerEntry.find(({ id }) => id === activeId)?.label
                  }"`
                : 'Select annotation'
            }
            defaultActiveNodes={defaultActiveAnnotation}
            className="tertiary"
          />
        )}
        <fieldset className="msa-view-choice">
          View:
          <label>
            <input
              name="view"
              type="radio"
              checked={activeView === View.overview}
              onChange={() => setActiveView(View.overview)}
            />
            Overview
          </label>
          <label>
            <input
              name="view"
              type="radio"
              checked={activeView === View.wrapped}
              onChange={() => setActiveView(View.wrapped)}
            />
            Wrapped
          </label>
        </fieldset>
      </div>
      <div>
        <protvista-tooltip
          ref={tooltipRef}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={tooltipContent}
          {...tooltipVisibility}
        />
        <AlignmentComponent
          updateTooltip={updateTooltip}
          alignment={alignment}
          alignmentLength={alignmentLength}
          highlightProperty={highlightProperty}
          conservationOptions={conservationOptions}
          totalLength={totalLength}
          annotation={annotation}
          activeId={activeId}
          onMSAFeatureClick={onMSAFeatureClick}
          selectedMSAFeatures={selectedMSAFeatures}
          activeAnnotation={activeAnnotation}
          activeAlignment={activeAlignment}
          {...additionalAlignProps}
        />
      </div>
    </>
  );
};

export default AlignmentView;
