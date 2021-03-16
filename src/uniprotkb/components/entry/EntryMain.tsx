import { FC, memo } from 'react';
import { HeroContainer } from 'franklin-sites';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

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

export default memo(EntryMain, isSameEntry);
