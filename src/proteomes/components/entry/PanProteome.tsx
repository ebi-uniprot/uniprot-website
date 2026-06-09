import { ExternalLink } from 'franklin-sites';

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

  const folderUrl =
    species.taxonId && ftpUrls.panProteomesPreviewFolder(species.taxonId);
  const fastaUrl =
    species.taxonId && ftpUrls.panProteomesFasta(species.taxonId);
  const { scientificName } = species;

  return (
    scientificName &&
    folderUrl &&
    fastaUrl && (
      <>
        {'This proteome is part of the '}
        {/* Folder link → opens the FTP directory in a new tab for browsing. */}
        <ExternalLink url={folderUrl}>
          {scientificName} pan proteome
        </ExternalLink>
      </>
    )
  );
};
