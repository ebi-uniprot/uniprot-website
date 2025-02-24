import {
  Fragment,
  lazy,
  ReactNode,
  useCallback,
  useId,
  useMemo,
  useState,
} from 'react';
import { Feature } from '@nightingale-elements/nightingale-track';

import LazyComponent from '../LazyComponent';
import TableFromData from '../table/TableFromData';

import { useSmallScreen } from '../../hooks/useMatchMedia';
import useNightingaleFeatureTableScroll from '../../hooks/useNightingaleFeatureTableScroll';

import FeatureTypeHelpMappings from '../../../help/config/featureTypeHelpMappings';
import { MIN_ROWS_TO_EXPAND } from '../table/constants';

import FeatureType from '../../../uniprotkb/types/featureType';
import { Evidence } from '../../../uniprotkb/types/modelTypes';
import { ConfidenceScore } from '../../../uniprotkb/components/protein-data-views/UniProtKBFeaturesView';
import {
  Ligand,
  LigandPart,
} from '../../../uniprotkb/components/protein-data-views/LigandDescriptionView';
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

export type FeatureColumnConfiguration<T> = {
  id: string;
  label: ReactNode;
  filter?: (data: T, input: string) => boolean;
  render: (data: T) => ReactNode;
  getOption?: (data: T) => string | number; // Fallback if render fn doesn't return string or number
};

export type NavigationType = 'ZOOM-TO';

const computeRange = (
  navigationType: NavigationType,
  featureRange: [number, number],
  navigationRange: [number, number]
): [number, number] => {
  if (navigationType === 'ZOOM-TO') {
    return [
      Math.min(navigationRange[0], featureRange[0]),
      Math.max(navigationRange[1], featureRange[1]),
    ];
  }
  // if (navigationType === 'ZOOM-IN') {
  //   return [featureRange[0], featureRange[0] + AA_ZOOMED];
  // }
  // if (navigationType === 'ZOOM-OUT') {
  //   return [featureRange[0] - 1, featureRange[1] + 1];
  // }
  return navigationRange;
};

type FeatureViewProps<T extends ProcessedFeature> = {
  sequence?: string;
  features: T[];
  rowExtraContent?: (datum: T) => ReactNode;
  getRowId: (datum: T) => string;
  columns: FeatureColumnConfiguration<T>[];
  trackHeight?: number;
  withTitle?: boolean;
  noLinkToFullView?: boolean;
  markBackground?: (markedData: T) => ((data: T) => boolean) | undefined;
  markBorder?: (
    nightingaleViewRange: NightingaleViewRange
  ) => (datum: T) => boolean;
  inResultsTable?: boolean;
};

function FeaturesView<T extends ProcessedFeature>({
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
}: FeatureViewProps<T>) {
  const isSmallScreen = useSmallScreen();
  const [highlightedFeature, setHighlightedFeature] = useState<T | undefined>();
  const [nightingaleViewRange, setNightingaleViewRange] =
    useState<NightingaleViewRange>();
  const [range, setRange] = useState<[number, number] | null>(null);
  const tableId = useId();
  const tableScroll = useNightingaleFeatureTableScroll(getRowId, tableId);

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

  const handleFeatureClick = useCallback(
    (feature: T) => {
      setHighlightedFeature(feature);
      tableScroll(feature);
    },
    [tableScroll]
  );

  const handleNavigationClick = useCallback(
    (navigationType: NavigationType, feature: T) => {
      if (nightingaleViewRange) {
        const range = computeRange(
          navigationType,
          [+feature.start, +feature.end],
          [
            nightingaleViewRange['display-start'],
            nightingaleViewRange['display-end'],
          ]
        );
        setRange(range);
      }
    },
    [nightingaleViewRange]
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
            onFeatureClick={
              handleFeatureClick as (feature: ProcessedFeature) => void
            }
            onViewRangeChange={handleViewRangeChange}
            highlightedFeature={highlightedFeature}
            range={range}
          />
        </LazyComponent>
      )}
      <TableFromData
        id={tableId}
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
        expandable={!inResultsTable && features.length > MIN_ROWS_TO_EXPAND}
        onNavigationClick={!isSmallScreen && handleNavigationClick}
      />
    </>
  );
}

export default FeaturesView;
