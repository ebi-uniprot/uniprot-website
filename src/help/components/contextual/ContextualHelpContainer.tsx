import { Loader, SlidingPanel } from 'franklin-sites';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import { help as helpUrl } from '../../../shared/config/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { HelpEntryResponse } from '../../adapters/helpConverter';
import { HelpEntryContent } from '../entry/Entry';

import styles from './styles/contextual-help.module.scss';

const ContextualHelpContainer = ({ articleId }: { articleId: string }) => {
  const { data, loading, error, status, progress } =
    useDataApi<HelpEntryResponse>(helpUrl.accession(articleId));

  if (loading && !data) {
    return <Loader progress={progress} />;
  }

  if (error || !data) {
    return <ErrorHandler status={status} />;
  }

  return (
    <SlidingPanel
      title="Help"
      onClose={() => {
        console.log('do something');
      }}
      className={styles['contextual-help-panel']}
      size="small"
      position="right"
    >
      <>
        <h2 className="medium">{data.title}</h2>
        <HelpEntryContent
          data={data}
          handleClick={() => console.log('click!')}
          upperHeadingLevel="h3"
        />
      </>
    </SlidingPanel>
  );
};

export default ContextualHelpContainer;
