import { Card, Chip, DataTable } from 'franklin-sites';
import { type ReactNode, useMemo } from 'react';

import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import AccessionView from '../../../shared/components/results/AccessionView';
import { Namespace } from '../../../shared/types/namespaces';
import {
  type EnrichedRelatedProteome,
  type ProteomeType,
} from '../../adapters/proteomesConverter';
import styles from '../styles/similar-proteomes.module.scss';

const HELP_ARTICLE_ID = 'proteome_similarity';

const getIdKey = ({ proteomeId }: EnrichedRelatedProteome) => proteomeId;

const columns: Array<{
  label: ReactNode;
  name: string;
  render: (rp: EnrichedRelatedProteome) => ReactNode;
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
    label: 'Proteome similarity',
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
    No similar proteomes are available because this proteome has been{' '}
    <span data-article-id="proteome_exclusion_reasons">excluded</span>
    {exclusionReasons?.length ? <> ({exclusionReasons.join(', ')})</> : null}.
  </p>
);

const ReferencePlaceholder = () => (
  <p data-article-id={HELP_ARTICLE_ID}>
    No similar proteome is available for this proteome. This is typically
    because the proteome is the only one for its species, or because no other
    reference proteome is similar enough to be listed here.
  </p>
);

const GenericPlaceholder = () => (
  // The detailed list of reasons lives in the help article; the contextual-help
  // icon (added by `data-article-id`) links to that section.
  <p
    data-article-id={`${HELP_ARTICLE_ID}#what-proteomes-have-a-similarity-score`}
  >
    No similar proteome is available for this proteome.
  </p>
);

type Props = {
  relatedProteomes?: EnrichedRelatedProteome[];
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
  } else if (proteomeType === 'Reference proteome') {
    body = <ReferencePlaceholder />;
  } else {
    body = <GenericPlaceholder />;
  }

  return (
    <Card
      header={
        <h2>
          <span data-article-id={HELP_ARTICLE_ID}>
            Similarity to reference proteomes
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
