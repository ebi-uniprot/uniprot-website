import { useMemo } from 'react';
import { v1 } from 'uuid';

import ExternalLink from '../../../shared/components/ExternalLink';
import FeaturesView, {
  ProcessedFeature,
} from '../../../shared/components/views/FeaturesView';

import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import externalUrls from '../../../shared/config/externalUrls';
import { stringToColour } from '../../../shared/utils/color';
import { processUrlTemplate } from '../../../shared/utils/xrefs';
import { sortByLocation } from '../../../uniprotkb/utils';
import { markBorder, markBackground } from '../../../shared/utils/nightingale';

import { SequenceFeature } from '../../adapters/uniParcConverter';
import { TableFromDataColumn } from '../../../shared/components/table/TableFromData';

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
        accession: v1(), // Can't rely on feature.databaseId being unique
        type: 'Other' as const,
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

const getRowId = (data: UniParcProcessedFeature) => data.accession;

type UniParcFeaturesViewProps = {
  data: SequenceFeature[];
  sequence: string;
};

const UniParcFeaturesView = ({ data, sequence }: UniParcFeaturesViewProps) => {
  const processedData = useMemo(() => convertData(data), [data]);
  const databaseInfoMaps = useDatabaseInfoMaps();

  const columns: TableFromDataColumn<UniParcProcessedFeature>[] = useMemo(
    () => [
      {
        label: 'InterPro Group',
        id: 'interpro-group',
        render: (feature) =>
          feature.interproGroupId ? (
            <ExternalLink
              url={externalUrls.InterProEntry(feature.interproGroupId)}
            >
              {feature.interproGroupName}
            </ExternalLink>
          ) : (
            'N/A'
          ),
      },
      {
        label: 'Position(s)',
        id: 'position',
        render: (feature) => {
          let position = `${feature.start}`;
          if (feature.start !== feature.end) {
            position += `-${feature.end}`;
          }
          return position;
        },
      },
      {
        label: 'Database identifier',
        id: 'database-identifier',
        render: (feature) => {
          const { database, databaseId } = feature;
          const databaseInfo =
            databaseInfoMaps?.databaseToDatabaseInfo[database];
          // TODO: FUNFAM database info will be available in 2024_06.
          // URL has to be taken from the fetched data and dealt with 'superfamily' and 'family' expected in the URL.
          // Watch out when adding the cross reference in UniProtKB as the database ID is '3.30.160.60:FF:000118'
          // while for UniParc, there is an extra prefix 'G3DSA:3.40.50.300:FF:001498'
          let funFamURL = '';
          if (database === 'FUNFAM') {
            const funfamIDRegEx = /G3DSA:(\d+\.\d+\.\d+\.\d+):FF:(\d+)/;
            const match = databaseId.match(funfamIDRegEx);

            if (match) {
              const [, superFamily, family] = match;
              funFamURL = `https://www.cathdb.info/version/latest/superfamily/${superFamily}/funfam/${family}`;
            }
          }

          return (
            <>
              {databaseInfo?.uriLink && databaseId && (
                <ExternalLink
                  url={processUrlTemplate(databaseInfo.uriLink, {
                    id: databaseId,
                  })}
                >
                  {databaseId}
                </ExternalLink>
              )}
              {/* Need to be removed when FUNFAM is added in 2024_06 */}
              {database === 'FUNFAM' && funFamURL && (
                <ExternalLink url={funFamURL}>{databaseId}</ExternalLink>
              )}
            </>
          );
        },
      },
      {
        label: 'Database',
        id: 'database',
        render: (feature) => feature.database,
      },
    ],
    [databaseInfoMaps?.databaseToDatabaseInfo]
  );

  return (
    <FeaturesView
      features={processedData}
      columns={columns}
      getRowId={getRowId}
      sequence={sequence}
      noLinkToFullView
      markBorder={markBorder}
      markBackground={markBackground}
    />
  );
};
export default UniParcFeaturesView;
