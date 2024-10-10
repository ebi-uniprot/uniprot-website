import { Dispatch, SetStateAction } from 'react';
import { ProcessedFeature } from '../../shared/components/views/FeaturesView';
import FeatureType from '../../uniprotkb/types/featureType';
import { MsaColorScheme } from '../config/msaColorSchemes';
import { MSAFeature } from '../utils/sequences';
import { OnFeatureClick } from '../../shared/custom-elements/NightingaleMSA';

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
  eventtype: string;
  feature: { protvistaFeatureId: string };
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
