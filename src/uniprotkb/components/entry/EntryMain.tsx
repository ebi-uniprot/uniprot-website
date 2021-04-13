import { FC, memo } from 'react';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import MedicalDisclaimer from '../../../shared/components/MedicalDisclaimer';

import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';

import { isSameEntry } from '../../../shared/utils/utils';

import { UniProtkbUIModel } from '../../adapters/uniProtkbConverter';

type EntryMainProps = {
  transformedData: UniProtkbUIModel;
};

const EntryMain: FC<EntryMainProps> = ({ transformedData }) => (
  <>
    {UniProtKBEntryConfig.map(({ id, sectionContent }) => (
      <ErrorBoundary key={id}>{sectionContent(transformedData)}</ErrorBoundary>
    ))}

    <MedicalDisclaimer />
  </>
);

export default memo(EntryMain, isSameEntry);
