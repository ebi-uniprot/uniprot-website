import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { TreeSelect } from 'franklin-sites';
import { formatTooltip } from 'protvista-feature-adapter';

import Wrapped from './Wrapped';
import Overview from './Overview';

import {
  MsaColorScheme,
  colorSchemeTree,
  msaColorSchemeToString,
} from '../config/msaColorSchemes';

import {
  findSequenceFeature,
  getFullAlignmentLength,
  getMSAFeature,
  MSAFeature,
} from '../utils/sequences';
import { prepareFeatureForTooltip } from '../utils/feature';

import FeatureType from '../../uniprotkb/types/featureType';
import {
  ConservationOptions,
  MSAInput,
  UpdateTooltip,
} from '../types/alignment';

import './styles/AlignmentView.scss';
import { showTooltipAtCoordinates } from '../../shared/utils/tooltip';

export enum View {
  overview = 'Overview',
  wrapped = 'Wrapped',
}

export enum Tool {
  align = 'Align',
  blast = 'BLAST',
}

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

type AlignmentViewProps = {
  alignment: MSAInput[];
  alignmentLength: number;
  defaultView?: View;
  tool: Tool;
  selectedEntries?: string[];
  handleEntrySelection?: (rowId: string) => void;
  containerSelector?: string;
};

const AlignmentView = ({
  alignment,
  alignmentLength,
  defaultView,
  tool,
  selectedEntries,
  handleEntrySelection,
  containerSelector,
}: AlignmentViewProps) => {
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
          items: Array.from(new Set(sequence.features?.map((f) => f.type))).map(
            (label) => ({ label, id: `${sequence.accession}|${label}` })
          ),
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
          handleEntrySelection,
        }
      : {};

  const handleHighlightSelect = useCallback(({ id }: { id: string }) => {
    // switch the flag when a user manually changes the highlight
    highlightChanged.current = true;
    setHighlightProperty(id as MsaColorScheme);
  }, []);

  const handleAnnotationSelect = useCallback(({ id }: { id: string }) => {
    // switch the flag when a user manually changes the annotation
    const [accession, feature] = id.split('|') as [string, FeatureType];
    annotationChanged.current = true;
    setAnnotation(feature);
    setActiveId(accession);
  }, []);

  const updateTooltip: UpdateTooltip = useCallback(
    ({ id, x, y }) => {
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
      const title = `${preparedFeature.type} ${preparedFeature.start}-${preparedFeature.end}`;
      showTooltipAtCoordinates(
        x,
        y - yOffset,
        `<h4>${title}</h4>${formatTooltip(preparedFeature)}`
      );
    },
    [alignment, containerSelector]
  );

  const onMSAFeatureClick = useCallback(
    ({ event, id }) => {
      updateTooltip({ id, x: event.x, y: event.y, event });
    },
    [updateTooltip]
  );

  const defaultActiveNodes = useMemo(() => [MsaColorScheme.CONSERVATION], []);

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
          variant="tertiary"
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
            variant="tertiary"
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
