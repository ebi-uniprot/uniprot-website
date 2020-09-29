import React, {
  useState,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import { DropdownButton } from 'franklin-sites';
import cn from 'classnames';

import Wrapped from './Wrapped';
import Overview from './Overview';

import {
  msaColorSchemeToString,
  MsaColorScheme,
} from '../config/msaColorSchemes';

import { getFullAlignmentLength } from '../utils/sequences';

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
}> = ({ alignment, alignmentLength, defaultView, tool }) => {
  const annotationChoices = useMemo(() => {
    const features = alignment
      .map(({ features }) => features)
      .flat()
      .filter((features) => features);

    return Array.from(new Set(features?.map((feature) => feature?.type)));
  }, [alignment]);

  const [activeView, setActiveView] = useState<View>(
    defaultView || View.wrapped
  );
  const [annotation, setAnnotation] = useState<FeatureType | undefined>(
    annotationChoices[0]
  );
  const [highlightProperty, setHighlightProperty] = useState<MsaColorScheme>(
    MsaColorScheme.CLUSTAL
  );
  const [activeId, setActiveId] = useState<string | undefined>(
    alignment
      .filter(({ accession }) => accession)
      .map(({ accession }) => accession)[0]
  );

  const [checkedIds, setCheckedIds] = useState<{ [id: string]: boolean }>({});

  useEffect(() => {
    // if no default value was available on first render, set it now
    if (!annotation && annotationChoices.length) {
      setAnnotation(annotationChoices[0]);
    }
  }, [annotation, annotationChoices]);

  const totalLength = getFullAlignmentLength(alignment, alignmentLength);

  const conservationOptions: ConservationOptions =
    highlightProperty === MsaColorScheme.CONSERVATION
      ? {
          'calculate-conservation': true,
          'overlay-conservation': true,
        }
      : {};

  const handleSequenceChecked = (id: string) => {
    setCheckedIds({ ...checkedIds, [id]: !checkedIds[id] });
  };

  const AlignmentComponent = activeView === View.overview ? Overview : Wrapped;
  const additionalAlignProps =
    tool === Tool.align
      ? {
          setActiveId,
          omitInsertionsInCoords: true,
          onSequenceChecked: handleSequenceChecked,
        }
      : {};

  return (
    <>
      <div className="button-group">
        <DropdownButton label="Highlight properties" className="tertiary">
          <div className="dropdown-menu__content">
            <ul>
              {Object.entries(msaColorSchemeToString).map(
                ([schemeValue, schemeString]) => (
                  <li key={schemeString}>
                    <button
                      type="button"
                      className={cn('button', {
                        primary: highlightProperty === schemeValue,
                        tertiary: highlightProperty !== schemeValue,
                      })}
                      onClick={() =>
                        setHighlightProperty(schemeValue as MsaColorScheme)
                      }
                    >
                      {schemeString}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </DropdownButton>
        {!!annotationChoices.length && (
          <DropdownButton label="Show annotation" className="tertiary">
            <div className="dropdown-menu__content">
              <ul>
                {annotationChoices.map((annotationChoice) => (
                  <li key={annotationChoice}>
                    <button
                      type="button"
                      className={cn('button', 'annotation-choice', {
                        primary: annotation === annotationChoice,
                        tertiary: annotation !== annotationChoice,
                      })}
                      onClick={() => setAnnotation(annotationChoice)}
                    >
                      {annotationChoice}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </DropdownButton>
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
          alignment={alignment}
          alignmentLength={alignmentLength}
          highlightProperty={highlightProperty}
          conservationOptions={conservationOptions}
          totalLength={totalLength}
          annotation={annotation}
          activeId={activeId}
          {...additionalAlignProps}
        />
      </div>
    </>
  );
};

export default AlignmentView;
