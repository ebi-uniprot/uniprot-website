import { generatePath } from 'react-router-dom';

import { Location, LocationToPath } from '../../app/config/urls';
import { hasContent } from '../../shared/utils/utils';
import { type UIModel } from '../../uniprotkb/adapters/sectionConverter';

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
 * `enableExternalData` prop on the reused section components.
 */
export const toSubEntryAccession = (uniFireAccession: string): string =>
  uniFireAccession.replace(':', '-');

/**
 * Whether a converted annotation section has anything renderable.
 *
 * `hasContent` on a whole section `UIModel` is fooled by metadata fields some
 * converters add (e.g. functionConverter's `entryType`), so it is restricted to
 * the renderable content fields. Shared by `UniParcSubEntryConfig`, the
 * in-page-nav gating in `SubEntry`, and the hybrid section components so the
 * nav and the rendered cards never disagree.
 */
export const hasAnnotationContent = (section?: Partial<UIModel>): boolean =>
  Boolean(
    section &&
    hasContent({
      commentsData: section.commentsData,
      featuresData: section.featuresData,
      keywordData: section.keywordData,
      xrefData: section.xrefData,
    })
  );

export const getSubEntryProteomes = (
  properties: { key: string; value: string }[] | undefined
): Record<string, string> => {
  const proteomeComponentObject: Record<string, string> = {};
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
