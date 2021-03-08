import { FC, ReactNode } from 'react';
import { Card, InfoList } from 'franklin-sites';
import { ProteomesUIModel } from '../../adapters/proteomesConverter';
import { EntryTypeIcon } from '../../../shared/components/entry/EntryTypeIcon';
import BuscoView from '../BuscoView';
import BuscoLegend from '../BuscoLegend';
import BuscoAbbr from '../BuscoAbbr';
import CpdAbbr from '../CpdAbbr';
import GenomeAssemblyView from '../GenomeAssemblyView';
import '../styles/overview.scss';

type InfoData = {
  title: string;
  content: ReactNode;
}[];
export const Overview: FC<{
  data: ProteomesUIModel;
}> = ({ data }) => (
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
          {
            title: 'Proteins',
            content: data.proteinCount || 'no data yet', // TODO: not available from API but coming soon
          },
          {
            title: 'Gene Count',
            content: data.geneCount.toString(),
          },
          {
            title: 'Proteome ID',
            content: data.id,
          },
          (data.taxonomy.taxonId || data.taxonomy.scientificName) && {
            title: 'Taxonomy',
            content: [data.taxonomy.taxonId, data.taxonomy.scientificName]
              .filter(Boolean)
              .join(' - '),
          },
          {
            title: 'Last modified',
            content: <time>{data.modified}</time>,
          },
          data.genomeAssembly?.assemblyId && {
            title: 'Genome assembly and annotation',
            content: <GenomeAssemblyView {...data.genomeAssembly} />,
          },
          data.genomeAssembly?.level && {
            title: 'Genome represenation',
            content: data.genomeAssembly.level,
          },
          {
            key: 'cpd',
            title: <CpdAbbr />,
            content: data.proteomeCompletenessReport.cpdReport.status,
          },
          data.proteomeCompletenessReport?.buscoReport && {
            key: 'busco',
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
export default Overview;
