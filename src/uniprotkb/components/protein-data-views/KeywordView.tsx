import { ExpandableList, InfoList } from 'franklin-sites';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';
import { type Keyword, type KeywordUIModel } from '../../utils/KeywordsUtil';
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
    const body = (
      <>
        {' '}
        <KeywordItem id={id} value={idOnly ? id : name} />
        {!inline && <UniProtKBEvidenceTag evidences={evidences} />}
      </>
    );
    // Only wrap AI keywords in a <span> so the `ai-annotation-keyword`
    // class has an element to attach to. Plain keywords stay as a
    // Fragment to avoid adding a DOM node for every keyword in every
    // namespace's keyword list.
    return hasProtNLM2Evidence(evidences) ? (
      // eslint-disable-next-line @eslint-react/no-array-index-key
      <span key={index} className="ai-annotation-keyword">
        {body}
      </span>
    ) : (
      // eslint-disable-next-line @eslint-react/no-array-index-key
      <Fragment key={index}>{body}</Fragment>
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
