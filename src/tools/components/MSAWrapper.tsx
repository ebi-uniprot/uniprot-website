import React, { useState, useEffect, useMemo } from 'react';
import { DropdownButton } from 'franklin-sites';
import cn from 'classnames';

import MSAView from './MSAView';
import MSAWrappedView from './MSAWrappedView';

import {
  msaColorSchemeToString,
  MsaColorScheme,
} from '../config/msaColorSchemes';

import { getFullAlignmentLength } from '../utils/sequences';

import FeatureType from '../../uniprotkb/types/featureType';
import { FeatureData } from '../../uniprotkb/components/protein-data-views/FeaturesView';

import './styles/MSAWrapper.scss';

export type ConservationOptions = {
  'calculate-conservation'?: true;
  'overlay-conservation'?: true;
};

export enum View {
  overview = 'Overview',
  wrapped = 'Wrapped',
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

const MSAWrapper: React.FC<{
  alignment: MSAInput[];
  alignmentLength: number;
  defaultView?: View;
}> = ({ alignment, alignmentLength, defaultView }) => {
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
  const [selectedId, setSelectedId] = useState<string | undefined>(
    alignment
      .filter(({ accession }) => accession)
      .map(({ accession }) => accession)[0]
  );

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
        {activeView === View.overview ? (
          <MSAView
            alignment={alignment}
            alignmentLength={alignmentLength}
            highlightProperty={highlightProperty}
            conservationOptions={conservationOptions}
            totalLength={totalLength}
            annotation={annotation}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        ) : (
          <MSAWrappedView
            alignment={alignment}
            alignmentLength={alignmentLength}
            highlightProperty={highlightProperty}
            conservationOptions={conservationOptions}
            totalLength={totalLength}
            annotation={annotation}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        )}
      </div>
    </>
  );
};

export default MSAWrapper;
