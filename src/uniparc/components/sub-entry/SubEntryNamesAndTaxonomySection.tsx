import { Card, InfoList } from 'franklin-sites';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';
import TaxonomyView, {
  TaxonomyId,
  TaxonomyLineage,
} from '../../../shared/components/entry/TaxonomyView';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { Namespace } from '../../../shared/types/namespaces';
import { type TaxonomyAPIModel } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { type UniProtkbUIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import UniProtKBEvidenceTag from '../../../uniprotkb/components/protein-data-views/UniProtKBEvidenceTag';
import UniProtKBEntrySection from '../../../uniprotkb/types/entrySection';
import { type Evidence } from '../../../uniprotkb/types/modelTypes';
import { type UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import SubEntrySection from '../../types/subEntrySection';
import { getSubEntryProteomes } from '../../utils/subEntry';

const genericEvidences: Evidence[] = [
  {
    evidenceCode: 'ECO:0000313',
  },
];

type NameValue = { value: string; evidences?: Evidence[] };

const NameContent = ({
  predictions,
}: {
  predictions: NameValue[] | string;
}) => {
  const renderedNames: NameValue[] =
    typeof predictions === 'string'
      ? [{ value: predictions, evidences: genericEvidences }]
      : predictions;

  return renderedNames.map((name, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={index}>
      {name.value}
      {name.evidences && <UniProtKBEvidenceTag evidences={name.evidences} />}
    </div>
  ));
};

/**
 * Whether the Names & Taxonomy section has anything to show — imported
 * protein/gene/organism/proteome data from the UniParc cross-reference, or
 * predicted names from the converted `annotations` (source-agnostic, so it
 * covers both the UniFire and precomputed branches). Shared by the section's
 * own render guard and the in-page-nav gating in `SubEntry`, so the nav and the
 * rendered card never disagree.
 */
export const namesAndTaxonomySectionHasContent = (
  data?: UniParcSubEntryUIModel,
  annotations?: UniProtkbUIModel
): boolean => {
  const subEntry = data?.subEntry;
  if (!subEntry) {
    return false;
  }
  const { proteinName, geneName, organism, properties, proteomeId, component } =
    subEntry;
  const namesAndTaxonomy =
    annotations?.[UniProtKBEntrySection.NamesAndTaxonomy];
  const proteinNames = namesAndTaxonomy?.proteinNamesData;
  const geneNames = namesAndTaxonomy?.geneNamesData;
  const proteomes = getSubEntryProteomes(properties);
  return Boolean(
    proteinName?.length ||
    geneName ||
    organism ||
    proteinNames?.recommendedName ||
    proteinNames?.alternativeNames?.length ||
    geneNames?.length ||
    Object.keys(proteomes).length ||
    (proteomeId && component)
  );
};

type SubEntryNamesAndTaxonomySectionProps = {
  data?: UniParcSubEntryUIModel;
  annotations?: UniProtkbUIModel;
};

const SubEntryNamesAndTaxonomySection = ({
  data,
  annotations,
}: SubEntryNamesAndTaxonomySectionProps) => {
  const { data: lineageData } = useDataApi<TaxonomyAPIModel>(
    data?.subEntry?.organism
      ? apiUrls.entry.entry(
          `${data.subEntry.organism.taxonId}`,
          Namespace.taxonomy
        )
      : null
  );

  if (!data?.subEntry) {
    return null;
  }

  const { proteinName, geneName, organism, properties, proteomeId, component } =
    data.subEntry;
  // Predicted names come from the converted `annotations` — source-agnostic, so
  // they show for both the UniFire and precomputed branches.
  const namesAndTaxonomy =
    annotations?.[UniProtKBEntrySection.NamesAndTaxonomy];
  const proteinNames = namesAndTaxonomy?.proteinNamesData;
  const geneNames = namesAndTaxonomy?.geneNamesData;

  const recommendedFullNamePrediction = proteinNames?.recommendedName?.fullName
    ? [proteinNames.recommendedName.fullName]
    : [];
  const recommendedShortNamePrediction =
    proteinNames?.recommendedName?.shortNames ?? [];
  const recommendedECPrediction =
    proteinNames?.recommendedName?.ecNumbers ?? [];
  const alternativeNamePrediction = (
    proteinNames?.alternativeNames ?? []
  ).flatMap((alt) => [alt.fullName, ...(alt.shortNames ?? [])]);
  const alternativeECPrediction = (
    proteinNames?.alternativeNames ?? []
  ).flatMap((alt) => alt.ecNumbers ?? []);
  const geneNamePrediction = (geneNames ?? []).flatMap((gene) =>
    gene.geneName ? [gene.geneName] : []
  );
  const geneNameSynonymsPrediction = (geneNames ?? []).flatMap(
    (gene) => gene.synonyms ?? []
  );

  const proteomeComponentObject = getSubEntryProteomes(properties);

  if (proteomeId && component) {
    proteomeComponentObject[proteomeId] = component;
  }

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
      content: proteinName?.length ? (
        <NameContent predictions={proteinName} />
      ) : null,
    },
    {
      title: 'Recommended name',
      content: recommendedFullNamePrediction.length ? (
        <NameContent predictions={recommendedFullNamePrediction} />
      ) : null,
    },
    {
      title: 'Short names',
      content: recommendedShortNamePrediction.length ? (
        <NameContent predictions={recommendedShortNamePrediction} />
      ) : null,
    },
    {
      title: 'EC number',
      content: recommendedECPrediction.length ? (
        <NameContent predictions={recommendedECPrediction} />
      ) : null,
    },
    {
      title: 'Alternative names',
      content: alternativeNamePrediction.length ? (
        <NameContent predictions={alternativeNamePrediction} />
      ) : null,
    },
    {
      title: 'Alternative EC number',
      content: alternativeECPrediction.length ? (
        <NameContent predictions={alternativeECPrediction} />
      ) : null,
    },
  ];

  const geneNameInfoData = [
    {
      title: 'Name',
      content:
        geneName || geneNamePrediction.length ? (
          <>
            {geneName && <NameContent predictions={geneName} />}
            <NameContent predictions={geneNamePrediction} />
          </>
        ) : null,
    },
    {
      title: 'Synonyms',
      content: geneNameSynonymsPrediction.length ? (
        <NameContent predictions={geneNameSynonymsPrediction} />
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

  const hasProteinNameContent = proteinNameInfoData.some(
    (item) => item.content
  );
  const hasGeneNameContent = geneNameInfoData.some((item) => item.content);

  if (!namesAndTaxonomySectionHasContent(data, annotations)) {
    return null;
  }

  return (
    <Card
      header={<h2>{entrySectionToLabel[SubEntrySection.NamesAndTaxonomy]}</h2>}
      id={SubEntrySection.NamesAndTaxonomy}
      data-entry-section
    >
      {hasProteinNameContent && (
        <>
          <h3 data-article-id="protein_names">Protein Name</h3>
          <InfoList infoData={proteinNameInfoData} />
        </>
      )}
      {(geneName || hasGeneNameContent) && (
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
