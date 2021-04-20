import { useMemo, useCallback, Fragment, FC, MouseEvent } from 'react';
import { Card } from 'franklin-sites';
import { useHistory } from 'react-router-dom';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import { KeywordList } from '../protein-data-views/KeywordView';
import ProteinOverview from '../protein-data-views/ProteinOverviewView';

import getProteinHighlights from '../../adapters/proteinHighlights';
import { getKeywordsForCategories } from '../../utils/KeywordsUtil';
import { getEntryPath } from '../../../app/config/urls';
import { getIdKeyFor } from '../../../shared/utils/getIdKeyForNamespace';

import { Namespace } from '../../../shared/types/namespaces';

import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';
import KeywordCategory from '../../types/keywordCategory';

import '../../../shared/components/results/styles/result-card.scss';

const getIdKey = getIdKeyFor(Namespace.uniprotkb);

type Props = {
  data: UniProtkbAPIModel;
  selected?: boolean;
  handleEntrySelection: (rowId: string) => void;
};

const UniProtKBCard: FC<Props> = ({ data, selected, handleEntrySelection }) => {
  const history = useHistory();

  const id = getIdKey(data);

  const handleCardClick = useCallback(
    (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest(`a, input, button`)) {
        return;
      }
      history.push(getEntryPath(Namespace.uniprotkb, id));
    },
    [history, id]
  );

  const highlights = useMemo(() => getProteinHighlights(data), [data]);

  const keywordsNode = useMemo(() => {
    if (!data.keywords) {
      return null;
    }

    const categorisedKeywords = getKeywordsForCategories(data.keywords, [
      KeywordCategory.MOLECULAR_FUNCTION,
      KeywordCategory.BIOLOGICAL_PROCESS,
      KeywordCategory.DISEASE,
    ]);

    return categorisedKeywords.map((keywordCategory, index) => (
      <Fragment key={keywordCategory.category}>
        {index > 0 && ' · '}
        <KeywordList keywords={keywordCategory.keywords} inline />
      </Fragment>
    ));
  }, [data.keywords]);

  return (
    <Card links={highlights} onClick={handleCardClick}>
      <div className="result-card">
        <div className="result-card__left">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => handleEntrySelection(id)}
            data-testid="up-card-checkbox"
          />
        </div>
        <div className="result-card__right">
          <h5>
            <EntryTitle
              mainTitle={id}
              optionalTitle={data.uniProtkbId}
              entryType={data.entryType}
            />
          </h5>
          <ProteinOverview data={data} />
          <small>{keywordsNode}</small>
        </div>
      </div>
    </Card>
  );
};

export default UniProtKBCard;
