import { Card } from 'franklin-sites';

import SimilarProteins from './SimilarProteins';
import LazyComponent from '../../../../shared/components/LazyComponent';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../../types/entrySection';

type Props = {
  isoforms: { isoforms: string[] };
  primaryAccession: string;
};
const SimilarProteinsSection = ({ isoforms, primaryAccession }: Props) => {
  const { name, id } = getEntrySectionNameAndId(EntrySection.SimilarProteins);
  return (
    <Card
      header={<h2 data-article-id="similar_proteins_section">{name}</h2>}
      id={id}
      data-entry-section
    >
      <LazyComponent>
        <SimilarProteins
          isoforms={isoforms}
          primaryAccession={primaryAccession}
        />
      </LazyComponent>
    </Card>
  );
};

export default SimilarProteinsSection;
