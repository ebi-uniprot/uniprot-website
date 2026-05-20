import { logger } from '@sentry/react';

import ftpUrls from '../../../shared/config/ftpUrls';
import { type ProteomesUIModel } from '../../adapters/proteomesConverter';

export const PanProteome = ({ proteome }: { proteome: ProteomesUIModel }) => {
  if (!proteome.panproteomeTaxon) {
    return null;
  }

  const panProteomeSpecies = proteome.taxonLineage?.find(
    (taxon) => taxon.taxonId === proteome.panproteomeTaxon?.taxonId
  );

  if (panProteomeSpecies) {
    return (
      <>
        {'This proteome is part of the '}
        {panProteomeSpecies.scientificName}
        {' pan proteome ('}
        <a href={ftpUrls.panProteomes(panProteomeSpecies.taxonId)}>FASTA</a>)
      </>
    );
  } else {
    logger.error(
      `Pan proteome taxon ID ${proteome.panproteomeTaxon.taxonId} not found in taxon lineage for proteome ${proteome.id}`
    );
    return null;
  }
};
