import { generatePath } from 'react-router-dom';

import { Location, LocationToPath } from '../../app/config/urls';

export const getSubEntryPath = (
  accession: string,
  subEntryId: string,
  subPage: string
) =>
  generatePath(LocationToPath[Location.UniParcSubEntry], {
    accession,
    subEntryId,
    subPage,
  });

const reSourceDatabase = /^(refseq|ensembl|embl)/i;

export const isSourceDatabase = (database?: string) =>
  Boolean(database && reSourceDatabase.test(database));

export const getSubEntryProteomes = (
  properties: { key: string; value: string }[] | undefined
): { [key: string]: string } => {
  const proteomeComponentObject: { [key: string]: string } = {};
  if (properties) {
    properties.forEach((property) => {
      if (property.key === 'sources') {
        const [, , proteomeId, ...component] = property.value.split(':');
        if (!proteomeComponentObject[proteomeId]) {
          proteomeComponentObject[proteomeId] = component.join(':');
        }
      }
    });
  }
  return proteomeComponentObject;
};
