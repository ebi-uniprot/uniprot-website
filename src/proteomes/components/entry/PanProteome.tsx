import ftpUrls from '../../../shared/config/ftpUrls';
import { type ProteomesUIModel } from '../../adapters/proteomesConverter';

export const PanProteome = ({
  panproteomeTaxon,
  taxonLineage,
  taxonomy,
}: Required<
  Pick<ProteomesUIModel, 'panproteomeTaxon' | 'taxonLineage' | 'taxonomy'>
>) => {
  const species =
    taxonLineage.find(
      (taxon) =>
        taxon.rank === 'species' && taxon.taxonId === panproteomeTaxon.taxonId
    ) ?? taxonomy;

  const fastaUrl =
    species.taxonId && ftpUrls.panProteomesFasta(species.taxonId);
  const { scientificName } = species;

  return (
    scientificName &&
    fastaUrl && (
      <>
        {'This proteome is part of the '}
        {scientificName}
        {' pan proteome ('}
        <a href={fastaUrl}>FASTA</a>
        {')'}
      </>
    )
  );
};
