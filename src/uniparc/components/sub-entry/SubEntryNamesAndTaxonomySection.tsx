import { Card, InfoList } from 'franklin-sites';
import { Fragment } from 'react/jsx-runtime';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';
import TaxonomyView, {
  TaxonomyId,
  TaxonomyLineage,
} from '../../../shared/components/entry/TaxonomyView';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { Namespace } from '../../../shared/types/namespaces';
import { TaxonomyAPIModel } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import SubEntrySection from '../../types/subEntrySection';
import { getSubEntryProteomes } from '../../utils/subEntry';

type SubEntryNamesAndTaxonomySectionProps = {
  data?: UniParcSubEntryUIModel;
};

const SubEntryNamesAndTaxonomySection = ({
  data,
}: SubEntryNamesAndTaxonomySectionProps) => {
  const { data: lineageData } = useDataApi<TaxonomyAPIModel>(
    data?.subEntry?.organism
      ? apiUrls.entry.entry(
          `${data.subEntry.organism.taxonId}`,
          Namespace.taxonomy
        )
      : null
  );

  if (!data?.subEntry?.proteinName) {
    return null;
  }

  const { proteinName, geneName, organism, properties } = data.subEntry;

  const proteomeComponentObject = getSubEntryProteomes(properties);

  const proteomeContent = Object.entries(proteomeComponentObject).map(
    ([proteomeId, component]) => (
      <Fragment key={proteomeId}>
        <Link to={getEntryPath(Namespace.proteomes, proteomeId)}>
          {proteomeId}
        </Link>{' '}
        ({component})
        <br />
      </Fragment>
    )
  );

  const proteinNameInfoData = [{ title: 'Name', content: proteinName }];

  const geneNameInfoData = [{ title: 'Name', content: geneName }];

  const organismInfoData = [
    {
      title: (
        <span data-article-id="taxonomic_identifier">Taxonomic identifier</span>
      ),
      content: <TaxonomyId taxonId={organism?.taxonId} />,
    },
    {
      title: 'Organism',
      content: (organism?.scientificName || organism?.taxonId) && (
        <TaxonomyView data={organism} />
      ),
    },
    {
      title: <span data-article-id="taxonomic_lineage">Taxonomic lineage</span>,
      content: <TaxonomyLineage lineage={lineageData?.lineage} />,
    },
  ];

  const proteomeInfoData = [
    {
      title: 'Proteomes',
      content: proteomeContent,
    },
  ];

  return (
    <Card
      header={<h2>{entrySectionToLabel[SubEntrySection.NamesAndTaxonomy]}</h2>}
      id={SubEntrySection.NamesAndTaxonomy}
      data-entry-section
    >
      <h3 data-article-id="protein_names">Protein Name</h3>
      <InfoList infoData={proteinNameInfoData} />

      {geneName && (
        <>
          <h3 data-article-id="gene_name">Gene Name</h3>
          <InfoList infoData={geneNameInfoData} />
        </>
      )}

      {organism && (
        <>
          <h3>Organism name</h3>
          <InfoList infoData={organismInfoData} />
        </>
      )}

      {proteomeContent.length > 0 && (
        <>
          <h3 data-article-id="proteomes_manual">Proteomes</h3>
          <InfoList infoData={proteomeInfoData} />
        </>
      )}
    </Card>
  );
};

export default SubEntryNamesAndTaxonomySection;
