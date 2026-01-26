import { Loader } from 'franklin-sites';
import { Suspense } from 'react';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import MedicalDisclaimer from '../../../shared/components/MedicalDisclaimer';
import { IsoformsContext } from '../../../shared/contexts/Isoforms';
import { type Reference } from '../../../supporting-data/citations/adapters/citationsConverter';
import { type UniProtkbUIModel } from '../../adapters/uniProtkbConverter';
import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';

type EntryMainProps = {
  transformedData: UniProtkbUIModel;
  importedVariants: number | 'loading';
  communityReferences: Reference[];
  isoforms?: string[];
};

const EntryMain = ({
  transformedData,
  importedVariants,
  communityReferences,
  isoforms,
}: EntryMainProps) => (
  <IsoformsContext.Provider value={isoforms}>
    {UniProtKBEntryConfig.map(({ id, sectionContent }) => (
      <Suspense fallback={<Loader />} key={id}>
        <ErrorBoundary>
          {sectionContent(
            transformedData,
            communityReferences,
            importedVariants
          )}
        </ErrorBoundary>
      </Suspense>
    ))}
    <MedicalDisclaimer />
  </IsoformsContext.Provider>
);
export default EntryMain;
