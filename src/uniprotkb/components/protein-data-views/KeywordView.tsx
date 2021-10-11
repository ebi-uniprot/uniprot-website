import { FC } from 'react';
import { InfoList, ExpandableList } from 'franklin-sites';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { getEntryPath } from '../../../app/config/urls';

import { Namespace } from '../../../shared/types/namespaces';

import { Keyword, KeywordUIModel } from '../../utils/KeywordsUtil';

import './styles/keyword-view.scss';

type KeywordListProps = {
  keywords: Keyword[];
  idOnly?: boolean;
  inline?: boolean;
};

type KeywordItempProps = {
  id?: string;
  value?: string;
};

export const KeywordItem: FC<KeywordItempProps> = ({ id, value }) => {
  if (!id || !value) {
    return null;
  }
  return <Link to={getEntryPath(Namespace.keywords, id)}>{` #${value}`}</Link>;
};

export const KeywordList: FC<KeywordListProps> = ({
  keywords,
  idOnly,
  inline,
}) => (
  <ExpandableList
    descriptionString={idOnly ? 'keyword IDs' : 'keywords'}
    className={cn({ 'keyword-view--inline': inline })}
  >
    {keywords.map((keyword, index) => {
      const { id, name } = keyword;
      if (!id || !name) {
        return null;
      }
      // eslint-disable-next-line react/no-array-index-key
      return <KeywordItem key={index} id={id} value={idOnly ? id : name} />;
    })}
  </ExpandableList>
);

const KeywordView: FC<{ keywords: KeywordUIModel[] }> = ({ keywords }) => {
  if (!keywords?.length) {
    return null;
  }
  const infoData = keywords.map((keywordCategory) => ({
    title: keywordCategory.category,
    content: <KeywordList keywords={keywordCategory.keywords} />,
  }));
  if (!infoData.length) {
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
