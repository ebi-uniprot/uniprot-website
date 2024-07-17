import { InfoList, LongNumber } from 'franklin-sites';

import AccessionView from '../../../shared/components/results/AccessionView';
import ExternalLink from '../../../shared/components/ExternalLink';
import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';
import BuscoView from '../BuscoView';
import BuscoLegend from '../BuscoLegend';
import { PanProteome } from './PanProteome';

import ftpUrls from '../../../shared/config/ftpUrls';
import ProteomesColumnConfiguration, {
  ProteomesColumn,
} from '../../config/ProteomesColumnConfiguration';

import { Namespace } from '../../../shared/types/namespaces';
import { ProteomesUIModel } from '../../adapters/proteomesConverter';

const Overview = ({ data }: { data: ProteomesUIModel }) => {
  const renderColumnContent = (column: ProteomesColumn) => {
    const config = ProteomesColumnConfiguration.get(column);
    return config?.render(data) || null;
  };

  let { proteomeType } = data;
  if (proteomeType.toLowerCase().includes('representative')) {
    proteomeType = 'Reference proteome';
  }

  let genomeAssemblyContent;
  if (data.genomeAssembly?.assemblyId) {
    genomeAssemblyContent = (
      <>
        {data.genomeAssembly.assemblyId}
        {data.genomeAssembly.source
          ? ` from ${data.genomeAssembly.source}`
          : ''}
      </>
    );
  }
  const infoData = [
    {
      title: <span data-article-id="proteome_id">Proteome ID</span>,
      content: data.id,
    },
    {
      title: 'Status',
      content: (
        <>
          <EntryTypeIcon entryType={data.proteomeType} />
          {proteomeType}
          {data.exclusionReasons?.length ? (
            <span data-article-id="proteome_exclusion_reasons">
              {' '}
              ({data.exclusionReasons.join(', ')})
            </span>
          ) : null}
          {data.proteomeType === 'Redundant proteome' && data.redundantTo ? (
            <div>
              This proteome is{' '}
              <span data-article-id="proteome_redundancy">redundant</span>{' '}
              to&nbsp;
              <AccessionView
                id={data.redundantTo}
                namespace={Namespace.proteomes}
              />
              .
            </div>
          ) : null}
        </>
      ),
    },
    {
      title: (
        <span data-article-id="proteome_terminology#protein-count">
          Number of entries
        </span>
      ),
      content: renderColumnContent(ProteomesColumn.proteinCount),
    },
    {
      title: (
        <span data-article-id="proteome_terminology#gene-count">
          Gene count
        </span>
      ),
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
      title: `Taxonomy${data.strain ? ' | Strain' : ''}`,
      content: (data.taxonomy.taxonId || data.taxonomy.scientificName) && (
        <>
          <TaxonomyView data={data.taxonomy} />
          {data.strain && ` | ${data.strain}`}
        </>
      ),
    },
    {
      title: (
        <span data-article-id="proteome_terminology#genome-assembly">
          Genome assembly and annotation
        </span>
      ),
      content: data.genomeAssembly?.assemblyId && (
        <ExternalLink url={data.genomeAssembly.genomeAssemblyUrl || null}>
          {genomeAssemblyContent}
        </ExternalLink>
      ),
    },
    {
      title: 'Genome representation',
      content: renderColumnContent(ProteomesColumn.genomeRepresentation),
    },
    {
      title: <span data-article-id="pan_proteomes">Pan proteome</span>,
      content: data.panproteome && <PanProteome proteome={data} />,
    },
    {
      title: (
        <span data-article-id="assessing_proteomes#complete-proteome-detector-cpd">
          Completeness (CPD)
        </span>
      ),
      content: renderColumnContent(ProteomesColumn.cpd),
    },
    {
      title: (
        <span data-article-id="assessing_proteomes#benchmarking-universal-single-copy-orthologs-busco">
          BUSCO
        </span>
      ),
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

  return <InfoList columns infoData={infoData} />;
};

export default Overview;
