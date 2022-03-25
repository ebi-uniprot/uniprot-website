import { Card } from 'franklin-sites';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../../types/entrySection';
import SimilarProteins from './SimilarProteins';

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
      <SimilarProteins
        isoforms={isoforms}
        primaryAccession={primaryAccession}
      />
    </Card>
  );
};

export default SimilarProteinsSection;
