import { logger } from '@sentry/react';
import { type Method } from 'axios';

import ftpUrls from '../../../shared/config/ftpUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { type ProteomesUIModel } from '../../adapters/proteomesConverter';

const headOptions: { method: Method } = { method: 'HEAD' };

export const PanProteome = ({ proteome }: { proteome: ProteomesUIModel }) => {
  const panProteomeSpecies = proteome.panproteomeTaxon
    ? proteome.taxonLineage?.find(
        (taxon) => taxon.taxonId === proteome.panproteomeTaxon?.taxonId
      )
    : undefined;

  const fastaUrl = panProteomeSpecies
    ? ftpUrls.panProteomes(panProteomeSpecies.taxonId)
    : undefined;

  const { status, error } = useDataApi(fastaUrl, headOptions);

  if (!proteome.panproteomeTaxon) {
    return null;
  }

  if (!panProteomeSpecies) {
    logger.error(
      `Pan proteome taxon ID ${proteome.panproteomeTaxon.taxonId} not found in taxon lineage for proteome ${proteome.id}`
    );
    return null;
  }

  const fastaAvailable = !error && status === 200;

  return (
    <>
      {'This proteome is part of the '}
      {panProteomeSpecies.scientificName}
      {' pan proteome'}
      {fastaAvailable && (
        <>
          {' ('}
          <a href={fastaUrl}>FASTA</a>)
        </>
      )}
    </>
  );
};
