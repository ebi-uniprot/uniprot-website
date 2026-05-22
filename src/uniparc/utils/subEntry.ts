import { generatePath } from 'react-router-dom';

import { Location, LocationToPath } from '../../app/config/urls';

export const getSubEntryPath = (
  accession: string,
  xrefId: string,
  subPage: string
) =>
  generatePath(LocationToPath[Location.UniParcSubEntry], {
    accession,
    xrefId,
    subPage,
  });

const reSourceDatabase = /^(refseq|ensembl|embl)/i;

export const isSourceDatabase = (database?: string) =>
  Boolean(database && reSourceDatabase.test(database));

/**
 * The canonical identifier for a UniParc sub-entry: `<UPI>-<taxId>` (e.g.
 * `UPI000002A2F6-9606`). This is the form the precomputed endpoint already
 * returns as `primaryAccession`; the UniFire endpoint returns the same pair
 * colon-joined (`<UPI>:<taxId>`), so this normalises it to the shared form.
 *
 * NOTE: a sub-entry accession is NOT a UniProtKB accession. Code consuming the
 * converted `UniProtkbAPIModel` must not treat it as dereferenceable — see the
 * `enableExternalData` prop on the reused section components (spec.md §12.1).
 */
export const toSubEntryAccession = (uniFireAccession: string): string =>
  uniFireAccession.replaceAll(':', '-');

export const getSubEntryProteomes = (
  properties: { key: string; value: string }[] | undefined
): { [key: string]: string } => {
  const proteomeComponentObject: { [key: string]: string } = {};
  if (properties) {
    properties.forEach((property) => {
      if (property.key === 'sources') {
        const [, , proteomeId, ...component] = property.value.split(':');
        // Guard against a `sources` value with no proteome segment — an empty
        // proteomeId becomes an unkeyed entry and crashes getEntryPath().
        if (proteomeId && !proteomeComponentObject[proteomeId]) {
          proteomeComponentObject[proteomeId] = component.join(':');
        }
      }
    });
  }
  return proteomeComponentObject;
};
