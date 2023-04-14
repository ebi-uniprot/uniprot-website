import { sortBy } from 'lodash-es';
import { FC, useMemo } from 'react';

import ExternalLink from '../../../shared/components/ExternalLink';
import FeaturesView, {
  ProcessedFeature,
} from '../../../shared/components/views/FeaturesView';

import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import externalUrls from '../../../shared/config/externalUrls';
import { stringToColour } from '../../../shared/utils/color';
import { processUrlTemplate } from '../../../uniprotkb/components/protein-data-views/XRefView';

import { SequenceFeature } from '../../adapters/uniParcConverter';

export type UniParcProcessedFeature = ProcessedFeature & {
  database: string;
  databaseId: string;
  interproGroupName?: string;
  interproGroupId?: string;
};

// Convert data
const convertData = (data: SequenceFeature[]): UniParcProcessedFeature[] =>
  sortBy(
    data.flatMap((feature) =>
      feature.locations.map((locationFeature) => ({
        type: 'Other',
        protvistaFeatureId: feature.databaseId,
        start: locationFeature.start,
        end: locationFeature.end,
        database: feature.database,
        databaseId: feature.databaseId,
        interproGroupName: feature.interproGroup?.name,
        interproGroupId: feature.interproGroup?.id,
        color: stringToColour(feature.database, 240), // use the name to define colour
      }))
    ),
    'interproGroupName'
  );

const UniParcFeaturesView: FC<{
  data: SequenceFeature[];
  sequence: string;
}> = ({ data, sequence }) => {
  const processedData = useMemo(() => convertData(data), [data]);
  const databaseInfoMaps = useDatabaseInfoMaps();
  if (!databaseInfoMaps) {
    return null;
  }
  // Define table contents
  const table = (
    <table>
      <thead>
        <tr>
          <th>InterPro Group</th>
          <th>Position(s)</th>
          <th>Database identifier</th>
          <th>Database</th>
        </tr>
      </thead>
      <tbody>
        {processedData.map((feature) => {
          const { database, databaseId } = feature;
          const databaseInfo =
            databaseInfoMaps.databaseToDatabaseInfo[database];
          let position = `${feature.start}`;
          if (feature.start !== feature.end) {
            position += `-${feature.end}`;
          }

          return (
            <tr
              key={feature.protvistaFeatureId}
              data-start={feature.start}
              data-end={feature.end}
            >
              <td>
                {feature.interproGroupId ? (
                  <ExternalLink
                    url={externalUrls.InterProEntry(feature.interproGroupId)}
                  >
                    {feature.interproGroupName}
                  </ExternalLink>
                ) : (
                  'N/A'
                )}
              </td>
              <td>{position}</td>
              <td>
                {databaseInfo?.uriLink && databaseId && (
                  <ExternalLink
                    url={processUrlTemplate(databaseInfo.uriLink, {
                      id: databaseId,
                    })}
                  >
                    {databaseId}
                  </ExternalLink>
                )}
              </td>
              <td>{feature.database}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <FeaturesView
      features={processedData}
      table={table}
      sequence={sequence}
      noLinkToFullView
    />
  );
};
export default UniParcFeaturesView;
