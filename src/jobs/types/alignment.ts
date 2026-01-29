import { type Dispatch, type SetStateAction } from 'react';

import { type ProcessedFeature } from '../../shared/components/views/FeaturesView';
import { type OnFeatureClick } from '../../shared/custom-elements/NightingaleMSA';
import type FeatureType from '../../uniprotkb/types/featureType';
import { type MsaColorScheme } from '../config/msaColorSchemes';
import { type MSAFeature } from '../utils/sequences';

export type MSAInput = {
  name?: string;
  accession?: string;
  sequence: string;
  from: number;
  to: number;
  length: number;
  features?: ProcessedFeature[];
};

export type ConservationOptions = {
  'calculate-conservation'?: true;
  'overlay-conservation'?: true;
};

export type NightingaleChangeEvent = {
  eventType: string;
  feature: { accession: string };
  coords: number[];
};

export type UpdateTooltip = (arg: { id: string; x: number; y: number }) => void;

export type OnMSAFeatureClick = (event: OnFeatureClick) => void;

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
  handleEntrySelection?: (rowId: string) => void;
  selectedMSAFeatures?: MSAFeature[];
  activeAnnotation: ProcessedFeature[];
  activeAlignment?: MSAInput;
  onMSAFeatureClick: OnMSAFeatureClick;
  updateTooltip: UpdateTooltip;
};
