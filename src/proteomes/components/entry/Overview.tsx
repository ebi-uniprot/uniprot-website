import { FC, useMemo } from 'react';
import { Card, InfoList, ExternalLink } from 'franklin-sites';

import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import { EntryTypeIcon } from '../../../shared/components/entry/EntryTypeIcon';
import BuscoView from '../BuscoView';
import BuscoLegend from '../BuscoLegend';
import BuscoAbbr from '../BuscoAbbr';

import parseDate from '../../../shared/utils/parseDate';
import ftpUrls from '../../../shared/config/ftpUrls';
import ProteomesColumnConfiguration, {
  ProteomesColumn,
} from '../../config/ProteomesColumnConfiguration';

import { ProteomesUIModel } from '../../adapters/proteomesConverter';

import '../styles/overview.scss';

export const Overview: FC<{
  data: ProteomesUIModel;
}> = ({ data }) => {
  const infoData = useMemo(() => {
    const renderColumnAsInfoListItem = (column: ProteomesColumn) => {
      const config = ProteomesColumnConfiguration.get(column);
      return {
        title: config?.label,
        content: config?.render(data),
        key: column,
      };
    };

    return [
      {
        title: 'Status',
        content: (
          <>
            <EntryTypeIcon entryType={data.proteomeType} />
            {data.proteomeType}
          </>
        ),
      },
      renderColumnAsInfoListItem(ProteomesColumn.proteinCount),
      {
        title: 'Gene Count',
        content: (
          <>
            {data.geneCount}
            {data.geneCount && data.superkingdom && data.taxonomy.taxonId ? (
              <>
                {' '}
                <a
                  href={ftpUrls.referenceProteomes(
                    data.id,
                    data.superkingdom,
                    data.taxonomy.taxonId
                  )}
                >
                  Download one protein sequence per gene (FASTA)
                </a>
              </>
            ) : null}
          </>
        ),
      },
      {
        title: 'Proteome ID',
        content: data.id,
      },
      {
        title: 'Taxonomy',
        content: (data.taxonomy.taxonId || data.taxonomy.scientificName) && (
          <TaxonomyView data={data.taxonomy} />
        ),
      },
      {
        title: 'Last modified',
        content: (
          <time dateTime={parseDate(data.modified)?.toISOString()}>
            {data.modified}
          </time>
        ),
      },
      {
        title: 'Genome assembly and annotation',
        content: data.genomeAssembly?.assemblyId &&
          data.genomeAssembly.genomeAssemblyUrl && (
            <ExternalLink url={data.genomeAssembly.genomeAssemblyUrl}>{`${
              data.genomeAssembly.assemblyId
            }${
              data.genomeAssembly.source
                ? ` from ${data.genomeAssembly.source}`
                : ''
            }`}</ExternalLink>
          ),
      },
      renderColumnAsInfoListItem(ProteomesColumn.genomeRepresentation),
      renderColumnAsInfoListItem(ProteomesColumn.cpd),
      {
        title: <BuscoAbbr />,
        content: data.proteomeCompletenessReport?.buscoReport && (
          <div className="busco">
            <div className="busco__legend">
              <BuscoLegend />
            </div>
            <BuscoView report={data.proteomeCompletenessReport?.buscoReport} />
          </div>
        ),
      },
    ];
  }, [data]);

  return (
    <Card header={<h2>Overview</h2>}>
      <InfoList columns isCompact infoData={infoData} />
      {data.description && (
        <div className="description">
          <hr />
          <p>{data.description}</p>
        </div>
      )}
    </Card>
  );
};
export default Overview;
