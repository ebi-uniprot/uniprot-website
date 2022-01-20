import { Loader, SlidingPanel } from 'franklin-sites';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import { HelpEntryContent } from '../entry/Entry';

import useDataApi from '../../../shared/hooks/useDataApi';

import { help as helpUrl } from '../../../shared/config/apiUrls';

import { HelpEntryResponse } from '../../adapters/helpConverter';

import styles from './styles/contextual-help.module.scss';

type Props = {
  articleId?: string;
  onClose: (reason: 'outside' | 'button' | 'navigation' | 'escape') => void;
};

const ContextualHelpContainer = ({ articleId, onClose }: Props) => {
  const { data, loading, error, status, progress } =
    useDataApi<HelpEntryResponse>(
      articleId ? helpUrl.accession(articleId) : null
    );

  let content = <Loader progress={progress} />;

  if (!loading) {
    if (error || !data) {
      content = <ErrorHandler status={status} />;
    } else {
      content = (
        <>
          <h2 className="medium">{data.title}</h2>
          <HelpEntryContent
            data={data}
            handleClick={() => console.log('click!')}
            upperHeadingLevel="h3"
          />
        </>
      );
    }
  }

  return (
    <SlidingPanel
      title="Help"
      onClose={onClose}
      withCloseButton
      className={styles['contextual-help-panel']}
      size="small"
      position="right"
    >
      {content}
    </SlidingPanel>
  );
};

export default ContextualHelpContainer;
