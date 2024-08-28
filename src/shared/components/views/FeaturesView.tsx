import {
  Fragment,
  lazy,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Feature } from '@nightingale-elements/nightingale-track';

import LazyComponent from '../LazyComponent';

import { useSmallScreen } from '../../hooks/useMatchMedia';

import FeatureTypeHelpMappings from '../../../help/config/featureTypeHelpMappings';

import FeatureType from '../../../uniprotkb/types/featureType';
import { UniParcProcessedFeature } from '../../../uniparc/components/entry/UniParcFeaturesView';
import { Evidence } from '../../../uniprotkb/types/modelTypes';
import { ConfidenceScore } from '../../../uniprotkb/components/protein-data-views/UniProtKBFeaturesView';
import {
  Ligand,
  LigandPart,
} from '../../../uniprotkb/components/protein-data-views/LigandDescriptionView';
import TableFromData, { NightingaleViewRange } from '../table/TableFromData';

const VisualFeaturesView = lazy(
  () =>
    import(/* webpackChunkName: "visual-feature-view" */ './VisualFeaturesView')
);

export type Fragment = {
  start: number;
  end: number;
  shape?: string;
};

export type LocationModifier = 'EXACT' | 'OUTSIDE' | 'UNSURE' | 'UNKNOWN';

/*
export type Feature = {
  accession: string;
  color?: string;
  fill?: string;
  shape?: Shapes;
  tooltipContent?: string;
  type?: string;
  locations?: Array<FeatureLocation>;
  feature?: Feature;
  start?: number;
  end?: number;
  opacity?: number;

  export type VariationDatum = {
  accession: string;
  variant: string;
  start: number;
  size?: number;
  xrefNames: string[];
  hasPredictions: boolean;
  tooltipContent?: string;
  alternativeSequence?: string;
  internalId?: string;
  wildType?: string;
  color?: string;
  consequenceType: string;
};
};

*/
export type ProcessedFeature = Feature & {
  id?: string; // Used for the feature ID eg PRO_0000381966 while Feature.accession used as the UUID
  start: number;
  end: number;
  startModifier?: LocationModifier;
  endModifier?: LocationModifier;
  type: FeatureType;
  description?: ReactNode;
  evidences?: Evidence[];
  sequence?: string;
  source?: string;
  primaryAccession: string;
  // PTM specific
  confidenceScore?: ConfidenceScore;
  // Binding site
  ligand?: Ligand;
  ligandPart?: LigandPart;
  ligandDescription?: string;
};

export type FeatureColumnConfiguration = {
  id: string;
  label: ReactNode;
  filter?: (data: ProcessedFeature, input: string) => boolean;
  render: (data: ProcessedFeature) => ReactNode;
  optionAccessor?: (data: ProcessedFeature) => string | number; // Fallback if render fn doesn't return string or number
};

export type GenericFeature =
  | ProcessedFeature
  // | TransformedVariant // TODO: do we need this here?
  | UniParcProcessedFeature;

type FeatureViewProps = {
  sequence?: string;
  features: GenericFeature[];
  rowExtraContent: (datum: ProcessedFeature) => ReactNode;
  columns: FeatureColumnConfiguration[];
  trackHeight?: number;
  withTitle?: boolean;
  noLinkToFullView?: boolean;
};

const FeaturesView = ({
  sequence,
  features,
  rowExtraContent,
  columns,
  trackHeight,
  withTitle = true,
  noLinkToFullView,
}: FeatureViewProps) => {
  const isSmallScreen = useSmallScreen();
  const [highlightedFeature, setHighlightedFeature] = useState();
  const [nightingaleViewRange, setNightingaleViewRange] =
    useState<NightingaleViewRange>();

  const featureTypes = useMemo(
    () => Array.from(new Set<FeatureType>(features.map(({ type }) => type))),
    [features]
  );

  const handleFeatureClick = useCallback((feature) => {
    setHighlightedFeature(feature);
  }, []);

  const handleViewRangeChange = useCallback(
    (coordinates: NightingaleViewRange) => {
      setNightingaleViewRange(coordinates);
    },
    []
  );

  return features.length === 0 ? null : (
    <>
      {withTitle && (
        <>
          <h3>Features</h3>
          <p>
            Showing features for{' '}
            {featureTypes.map((featureType, i) => (
              <Fragment key={featureType}>
                {i > 0 && ', '}
                {featureType === 'Other' ? (
                  'other'
                ) : (
                  <span data-article-id={FeatureTypeHelpMappings[featureType]}>
                    {featureType.toLowerCase()}
                  </span>
                )}
              </Fragment>
            ))}
            .
          </p>
        </>
      )}
      {sequence && (
        <LazyComponent
          render={isSmallScreen ? false : undefined}
          fallback={null}
        >
          <VisualFeaturesView
            features={features}
            sequence={sequence}
            trackHeight={trackHeight}
            noLinkToFullView={noLinkToFullView}
            onFeatureClick={handleFeatureClick}
            onViewRangeChange={handleViewRangeChange}
            highlightedFeature={highlightedFeature}
          />
        </LazyComponent>
      )}
      <TableFromData
        data={features}
        columns={columns}
        rowExtraContent={rowExtraContent}
        onRowClick={handleFeatureClick}
        highlightedRow={highlightedFeature}
        nightingaleViewRange={nightingaleViewRange}
      />
    </>
  );
};

export default FeaturesView;
