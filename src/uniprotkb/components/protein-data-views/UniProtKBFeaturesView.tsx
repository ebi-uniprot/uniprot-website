import { useMemo, FC, Fragment } from 'react';
import classNames from 'classnames';
import { v1 } from 'uuid';

import { Evidence } from '../../types/modelTypes';
import FeatureType from '../../types/featureType';
import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import { Xref } from '../../../shared/types/apiModel';
import FeaturesView, {
  LocationModifier,
  ProcessedFeature,
} from '../../../shared/components/views/FeaturesView';

type FeatureLocation = {
  value: number;
  modifier: LocationModifier;
};

export type FeatureData = {
  type: FeatureType;
  featureId?: string;
  description?: string; // Sometimes you do have an empty string though
  location: {
    start: FeatureLocation;
    end: FeatureLocation;
    sequence?: string;
  };
  alternativeSequence?: {
    originalSequence?: string;
    alternativeSequences?: string[];
  };
  evidences?: Evidence[];
  featureCrossReference?: Xref;
}[];

export type ProtvistaFeature = {
  type: string;
  description: string;
  evidences: Evidence[];
  start: number;
  end: number;
  startModifier: LocationModifier;
  endModifier: LocationModifier;
};

type FeatureProps = {
  sequence?: string;
  features: FeatureData;
  withTitle?: boolean;
  withEvidenceTags?: boolean;
  withDataTable?: boolean;
};

export const processFeaturesData = (
  data: FeatureData,
  sequence?: string
): ProcessedFeature[] =>
  data.map(
    (feature): ProcessedFeature => ({
      protvistaFeatureId: feature.featureId || v1(),
      featureId: feature.featureId,
      start: feature.location.start.value,
      end: feature.location.end.value,
      startModifier: feature.location.start.modifier,
      endModifier: feature.location.end.modifier,
      type: feature.type,
      description: feature.description,
      evidences: feature.evidences,
      sequence: sequence?.substring(
        feature.location.start.value - 1,
        feature.location.end.value
      ),
    })
  );

const UniProtKBFeaturesView: FC<FeatureProps> = ({
  sequence,
  features,
  withTitle = true,
  withEvidenceTags = true,
  withDataTable = true,
}): JSX.Element | null => {
  const processedData = useMemo(
    () => processFeaturesData(features, sequence),
    [features, sequence]
  );

  const table = (
    <table className={classNames(!withDataTable && 'data-table--compact')}>
      <thead>
        <tr>
          <th data-filter="type">Type</th>
          <th>ID</th>
          <th>Positions</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {processedData.map((feature) => (
          <Fragment key={feature.protvistaFeatureId}>
            <tr
              data-id={feature.protvistaFeatureId}
              data-start={feature.start}
              data-end={feature.end}
            >
              <td data-filter="type" data-filter-value={feature.type}>
                {feature.type}
              </td>
              <td>{feature.featureId}</td>
              <td>{`${
                feature.startModifier === 'UNKNOWN' ? '?' : feature.start
              }-${feature.endModifier === 'UNKNOWN' ? '?' : feature.end}`}</td>
              <td>
                {feature.description}
                {withEvidenceTags && (
                  <UniProtKBEvidenceTag evidences={feature.evidences} />
                )}
              </td>
            </tr>
            {feature.sequence && (
              <tr
                data-group-for={feature.protvistaFeatureId}
                data-start={feature.start}
                data-end={feature.end}
              >
                <td>
                  <strong>Sequence: </strong>
                  {feature.sequence}
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );

  if (processedData.length === 0) {
    return null;
  }

  return withDataTable ? (
    <FeaturesView
      features={processedData}
      sequence={sequence}
      table={table}
      withTitle={withTitle}
    />
  ) : (
    table
  );
};

export default UniProtKBFeaturesView;
