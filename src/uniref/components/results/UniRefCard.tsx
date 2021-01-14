import { FC, useCallback } from 'react';
import { Card } from 'franklin-sites';
import { useHistory, generatePath } from 'react-router-dom';

import EntryTitle from '../../../shared/components/entry/EntryTitle';

import { Location, LocationToPath } from '../../../app/config/urls';

import { UniRefLiteAPIModel } from '../../adapters/uniRefConverter';

import '../../../uniprotkb/components/results/styles/uniprot-card.scss';

const BLOCK_CLICK_ON_CARD = new Set(['A', 'INPUT', 'BUTTON']);

type Props = {
  data: UniRefLiteAPIModel;
  selected: boolean;
  handleEntrySelection: (rowId: string) => void;
};

const UniRefCard: FC<Props> = ({ data, selected, handleEntrySelection }) => {
  const history = useHistory();

  const handleCardClick = useCallback(
    (event: MouseEvent) => {
      if (BLOCK_CLICK_ON_CARD.has((event.target as HTMLElement).tagName)) {
        return;
      }
      history.push(
        generatePath(LocationToPath[Location.UniRefEntry], {
          accession: data.id,
        })
      );
    },
    [history, data.id]
  );

  return (
    <Card onClick={handleCardClick}>
      <section className="uniprot-card">
        <section className="uniprot-card__left">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => handleEntrySelection(data.id)}
            data-testid="up-card-checkbox"
          />
        </section>
        <section className="uniprot-card__right">
          <h5>
            <EntryTitle mainTitle={data.id} entryType={data.memberIdTypes} />
          </h5>
          <section>{data.name}</section>
          <section>
            <strong>Members: {data.memberCount}</strong>
            {' · '} Sequence length: {data.sequenceLength} {' · '} Identity:{' '}
            {data.entryType}
          </section>
        </section>
      </section>
    </Card>
  );
};

export default UniRefCard;
