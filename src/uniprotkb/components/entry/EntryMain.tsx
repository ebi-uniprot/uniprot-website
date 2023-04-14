import { memo, Suspense } from 'react';
import { Loader } from 'franklin-sites';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import MedicalDisclaimer from '../../../shared/components/MedicalDisclaimer';

import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';

import { UniProtkbUIModel } from '../../adapters/uniProtkbConverter';

type EntryMainProps = {
  transformedData: UniProtkbUIModel;
  hasImportedVariants: boolean;
};

const EntryMain = ({
  transformedData,
  hasImportedVariants,
}: EntryMainProps) => (
  <>
    {UniProtKBEntryConfig.map(({ id, sectionContent }) => (
      <Suspense fallback={<Loader />} key={id}>
        <ErrorBoundary>
          {sectionContent(transformedData, hasImportedVariants)}
        </ErrorBoundary>
      </Suspense>
    ))}

    <MedicalDisclaimer />
  </>
);

export default memo(EntryMain);
