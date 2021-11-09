import { useMemo, Fragment } from 'react';
import { Card } from 'franklin-sites';

import EntryTitle from '../../shared/components/entry/EntryTitle';
import { KeywordList } from '../../uniprotkb/components/protein-data-views/KeywordView';
import ProteinOverview from '../../uniprotkb/components/protein-data-views/ProteinOverviewView';
import CardCheckboxCell from '../../shared/components/CardCheckboxCell';

import getProteinHighlights from '../../uniprotkb/adapters/proteinHighlights';
import { getKeywordsForCategories } from '../../uniprotkb/utils/KeywordsUtil';
import { getEntryPath } from '../../app/config/urls';
import { getIdKeyFor } from '../../shared/utils/getIdKeyForNamespace';

import { Namespace } from '../../shared/types/namespaces';

import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';

const getIdKey = getIdKeyFor(Namespace.uniprotkb);

const CovidCard = ({ data }: { data: UniProtkbAPIModel }) => {
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

    return categorisedKeywords.map((keywordCategory, index) => (
      <Fragment key={keywordCategory.category}>
        {index > 0 && ' · '}
        <KeywordList keywords={keywordCategory.keywords} inline />
      </Fragment>
    ));
  }, [data.keywords]);

  const handleCardClick = (id: string) => {
    console.log(id);
    // TODO emit event to minerva
  };

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
        </>
      }
      headerSeparator={false}
      onClick={() => handleCardClick(id)}
      links={highlights}
    >
      <ProteinOverview data={data} />
      <small>{keywordsNode}</small>
    </Card>
  );
};

export default CovidCard;
