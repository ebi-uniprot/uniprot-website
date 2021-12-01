import { useMemo } from 'react';
import { Card } from 'franklin-sites';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import { KeywordList } from '../protein-data-views/KeywordView';
import ProteinOverview from '../protein-data-views/ProteinOverviewView';
import BasketStatus from '../../../basket/BasketStatus';
import CardCheckboxCell from '../../../shared/components/CardCheckboxCell';

import getProteinHighlights from '../../adapters/proteinHighlights';
import { getKeywordsForCategories } from '../../utils/KeywordsUtil';
import { getEntryPath } from '../../../app/config/urls';
import { getIdKeyFor } from '../../../shared/utils/getIdKeyForNamespace';

import { Namespace } from '../../../shared/types/namespaces';

import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';

const getIdKey = getIdKeyFor(Namespace.uniprotkb);

const UniProtKBCard = ({ data }: { data: UniProtkbAPIModel }) => {
  const id = getIdKey(data);

  const highlights = useMemo(() => getProteinHighlights(data), [data]);

  const keywordsNode = useMemo(() => {
    if (!data.keywords) {
      return null;
    }

    const categorisedKeywords = getKeywordsForCategories(data.keywords, [
      'Molecular function',
      'Biological process',
      'Disease',
    ]);

    return categorisedKeywords.map((keywordCategory) => (
      <KeywordList
        keywords={keywordCategory.keywords}
        inline
        key={keywordCategory.category}
      />
    ));
  }, [data.keywords]);

  return (
    <Card
      header={
        <>
          <CardCheckboxCell id={id} />
          <h2 className="tiny">
            <EntryTitle
              mainTitle={id}
              optionalTitle={data.uniProtkbId}
              entryType={data.entryType}
            />
          </h2>
          <BasketStatus id={id} />
        </>
      }
      headerSeparator={false}
      to={getEntryPath(Namespace.uniprotkb, id)}
      links={highlights}
    >
      <ProteinOverview data={data} />
      <small>{keywordsNode}</small>
    </Card>
  );
};

export default UniProtKBCard;
