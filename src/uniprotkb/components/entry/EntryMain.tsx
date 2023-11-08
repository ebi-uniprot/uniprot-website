import { Suspense } from 'react';
import { Loader } from 'franklin-sites';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import MedicalDisclaimer from '../../../shared/components/MedicalDisclaimer';

import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';

import { UniProtkbUIModel } from '../../adapters/uniProtkbConverter';

type EntryMainProps = {
  transformedData: UniProtkbUIModel;
  importedVariants: number | 'loading';
  hasGenomicCoordinates: boolean | 'loading';
};

const EntryMain = ({
  transformedData,
  importedVariants,
  hasGenomicCoordinates,
}: EntryMainProps) => (
  <>
    {UniProtKBEntryConfig.map(({ id, sectionContent }) => (
      <Suspense fallback={<Loader />} key={id}>
        <ErrorBoundary>
          {sectionContent(
            transformedData,
            importedVariants,
            hasGenomicCoordinates
          )}
        </ErrorBoundary>
      </Suspense>
    ))}
    <MedicalDisclaimer />
  </>
);

export default EntryMain;
