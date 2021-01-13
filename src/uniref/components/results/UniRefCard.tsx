import { FC, useCallback } from 'react';
import { Card, LongNumber } from 'franklin-sites';
import { useHistory, generatePath } from 'react-router-dom';

import EntryTitle from '../../../shared/components/entry/EntryTitle';

import { Location, LocationToPath } from '../../../app/config/urls';

import { UniRefLiteAPIModel } from '../../adapters/uniRefConverter';

import '../../../shared/components/results/styles/result-card.scss';

const UniRefCard: FC<{
  data: UniRefLiteAPIModel;
  selected?: boolean;
  handleEntrySelection: (rowId: string) => void;
}> = ({ data, selected, handleEntrySelection }): JSX.Element => {
  const history = useHistory();

  const handleCardClick = useCallback(() => {
    history.push(
      generatePath(LocationToPath[Location.UniRefEntry], { accession: data.id })
    );
  }, [history, data.id]);

  return (
    <Card onClick={handleCardClick}>
      <section className="result-card">
        <section className="result-card__left">
          <input
            type="checkbox"
            checked={selected}
            onClick={(e) => e.stopPropagation()}
            onChange={() => handleEntrySelection(data.id)}
            data-testid="up-card-checkbox"
          />
        </section>
        <section className="result-card__right">
          <h5>
            <EntryTitle mainTitle={data.id} entryType={data.memberIdTypes} />
          </h5>
          <section>{data.name}</section>
          <section>
            <strong className="result-card__info-bit">
              Members: {data.memberCount}
            </strong>
            {' · '}
            <span className="result-card__info-bit">
              Sequence length: <LongNumber>{data.sequenceLength}</LongNumber>
            </span>
            {' · '}
            <span className="result-card__info-bit">
              Identity: {data.entryType}
            </span>
          </section>
        </section>
      </section>
    </Card>
  );
};

export default UniRefCard;
