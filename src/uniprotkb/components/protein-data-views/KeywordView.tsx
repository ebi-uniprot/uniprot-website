import cn from 'classnames';
import { ExpandableList, InfoList } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';
import { Keyword, KeywordUIModel } from '../../utils/KeywordsUtil';
import { hasProtNLM2Evidence } from '../../utils/protnlm';
import styles from './styles/keyword-view.module.scss';
import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

type KeywordListProps = {
  keywords: Keyword[];
  idOnly?: boolean;
  inline?: boolean;
};

type KeywordItempProps = {
  id?: string;
  value?: string;
};

const KeywordItem = ({ id, value }: KeywordItempProps) => {
  if (!id || !value) {
    return null;
  }
  return <Link to={getEntryPath(Namespace.keywords, id)}>#{value}</Link>;
};

export const KeywordList = ({ keywords, idOnly, inline }: KeywordListProps) => {
  const content = keywords.map((keyword, index) => {
    const { id, name, evidences } = keyword;
    if (!id || !name) {
      return null;
    }
    return (
      <span
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        className={cn('text-block', {
          'ai-annotation-keyword': hasProtNLM2Evidence(evidences),
        })}
      >
        {' '}
        <KeywordItem id={id} value={idOnly ? id : name} />
        {!inline && <UniProtKBEvidenceTag evidences={evidences} />}
      </span>
    );
  });

  return inline ? (
    <div className={styles['keyword-view--inline']} translate="yes">
      {content}
    </div>
  ) : (
    <ExpandableList
      descriptionString={idOnly ? 'keyword IDs' : 'keywords'}
      translate="yes"
    >
      {content}
    </ExpandableList>
  );
};

const KeywordView = ({ keywords }: { keywords?: KeywordUIModel[] }) => {
  const infoData = keywords?.map((keywordCategory) => ({
    title: keywordCategory.category,
    content: <KeywordList keywords={keywordCategory.keywords} />,
  }));

  return infoData?.length ? (
    <>
      <h3 data-article-id="keywords">Keywords</h3>
      <InfoList infoData={infoData} />
    </>
  ) : null;
};

export default KeywordView;
