import { Loader, SlidingPanel } from 'franklin-sites';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import { help as helpUrl } from '../../../shared/config/apiUrls';
import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';
import { HelpEntryResponse } from '../../adapters/helpConverter';
import { HelpEntryContent } from '../entry/Entry';

import styles from './styles/contextual-help.module.scss';

const ContextualHelpContainer = ({ articleId }: { articleId: string }) => {
  const { data, loading, error, status, progress, isStale } =
    useDataApiWithStale<HelpEntryResponse>(helpUrl.accession(articleId));

  if (loading && !data) {
    return <Loader progress={progress} />;
  }

  if (error || !data) {
    return <ErrorHandler status={status} />;
  }

  return (
    <SlidingPanel
      onClose={() => {
        console.log('do something');
      }}
      className={styles['contextual-help-panel']}
      position="right"
    >
      <HelpEntryContent
        data={data}
        isStale={isStale}
        handleClick={() => console.log('click!')}
      />
    </SlidingPanel>
  );
};

export default ContextualHelpContainer;
