/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { useHistory } from 'react-router-dom';

import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';
import { getKeywordsForCategories } from '../../utils/KeywordsUtil';
import KeywordCategory from '../../types/keywordCategory';
import { KeywordList } from '../protein-data-views/KeywordView';
import ProteinOverview from '../protein-data-views/ProteinOverviewView';
import EntryTitle from '../../../shared/components/entry/EntryTitle';
import getProteinHighlights from '../../adapters/proteinHighlights';

import './styles/uniprot-card.scss';

const UniProtKBCard: FC<{
  data: UniProtkbAPIModel;
  selected: boolean;
  handleEntrySelection: (rowId: string) => void;
}> = ({ data, selected, handleEntrySelection }): JSX.Element => {
  const history = useHistory();
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
    <Card
      links={highlights}
      onClick={() => history.push(`/uniprotkb/${data.primaryAccession}`)}
    >
      <section className="uniprot-card">
        <section className="uniprot-card__left">
          <input
            type="checkbox"
            checked={selected}
            onClick={(e) => e.stopPropagation()}
            onChange={() => handleEntrySelection(data.primaryAccession)}
            data-testid="up-card-checkbox"
          />
        </section>
        <section className="uniprot-card__right">
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
