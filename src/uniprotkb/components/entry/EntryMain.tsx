import { Suspense } from 'react';
import { Loader } from 'franklin-sites';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import MedicalDisclaimer from '../../../shared/components/MedicalDisclaimer';

import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';

import { UniProtkbUIModel } from '../../adapters/uniProtkbConverter';
import { Reference } from '../../../supporting-data/citations/adapters/citationsConverter';

type EntryMainProps = {
  transformedData: UniProtkbUIModel;
  importedVariants: number | 'loading';
  hasGenomicCoordinates: boolean | 'loading';
  communityReferences: Reference[];
};

const EntryMain = ({
  transformedData,
  importedVariants,
  hasGenomicCoordinates,
  communityReferences,
}: EntryMainProps) => (
  <>
    {UniProtKBEntryConfig.map(({ id, sectionContent }) => (
      <Suspense fallback={<Loader />} key={id}>
        <ErrorBoundary>
          {sectionContent(
            transformedData,
            importedVariants,
            hasGenomicCoordinates,
            communityReferences
          )}
        </ErrorBoundary>
      </Suspense>
    ))}
    <MedicalDisclaimer />
  </>
);

export default EntryMain;
