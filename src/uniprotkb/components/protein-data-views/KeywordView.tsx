import { Fragment } from 'react';
import { InfoList, ExpandableList } from 'franklin-sites';
import { Link } from 'react-router-dom';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

import { getEntryPath } from '../../../app/config/urls';

import { Namespace } from '../../../shared/types/namespaces';
import { Keyword, KeywordUIModel } from '../../utils/KeywordsUtil';

import styles from './styles/keyword-view.module.scss';

type KeywordListProps = {
  keywords: Keyword[];
  idOnly?: boolean;
  inline?: boolean;
};

type KeywordItempProps = {
  id?: string;
  value?: string;
};

export const KeywordItem = ({ id, value }: KeywordItempProps) => {
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
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={index}>
        {' '}
        <KeywordItem id={id} value={idOnly ? id : name} />
        {!inline && <UniProtKBEvidenceTag evidences={evidences} />}
      </Fragment>
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
