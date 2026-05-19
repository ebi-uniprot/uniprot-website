import { Card, Chip, DataTable } from 'franklin-sites';
import { type ReactNode, useMemo } from 'react';

import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import AccessionView from '../../../shared/components/results/AccessionView';
import { Namespace } from '../../../shared/types/namespaces';
import {
  type ProteomeType,
  type ResolvedRelatedProteome,
} from '../../adapters/proteomesConverter';
import styles from '../styles/similar-proteomes.module.scss';

const HELP_ARTICLE_ID = 'proteome_similarity';

const getIdKey = ({ proteomeId }: ResolvedRelatedProteome) => proteomeId;

const columns: Array<{
  label: ReactNode;
  name: string;
  render: (rp: ResolvedRelatedProteome) => ReactNode;
}> = [
  {
    label: 'Proteome',
    name: 'proteome_id',
    render: ({ proteomeId, proteomeType }) => (
      <AccessionView
        id={proteomeId}
        namespace={Namespace.proteomes}
        entryType={proteomeType}
      />
    ),
  },
  {
    label: 'Organism',
    name: 'organism',
    render: ({ taxonomy, scientificName }) => (
      <TaxonomyView data={{ taxonId: taxonomy.taxonId, scientificName }} />
    ),
  },
  {
    label: 'Similarity score',
    name: 'similarity',
    render: ({ similarity }) => `${(similarity * 100).toFixed(1)}%`,
  },
];

const ExcludedPlaceholder = ({
  exclusionReasons,
}: {
  exclusionReasons?: string[];
}) => (
  <p>
    No similarity score is available because this proteome has been{' '}
    <span data-article-id="proteome_exclusion_reasons">excluded</span>
    {exclusionReasons?.length ? <> ({exclusionReasons.join(', ')})</> : null}.
  </p>
);

const ReferencePlaceholder = () => (
  <p data-article-id={HELP_ARTICLE_ID}>
    No similarity score is available for this proteome. This is typically
    because the proteome is the only one for its species, or because no other
    reference proteome is similar enough to be listed here.
  </p>
);

const GenericPlaceholder = () => (
  <>
    <p data-article-id={HELP_ARTICLE_ID}>
      No similarity score is available for this proteome. A proteome may not
      have a similarity score for one of the following reasons:
    </p>
    <ul>
      <li>
        The proteome has been{' '}
        <span data-article-id="proteome_exclusion_reasons">excluded</span>;
      </li>
      <li>
        Novel proteomes from surveillance projects are not currently considered
        for promotion to a reference proteome, and therefore the species might
        not have reference proteomes;
      </li>
      <li>
        Novel proteomes from metagenome assemblies are not currently considered
        for promotion to a reference proteome, and therefore the species might
        not have reference proteomes;
      </li>
      <li>
        Novel proteomes from organisms with the status &lsquo;Candidatus&rsquo;
        are not currently considered for promotion to a reference proteome;
      </li>
      <li>The proteome belongs to a taxonomically undefined species;</li>
      <li>
        The proteome is the only one for that species (N.B. being the only one
        automatically makes it a reference proteome).
      </li>
    </ul>
  </>
);

type Props = {
  relatedProteomes?: ResolvedRelatedProteome[];
  proteomeType: ProteomeType;
  exclusionReasons?: string[];
};

const SimilarProteomes = ({
  relatedProteomes,
  proteomeType,
  exclusionReasons,
}: Props) => {
  const sorted = useMemo(
    () => relatedProteomes?.slice().sort((a, b) => b.similarity - a.similarity),
    [relatedProteomes]
  );

  let body: ReactNode;
  if (sorted?.length) {
    body = (
      <div className={styles.table}>
        <DataTable
          getIdKey={getIdKey}
          density="compact"
          columns={columns}
          data={sorted}
        />
      </div>
    );
  } else if (proteomeType === 'Excluded') {
    body = <ExcludedPlaceholder exclusionReasons={exclusionReasons} />;
  } else if (
    proteomeType === 'Reference proteome' ||
    proteomeType === 'Reference and representative proteome' ||
    proteomeType === 'Representative proteome'
  ) {
    body = <ReferencePlaceholder />;
  } else {
    body = <GenericPlaceholder />;
  }

  return (
    <Card
      header={
        <h2>
          <span data-article-id={HELP_ARTICLE_ID}>
            Similar reference proteomes
          </span>{' '}
          <Chip compact>New</Chip>
        </h2>
      }
    >
      {body}
    </Card>
  );
};

export default SimilarProteomes;
