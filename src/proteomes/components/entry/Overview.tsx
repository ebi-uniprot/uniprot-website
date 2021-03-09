import { FC, ReactNode } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { Card, InfoList } from 'franklin-sites';

import { EntryTypeIcon } from '../../../shared/components/entry/EntryTypeIcon';
import BuscoView from '../BuscoView';
import BuscoLegend from '../BuscoLegend';
import BuscoAbbr from '../BuscoAbbr';
import GenomeAssemblyAndAnnotationView from '../GenomeAssemblyAndAnnotationView';

import ftpUrls from '../../../shared/config/ftpUrls';
import { LocationToPath, Location } from '../../../app/config/urls';
import ProteomesColumnConfiguration, {
  ProteomesColumn,
} from '../../config/ProteomesColumnConfiguration';

import { ProteomesUIModel } from '../../adapters/proteomesConverter';

import '../styles/overview.scss';

type InfoData = {
  title: string;
  content: ReactNode;
}[];
export const Overview: FC<{
  data: ProteomesUIModel;
}> = ({ data }) => {
  const renderColumnAsInfoListItem = (column: ProteomesColumn) => {
    const config = ProteomesColumnConfiguration.get(column);
    return { title: config?.label, content: config?.render(data), key: column };
  };

  return (
    <Card title="Overview">
      <InfoList
        columns
        isCompact
        infoData={
          [
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
                  {`${data.geneCount}`}
                  {
                    // data?.geneCount > 0 && // TODO: API always returns zero (Leo investigating) so removing the condition until this fixed to at least show the link for UX purposes
                    data.superkingdom && data.taxonomy.taxonId && (
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
                    )
                  }
                </>
              ),
            },
            {
              title: 'Proteome ID',
              content: data.id,
            },
            (data.taxonomy.taxonId || data.taxonomy.scientificName) && {
              title: 'Taxonomy',
              content: (
                <Link
                  to={{
                    pathname: generatePath(
                      LocationToPath[Location.TaxonomyEntry],
                      {
                        accession: data.taxonomy.taxonId.toString(),
                      }
                    ),
                  }}
                >
                  {[data.taxonomy.taxonId, data.taxonomy.scientificName]
                    .filter(Boolean)
                    .join(' · ')}
                </Link>
              ),
            },
            {
              title: 'Last modified',
              content: <time>{data.modified}</time>,
            },
            data.genomeAssembly?.assemblyId && {
              title: 'Genome assembly and annotation',
              content: (
                <GenomeAssemblyAndAnnotationView {...data.genomeAssembly} />
              ),
            },
            data.genomeAssembly?.level &&
              renderColumnAsInfoListItem(ProteomesColumn.genomeRepresentation),
            renderColumnAsInfoListItem(ProteomesColumn.cpd),
            data.proteomeCompletenessReport?.buscoReport && {
              title: <BuscoAbbr />,
              content: (
                <div className="busco">
                  <div className="busco__legend">
                    <BuscoLegend />
                  </div>
                  <BuscoView
                    report={data.proteomeCompletenessReport?.buscoReport}
                  />
                </div>
              ),
            },
          ].filter(Boolean) as InfoData
        }
      />
    </Card>
  );
};
export default Overview;
