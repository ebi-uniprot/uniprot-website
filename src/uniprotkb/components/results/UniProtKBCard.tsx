import { useCallback, Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { useHistory, generatePath } from 'react-router-dom';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import { KeywordList } from '../protein-data-views/KeywordView';
import ProteinOverview from '../protein-data-views/ProteinOverviewView';

import getProteinHighlights from '../../adapters/proteinHighlights';
import { getKeywordsForCategories } from '../../utils/KeywordsUtil';
import { Location, LocationToPath } from '../../../app/config/urls';
import KeywordCategory from '../../types/keywordCategory';

import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';

import '../../../shared/components/results/styles/result-card.scss';

const UniProtKBCard: FC<{
  data: UniProtkbAPIModel;
  selected?: boolean;
  handleEntrySelection: (rowId: string) => void;
}> = ({ data, selected, handleEntrySelection }): JSX.Element => {
  const history = useHistory();

  const handleCardClick = useCallback(() => {
    history.push(
      generatePath(LocationToPath[Location.UniProtKBEntry], {
        accession: data.primaryAccession,
      })
    );
  }, [history, data.primaryAccession]);

  const highlights = getProteinHighlights(data);

  let keywordsNode;
  if (data.keywords) {
    const categorisedKewywords = getKeywordsForCategories(data.keywords, [
      KeywordCategory.MOLECULAR_FUNCTION,
      KeywordCategory.BIOLOGICAL_PROCESS,
      KeywordCategory.DISEASE,
    ]);

    if (categorisedKewywords.length > 0) {
      keywordsNode = categorisedKewywords.map((keywordCategory, index) => (
        <Fragment key={keywordCategory.category}>
          {index > 0 && ' · '}
          <KeywordList keywords={keywordCategory.keywords} />
        </Fragment>
      ));
    }
  }

  return (
    <Card links={highlights} onClick={handleCardClick}>
      <section className="result-card">
        <section className="result-card__left">
          <input
            type="checkbox"
            checked={selected}
            onClick={(e) => e.stopPropagation()}
            onChange={() => handleEntrySelection(data.primaryAccession)}
            data-testid="up-card-checkbox"
          />
        </section>
        <section className="result-card__right">
          <h5>
            <EntryTitle
              mainTitle={data.primaryAccession}
              optionalTitle={data.uniProtkbId}
              entryType={data.entryType}
            />
          </h5>
          <ProteinOverview data={data} />
          <section>
            <small>{keywordsNode}</small>
          </section>
        </section>
      </section>
    </Card>
  );
};

export default UniProtKBCard;
