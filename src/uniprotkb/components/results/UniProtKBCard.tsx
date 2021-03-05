import { useMemo, useCallback, Fragment, FC, MouseEvent } from 'react';
import { Card } from 'franklin-sites';
import { useHistory } from 'react-router-dom';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import { KeywordList } from '../protein-data-views/KeywordView';
import ProteinOverview from '../protein-data-views/ProteinOverviewView';

import getProteinHighlights from '../../adapters/proteinHighlights';
import { getKeywordsForCategories } from '../../utils/KeywordsUtil';
import { getEntryPath } from '../../../app/config/urls';
import KeywordCategory from '../../types/keywordCategory';

import { Namespace } from '../../../shared/types/namespaces';

import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';

import '../../../shared/components/results/styles/result-card.scss';

const BLOCK_CLICK_ON_CARD = new Set(['A', 'INPUT', 'BUTTON']);

type Props = {
  data: UniProtkbAPIModel;
  selected?: boolean;
  handleEntrySelection: (rowId: string) => void;
};

const UniProtKBCard: FC<Props> = ({ data, selected, handleEntrySelection }) => {
  const history = useHistory();

  const handleCardClick = useCallback(
    (event: MouseEvent) => {
      if (BLOCK_CLICK_ON_CARD.has((event.target as HTMLElement).tagName)) {
        return;
      }
      history.push(getEntryPath(Namespace.uniprotkb, data.primaryAccession));
    },
    [history, data.primaryAccession]
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
      <section className="result-card">
        <div className="result-card__left">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => handleEntrySelection(data.primaryAccession)}
            data-testid="up-card-checkbox"
          />
        </div>
        <div className="result-card__right">
          <h5>
            <EntryTitle
              mainTitle={data.primaryAccession}
              optionalTitle={data.uniProtkbId}
              entryType={data.entryType}
            />
          </h5>
          <ProteinOverview data={data} />
          <small>{keywordsNode}</small>
        </div>
      </section>
    </Card>
  );
};

export default UniProtKBCard;
