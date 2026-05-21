import { Loader } from 'franklin-sites';
import { Suspense } from 'react';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import { type UniProtkbUIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { type UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import UniParcSubEntryConfig from '../../config/UniParcSubEntryConfig';

type EntryMainProps = {
  transformedData: UniParcSubEntryUIModel;
  // UniFire annotations converted to a UniProtkbUIModel (spec.md Phase 3).
  // Sections migrate to consume this in Phase 4; undefined when there is no
  // UniFire data or databaseInfoMaps has not loaded.
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
