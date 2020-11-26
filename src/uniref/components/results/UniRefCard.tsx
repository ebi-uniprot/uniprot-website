import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import { useHistory } from 'react-router-dom';

import EntryTitle from '../../../shared/components/entry/EntryTitle';

import { UniRefLiteAPIModel } from '../../adapters/uniRefConverter';

import '../../../uniprotkb/components/results/styles/uniprot-card.scss';

const UniRefCard: FC<{
  data: UniRefLiteAPIModel;
  selected: boolean;
  handleEntrySelection: (rowId: string) => void;
}> = ({ data, selected, handleEntrySelection }): JSX.Element => {
  const history = useHistory();

  return (
    <Card onClick={() => history.push(`/uniref/${data.id}`)}>
      <section className="uniprot-card">
        <section className="uniprot-card__left">
          <input
            type="checkbox"
            checked={selected}
            onClick={(e) => e.stopPropagation()}
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
