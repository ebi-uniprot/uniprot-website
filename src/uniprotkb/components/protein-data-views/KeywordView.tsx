import { Fragment, FC } from 'react';
import { InfoList } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { Keyword, KeywordUIModel } from '../../utils/KeywordsUtil';

type KeywordListProps = {
  keywords: Keyword[];
  idOnly?: boolean;
};

type KeywordItempProps = {
  id?: string;
  value?: string;
};

export const KeywordItem: FC<KeywordItempProps> = ({ id, value }) => {
  if (!id || !value) {
    return null;
  }
  return <Link to={`/keywords/${id}`}>{` #${value}`}</Link>;
};

export const KeywordList: FC<KeywordListProps> = ({
  keywords,
  idOnly = false,
}) => {
  if (!keywords) {
    return null;
  }
  const nodes = keywords.map((keyword, index) => {
    const { id, name } = keyword;
    if (!id || !name) {
      return null;
    }
    return (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={index}>
        <KeywordItem id={id} value={idOnly ? id : name} />
        {index < keywords.length - 1 && ' '}
      </Fragment>
    );
  });

  return <>{nodes}</>;
};

const KeywordView: FC<{ keywords: KeywordUIModel[] }> = ({ keywords }) => {
  if (!keywords || keywords.length <= 0) {
    return null;
  }
  const infoData = keywords.map((keywordCategory) => ({
    title: keywordCategory.category,
    content: <KeywordList keywords={keywordCategory.keywords} />,
  }));
  if (infoData.length === 0) {
    return null;
  }
  return (
    <>
      <h3>Keywords</h3>
      <InfoList infoData={infoData} />
    </>
  );
};

export default KeywordView;
