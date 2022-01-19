import { Loader, SlidingPanel } from 'franklin-sites';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import { help as helpUrl } from '../../../shared/config/apiUrls';
import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';
import { HelpEntryResponse } from '../../adapters/helpConverter';
import { HelpEntryContent } from '../entry/Entry';

import styles from './styles/contextual-help.module.scss';

const ContextualHelpContainer = ({ articleId }: { articleId: string }) => {
  const { data, loading, error, status, progress } =
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
      <h1 className="big">Help</h1>
      <div className={styles['contextual-help-content']}>
        <h2 className="medium">{data.title}</h2>
        <HelpEntryContent
          data={data}
          handleClick={() => console.log('click!')}
          upperHeadingLevel="h3"
        />
      </div>
    </SlidingPanel>
  );
};

export default ContextualHelpContainer;
