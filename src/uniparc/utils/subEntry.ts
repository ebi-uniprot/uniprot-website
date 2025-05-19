import { generatePath } from 'react-router-dom';

import { Location, LocationToPath } from '../../app/config/urls';

export const getSubEntryPath = (
  accession: string,
  subEntryId: string,
  subPage?: string
) =>
  generatePath(LocationToPath[Location.UniParcSubEntry], {
    accession,
    subEntryId,
    subPage,
  });

const reSourceDatabase = /^(refseq|ensembl|embl)/i;

export const isSourceDatabase = (database?: string) =>
  Boolean(database && reSourceDatabase.test(database));
