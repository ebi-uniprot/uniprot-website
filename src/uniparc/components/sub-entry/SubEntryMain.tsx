import { Loader } from 'franklin-sites';
import { Suspense } from 'react';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import { type UniProtkbUIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { type UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import UniParcSubEntryConfig from '../../config/UniParcSubEntryConfig';

type EntryMainProps = {
  transformedData: UniParcSubEntryUIModel;
  // The resolved annotations (precomputed or UniFire) converted to a
  // UniProtkbUIModel for the migrated section components. `undefined` when
  // there is no annotation data or `databaseInfoMaps` has not loaded yet.
  annotations?: UniProtkbUIModel;
};

const SubEntryMain = ({ transformedData, annotations }: EntryMainProps) => (
  <>
    {Object.values(UniParcSubEntryConfig).map(({ id, sectionContent }) => (
      <Suspense fallback={<Loader />} key={id}>
        <ErrorBoundary>
          {sectionContent(transformedData, annotations)}
        </ErrorBoundary>
      </Suspense>
    ))}
  </>
);

export default SubEntryMain;
