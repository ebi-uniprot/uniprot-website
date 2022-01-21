import { useMemo } from 'react';
import { Card, InfoList, ExternalLink, LongNumber } from 'franklin-sites';

import HTMLHead from '../../../shared/components/HTMLHead';
import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import { EntryTypeIcon } from '../../../shared/components/entry/EntryTypeIcon';
import BuscoView from '../BuscoView';
import BuscoLegend from '../BuscoLegend';
import BuscoAbbr from '../BuscoAbbr';
import { PanProteome } from './PanProteome';

import ftpUrls from '../../../shared/config/ftpUrls';
import ProteomesColumnConfiguration, {
  ProteomesColumn,
} from '../../config/ProteomesColumnConfiguration';

import { ProteomesUIModel } from '../../adapters/proteomesConverter';

import '../styles/overview.scss';

export const Overview = ({ data }: { data: ProteomesUIModel }) => {
  const infoData = useMemo(() => {
    const renderColumnAsInfoListItem = (column: ProteomesColumn) => {
      const config = ProteomesColumnConfiguration.get(column);
      return {
        title: config?.label,
        content: config?.render(data) || null,
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
            {data.exclusionReasons?.length ? (
              <> ({data.exclusionReasons.join(', ')})</>
            ) : null}
          </>
        ),
      },
      renderColumnAsInfoListItem(ProteomesColumn.proteinCount),
      {
        title: 'Gene count',
        content: data.geneCount ? (
          <>
            <LongNumber>{data.geneCount}</LongNumber>
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
        ) : null,
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
      {
        title: 'Pan proteome',
        content: data.panproteome && <PanProteome proteome={data} />,
      },
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
          <HTMLHead>
            <meta name="description" content={data.description} />
          </HTMLHead>
          <hr />
          <p>{data.description}</p>
        </div>
      )}
    </Card>
  );
};
export default Overview;
