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

import Wrapped from './Wrapped';
import Overview from './Overview';

import {
  MsaColorScheme,
  colorSchemeTree,
  msaColorSchemeToString,
} from '../config/msaColorSchemes';

import useCustomElement from '../../shared/hooks/useCustomElement';
import {
  createGappedFeature,
  findSequenceFeature,
  getFullAlignmentLength,
  getMSAFeature,
} from '../utils/sequences';

import FeatureType from '../../uniprotkb/types/featureType';
import { FeatureData } from '../../uniprotkb/components/protein-data-views/FeaturesView';

import './styles/AlignmentView.scss';

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
  features?: FeatureData;
};

export type Sequence = {
  name: string;
  sequence: string;
  start: number;
  end: number;
  features?: FeatureData;
  accession?: string;
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

const isNonEmptyMenuItem = (item: PossiblyEmptyMenuItem): item is MenuItem =>
  Boolean(item.id && item.label && item.items.length);

export type MSAViewProps = {
  alignment: MSAInput[];
  alignmentLength: number;
  highlightProperty: MsaColorScheme | undefined;
  conservationOptions: ConservationOptions;
  totalLength: number;
  annotation: FeatureType | undefined;
  activeId?: string;
  setActiveId: Dispatch<SetStateAction<string | undefined>>;
};

const AlignmentView: React.FC<{
  alignment: MSAInput[];
  alignmentLength: number;
  defaultView?: View;
  tool: Tool;
  selectedEntries?: string[];
  handleSelectedEntries?: (rowId: string) => void;
}> = ({
  alignment,
  alignmentLength,
  defaultView,
  tool,
  selectedEntries,
  handleSelectedEntries,
  containerSelector,
}) => {
  const [tooltipContent, setTooltipContent] = useState();
  const tooltipRef = useRef();

  const tooltipDefined = useCustomElement(
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
    () =>
      alignment.flatMap(({ sequence, features = [] }, index) =>
        features
          .filter(({ type }) => type === annotation)
          .map((feature) =>
            getMSAFeature(feature, sequence, index, activeAlignment?.from)
          )
          .filter(Boolean)
      ),
    [activeAlignment?.from, alignment, annotation]
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

  const updateTooltip = useCallback(
    ({ id, x, y, event }) => {
      event.stopPropagation();
      const { feature } = findSequenceFeature(id, alignment);
      if (feature.evidences) {
        feature.evidences = feature.evidences.map((e) => ({
          ...e,
          code: e.evidenceCode,
          source: {
            id: e.id,
            code: e.evidenceCode,
            name: e.source,
            url: `https://pubmed.ncbi.nlm.nih.gov/${e.id}`,
            alternativeUrl: `https://europepmc.org/article/MED/${e.id}`,
          },
        }));
      }
      let yOffset = 0;
      if (containerSelector) {
        const panel = document.querySelector(containerSelector);
        const rect = panel?.getBoundingClientRect();
        yOffset = rect.y;
      }
      tooltipRef.current.title = `${feature.type} ${feature.start}-${feature.end}`;
      setTooltipContent({ __html: formatTooltip(feature) });
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

  useEffect(() => {
    const handleEvent = (event: Event & { detail: any }) => {
      if (event?.detail?.eventtype === 'click') {
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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const className = '.main-content-and-footer';
    const mainContentAndFooter = document.querySelector(className);
    if (!mainContentAndFooter) {
      throw Error(`Cannot find :${className}`);
    }
    const handleScroll = () => {
      setTooltipContent(null);
    };
    mainContentAndFooter.addEventListener('scroll', handleScroll, {
      passive: false,
    });
    // Cleanup
    return () => {
      mainContentAndFooter.removeEventListener('scroll', handleScroll);
    };
  }, [setTooltipContent]);

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
        {annotationsPerEntry.length && (
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
