import React, { FC, memo } from 'react';
import { HeroContainer } from 'franklin-sites';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';

import { UniProtkbUIModel } from '../../adapters/uniProtkbConverter';

type EntryMainProps = {
  transformedData: UniProtkbUIModel;
};

function arePropsEqual(prevProps: EntryMainProps, nextProps: EntryMainProps) {
  // Do NOT re-render the page, as long as the 'accession' value is the same.
  return (
    prevProps.transformedData.primaryAccession ===
    nextProps.transformedData.primaryAccession
  );
}

const EntryMain: FC<EntryMainProps> = ({ transformedData }) => (
  <>
    {UniProtKBEntryConfig.map(({ name, sectionContent }) => (
      <ErrorBoundary key={name}>
        {sectionContent(transformedData)}
      </ErrorBoundary>
    ))}

    <HeroContainer>
      <em>
        Any medical or genetic information present in this entry is provided for
        research, educational and informational purposes only. It is not in any
        way intended to be used as a substitute for professional medical advice,
        diagnosis, treatment or care.
      </em>
    </HeroContainer>
  </>
);

export default memo(EntryMain, arePropsEqual);
