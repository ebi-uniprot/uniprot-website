import { Card, InfoList } from 'franklin-sites';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import TaxonomyView, {
  TaxonomyId,
  TaxonomyLineage,
} from '../../../shared/components/entry/TaxonomyView';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { Namespace } from '../../../shared/types/namespaces';
import { stringifyQuery } from '../../../shared/utils/url';
import { TaxonomyAPIModel } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import UniProtKBEvidenceTag from '../../../uniprotkb/components/protein-data-views/UniProtKBEvidenceTag';
import {
  ModifiedPrediction,
  UniParcSubEntryUIModel,
} from '../../adapters/uniParcSubEntryConverter';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import SubEntrySection from '../../types/subEntrySection';
import { getSubEntryProteomes } from '../../utils/subEntry';

const NameContent = ({
  predictions,
  queryParam,
}: {
  predictions: ModifiedPrediction[] | string;
  queryParam: string;
}) => {
  const renderedPredictions: Partial<ModifiedPrediction>[] =
    typeof predictions === 'string'
      ? [{ annotationValue: predictions }]
      : predictions;

  return renderedPredictions.map((prediction, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={index}>
      {prediction.annotationValue}
      {' ('}
      <Link
        to={{
          pathname: LocationToPath[Location.UniProtKBResults],
          search: stringifyQuery({
            query: `(${queryParam}:"${prediction.annotationValue}")`,
          }),
        }}
      >
        Search in UniProtKB
      </Link>
      )
      {prediction.evidence && (
        <UniProtKBEvidenceTag evidences={prediction.evidence} />
      )}
    </div>
  ));
};

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
  const { predictions } = data.unifire || { predictions: [] };

  // TODO: Handle type 'protein.flag'
  const recommendedFullNamePrediction =
    (predictions as ModifiedPrediction[])?.filter(
      (prediction) =>
        prediction.annotationType === 'protein.recommendedName.fullName'
    ) || [];

  const recommendedShortNamePrediction =
    (predictions as ModifiedPrediction[])?.filter(
      (prediction) =>
        prediction.annotationType === 'protein.recommendedName.shortName'
    ) || [];

  const recommendedECPrediction =
    (predictions as ModifiedPrediction[])?.filter(
      (prediction) =>
        prediction.annotationType === 'protein.recommendedName.ecNumber'
    ) || [];

  const alternativeNamePrediction = [
    'protein.alternativeName.fullName',
    'protein.alternativeName.shortName',
  ]
    .map(
      (type) =>
        (predictions as ModifiedPrediction[])?.filter(
          (prediction) => prediction.annotationType === type
        ) || []
    )
    .flat();

  const alternativeECPrediction =
    (predictions as ModifiedPrediction[])?.filter(
      (prediction) =>
        prediction.annotationType === 'protein.alternativeName.ecNumber'
    ) || [];

  const geneNamePrediction =
    (predictions as ModifiedPrediction[])?.filter(
      (prediction) => prediction.annotationType === 'gene.name.primary'
    ) || [];

  const geneNameSynonymsPrediction =
    (predictions as ModifiedPrediction[])?.filter(
      (prediction) => prediction.annotationType === 'gene.name.synonym'
    ) || [];

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

  const proteinNameInfoData = [
    {
      title: 'Name',
      content: proteinName.length ? (
        <NameContent predictions={proteinName} queryParam="protein_name" />
      ) : null,
    },
    {
      title: 'Recommended name',
      content: recommendedFullNamePrediction.length ? (
        <NameContent
          predictions={recommendedFullNamePrediction}
          queryParam="protein_name"
        />
      ) : null,
    },
    {
      title: 'Short names',
      content: recommendedShortNamePrediction.length ? (
        <NameContent
          predictions={recommendedShortNamePrediction}
          queryParam="protein_name"
        />
      ) : null,
    },
    {
      title: 'EC number',
      content: recommendedECPrediction.length ? (
        <NameContent predictions={recommendedECPrediction} queryParam="ec" />
      ) : null,
    },
    {
      title: 'Alternative names',
      content: alternativeNamePrediction.length ? (
        <NameContent
          predictions={alternativeNamePrediction}
          queryParam="protein_name"
        />
      ) : null,
    },
    {
      title: 'Alternative EC number',
      content: alternativeECPrediction.length ? (
        <NameContent predictions={alternativeECPrediction} queryParam="ec" />
      ) : null,
    },
  ];

  const geneNameInfoData = [
    {
      title: 'Name',
      content:
        geneName || geneNamePrediction.length ? (
          <>
            {geneName && (
              <NameContent predictions={geneName} queryParam="gene" />
            )}
            <NameContent predictions={geneNamePrediction} queryParam="gene" />
          </>
        ) : null,
    },
    {
      title: 'Synonyms',
      content: geneNameSynonymsPrediction.length ? (
        <NameContent
          predictions={geneNameSynonymsPrediction}
          queryParam="gene"
        />
      ) : null,
    },
  ];

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
