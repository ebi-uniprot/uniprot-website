/* eslint-disable react/no-array-index-key */
import { Card, InfoList } from 'franklin-sites';
import { Fragment } from 'react/jsx-runtime';
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
  if (typeof predictions === 'string') {
    return (
      <div>
        {predictions}
        {' ('}
        <Link
          to={{
            pathname: LocationToPath[Location.UniProtKBResults],
            search: stringifyQuery({
              query: `(${queryParam}:"${predictions}")`,
            }),
          }}
        >
          Search in UniProtKB
        </Link>
        )
      </div>
    );
  }
  return predictions.length > 0
    ? predictions.map((prediction, index) => (
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
          <UniProtKBEvidenceTag evidences={prediction.evidence} />
        </div>
      ))
    : null;
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
      content: (
        <NameContent predictions={proteinName} queryParam="protein_name" />
      ),
    },
    {
      title: 'Recommended name',
      content: (
        <NameContent
          predictions={recommendedFullNamePrediction}
          queryParam="protein_name"
        />
      ),
    },
    {
      title: 'Short names',
      content: (
        <NameContent
          predictions={recommendedShortNamePrediction}
          queryParam="protein_name"
        />
      ),
    },
    {
      title: 'EC number',
      content:
        recommendedECPrediction.length > 0
          ? recommendedECPrediction.map((prediction, index) => (
              <div key={index}>{prediction.annotationValue}</div>
            ))
          : null,
    },
    {
      title: 'Alternative names',
      content: (
        <NameContent
          predictions={alternativeNamePrediction}
          queryParam="protein_name"
        />
      ),
    },
    {
      title: 'Alternative EC number',
      content:
        alternativeECPrediction.length > 0
          ? alternativeECPrediction.map((prediction, index) => (
              <div key={index}>{prediction.annotationValue}</div>
            ))
          : null,
    },
  ];

  const geneNameInfoData = [
    {
      title: 'Name',
      content: (
        <>
          {geneName && <NameContent predictions={geneName} queryParam="gene" />}
          <NameContent predictions={geneNamePrediction} queryParam="gene" />
        </>
      ),
    },
    {
      title: 'Synonyms',
      content: (
        <NameContent
          predictions={geneNameSynonymsPrediction}
          queryParam="gene"
        />
      ),
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
