import { Loader } from 'franklin-sites';
import { Suspense } from 'react';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import { type TaxonomyAPIModel } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { type UniProtkbUIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { type UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import UniParcSubEntryConfig from '../../config/UniParcSubEntryConfig';

type EntryMainProps = {
  // Entry-intrinsic UniParc data (entry, xref, unisave, raw unifire). Distinct
  // from `annotations` below, which carries the *predicted* annotation data.
  uniparcData: UniParcSubEntryUIModel;
  // The resolved annotations (precomputed or UniFire) converted to a
  // UniProtkbUIModel for the migrated section components. `undefined` when
  // there is no annotation data or `databaseInfoMaps` has not loaded yet.
  annotations?: UniProtkbUIModel;
  lineageData?: TaxonomyAPIModel;
  proteomeComponentObject?: Record<string, string>;
};

const SubEntryMain = ({
  uniparcData,
  annotations,
  lineageData,
  proteomeComponentObject,
}: EntryMainProps) => (
  <>
    {Object.values(UniParcSubEntryConfig).map(({ id, sectionContent }) => (
      <Suspense fallback={<Loader />} key={id}>
        <ErrorBoundary>
          {sectionContent(uniparcData, annotations, {
            lineageData,
            proteomeComponentObject,
          })}
        </ErrorBoundary>
      </Suspense>
    ))}
  </>
);

export default SubEntryMain;
