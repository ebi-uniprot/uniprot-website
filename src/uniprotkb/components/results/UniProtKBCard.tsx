import { useMemo } from 'react';
import { Card } from 'franklin-sites';
import { Link } from 'react-router-dom';

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
import AlphaFoldView from '../../../shared/components/results/AlphaFoldView';

const getIdKey = getIdKeyFor(Namespace.uniprotkb);

const UniProtKBCard = ({
  data,
  isNotSelectable,
  alphaFold,
}: {
  data: UniProtkbAPIModel;
  isNotSelectable?: boolean;
  alphaFold?: boolean;
}) => {
  const id = getIdKey(data);

  const highlights = useMemo(() => getProteinHighlights(data), [data]);

  const keywords = useMemo(() => {
    if (!data.keywords) {
      return null;
    }
    // We only want to display keywords from 3 groups, not all of them
    return getKeywordsForCategories(data.keywords, [
      'Molecular function',
      'Biological process',
      'Disease',
    ]).flatMap(({ keywords }) => keywords);
  }, [data.keywords]);

  return (
    <Card
      header={
        <>
          {isNotSelectable ? null : <CardCheckboxCell id={id} />}
          <h2 className="small">
            <Link to={getEntryPath(Namespace.uniprotkb, id)}>
              <EntryTitle
                mainTitle={id}
                optionalTitle={data.uniProtkbId}
                entryType={data.entryType}
              />
            </Link>
          </h2>
          <BasketStatus id={id} className="tiny" />
        </>
      }
      headerSeparator={false}
      links={highlights}
    >
      <ProteinOverview data={data} />
      {alphaFold && <AlphaFoldView accession={data.primaryAccession} />}
      {keywords?.length ? (
        <small>
          <KeywordList keywords={keywords} inline />
        </small>
      ) : null}
    </Card>
  );
};

export default UniProtKBCard;
