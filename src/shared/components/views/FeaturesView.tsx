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
import TableFromData from '../table/TableFromData';
import { NightingaleViewRange } from '../../utils/nightingale';

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
  primaryAccession?: string;
  // PTM specific
  confidenceScore?: ConfidenceScore;
  // Binding site
  ligand?: Ligand;
  ligandPart?: LigandPart;
  ligandDescription?: string;
};

export type GenericFeature =
  | ProcessedFeature
  // | TransformedVariant // TODO: do we need this here?
  | UniParcProcessedFeature;

export type FeatureColumnConfiguration = {
  id: string;
  label: ReactNode;
  filter?: (data: GenericFeature, input: string) => boolean;
  render: (data: GenericFeature) => ReactNode;
  getOption?: (data: GenericFeature) => string | number; // Fallback if render fn doesn't return string or number
};

type FeatureViewProps = {
  sequence?: string;
  features: GenericFeature[];
  rowExtraContent?: (datum: GenericFeature) => ReactNode;
  getRowId: (datum: GenericFeature) => string;
  columns: FeatureColumnConfiguration[];
  trackHeight?: number;
  withTitle?: boolean;
  noLinkToFullView?: boolean;
  markBackground?: (
    markedData: GenericFeature
  ) => ((data: GenericFeature) => boolean) | undefined;
  markBorder?: (
    nightingaleViewRange: NightingaleViewRange
  ) => (datum: ProcessedFeature) => boolean;
  inResultsTable?: boolean;
};

function FeaturesView({
  sequence,
  features,
  trackHeight,
  withTitle = true,
  noLinkToFullView,
  rowExtraContent,
  getRowId,
  markBackground,
  markBorder,
  columns,
  inResultsTable,
}: FeatureViewProps) {
  const isSmallScreen = useSmallScreen();
  const [highlightedFeature, setHighlightedFeature] = useState<
    GenericFeature | undefined
  >();
  const [nightingaleViewRange, setNightingaleViewRange] =
    useState<NightingaleViewRange>();

  const featureTypes = useMemo(
    () => Array.from(new Set<FeatureType>(features.map(({ type }) => type))),
    [features]
  );

  const handleViewRangeChange = useCallback(
    (coordinates: NightingaleViewRange) => {
      setNightingaleViewRange(coordinates);
    },
    []
  );

  return !features.length ? null : (
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
            onFeatureClick={setHighlightedFeature}
            onViewRangeChange={handleViewRangeChange}
            highlightedFeature={highlightedFeature}
          />
        </LazyComponent>
      )}
      <TableFromData
        data={features}
        columns={columns}
        rowExtraContent={rowExtraContent}
        getRowId={getRowId}
        markBackground={
          markBackground &&
          highlightedFeature &&
          markBackground(highlightedFeature)
        }
        markBorder={
          markBorder && nightingaleViewRange && markBorder(nightingaleViewRange)
        }
        onRowClick={setHighlightedFeature}
        expandable={!inResultsTable}
      />
    </>
  );
}

export default FeaturesView;
