import { useMemo } from 'react';

import ExternalLink from '../../../shared/components/ExternalLink';
import FeaturesView, {
  ProcessedFeature,
} from '../../../shared/components/views/FeaturesView';

import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import externalUrls from '../../../shared/config/externalUrls';
import { stringToColour } from '../../../shared/utils/color';
import { processUrlTemplate } from '../../../shared/utils/xrefs';
import { sortByLocation } from '../../../uniprotkb/utils';

import { SequenceFeature } from '../../adapters/uniParcConverter';

export type UniParcProcessedFeature = ProcessedFeature & {
  database: string;
  databaseId: string;
  interproGroupName?: string;
  interproGroupId?: string;
};

// Convert data
export const convertData = (
  data: SequenceFeature[]
): UniParcProcessedFeature[] =>
  data
    .flatMap((feature) =>
      feature.locations.map((locationFeature) => ({
        type: 'Other' as const,
        protvistaFeatureId: feature.databaseId,
        start: locationFeature.start,
        end: locationFeature.end,
        database: feature.database,
        databaseId: feature.databaseId,
        interproGroupName: feature.interproGroup?.name,
        interproGroupId: feature.interproGroup?.id,
        color: stringToColour(feature.database, 240), // use the name to define colour
      }))
    )
    .sort(sortByLocation);

type UniParcFeaturesViewProps = {
  data: SequenceFeature[];
  sequence: string;
};

const UniParcFeaturesView = ({ data, sequence }: UniParcFeaturesViewProps) => {
  const processedData = useMemo(() => convertData(data), [data]);
  const databaseInfoMaps = useDatabaseInfoMaps();

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
      <tbody translate="no">
        {processedData.map((feature) => {
          const { database, databaseId } = feature;
          const databaseInfo =
            databaseInfoMaps?.databaseToDatabaseInfo[database];
          let position = `${feature.start}`;
          if (feature.start !== feature.end) {
            position += `-${feature.end}`;
          }

          // Additional prefix 'G3DSA:' in UniParc will be removed in https://www.ebi.ac.uk/panda/jira/browse/TRM-32164.
          // Adjust the below logic accordingly
          let revisedDatabaseId;
          let funFamURL = '';
          if (database === 'FUNFAM') {
            const funfamIDRegEx = /G3DSA:(\d+\.\d+\.\d+\.\d+:FF:\d+)/;
            const match = databaseId.match(funfamIDRegEx);

            if (match) {
              const [, id] = match;
              // Set only the ID like Gene3D once configure endpoint returns the correct URL for FunFam - http://www.cathdb.info/version/latest/funfam/%id
              funFamURL = `http://www.cathdb.info/version/latest/funfam/${id}`;
            }
          }
          if (database === 'Gene3D') {
            const gene3dRegEx = /G3DSA:(\d+\.\d+\.\d+\.\d+)/;
            const match = databaseId.match(gene3dRegEx);
            revisedDatabaseId = match?.[1];
          }

          return (
            <tr
              key={`${feature.protvistaFeatureId}-${feature.start}-${feature.end}`}
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
                      id: revisedDatabaseId || databaseId,
                    })}
                  >
                    {databaseId}
                  </ExternalLink>
                )}
                {/* Need to be removed when FUNFAM is added in 2024_06 */}
                {database === 'FUNFAM' && funFamURL && (
                  <ExternalLink url={funFamURL}>{databaseId}</ExternalLink>
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
