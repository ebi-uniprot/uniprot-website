import { FC, useCallback, useMemo } from 'react';
import { Card, LongNumber } from 'franklin-sites';
import { useHistory } from 'react-router-dom';

import EntryTitle from '../../../shared/components/entry/EntryTitle';

import {
  UniParcAPIModel,
  XRefsInternalDatabasesEnum,
} from '../../adapters/uniParcConverter';

import { getEntryPath } from '../../../app/config/urls';
import xrefGetter from '../../utils/xrefGetter';

import UniParcColumnConfiguration, {
  UniParcColumn,
} from '../../config/UniParcColumnConfiguration';

import { Namespace } from '../../../shared/types/namespaces';
import { EntryType } from '../../../shared/components/entry/EntryTypeIcon';

import '../../../shared/components/results/styles/result-card.scss';

const firstSeen = UniParcColumnConfiguration.get(UniParcColumn.firstSeen)
  ?.render;
const lastSeen = UniParcColumnConfiguration.get(UniParcColumn.lastSeen)?.render;

const uniProtKBCounter = (data: UniParcAPIModel) => {
  let reviewed = 0;
  let unreviewed = 0;
  for (const xref of data.uniParcCrossReferences || []) {
    if (xref.database === XRefsInternalDatabasesEnum.REVIEWED) {
      reviewed += 1;
    } else if (xref.database === XRefsInternalDatabasesEnum.UNREVIEWED) {
      unreviewed += 1;
    }
  }
  return { reviewed, unreviewed };
};

const UniRefCard: FC<{
  data: UniParcAPIModel;
  selected?: boolean;
  handleEntrySelection: (rowId: string) => void;
}> = ({ data, selected, handleEntrySelection }): JSX.Element => {
  const history = useHistory();

  const handleCardClick = useCallback(() => {
    history.push(getEntryPath(Namespace.uniparc, data.uniParcId));
  }, [history, data.uniParcId]);

  const organismCount = xrefGetter(data, 'organism', 'taxonId')?.length || 0;
  const uniProtKBCount = useMemo(() => uniProtKBCounter(data), [data]);

  return (
    <Card onClick={handleCardClick}>
      <section className="result-card">
        <section className="result-card__left">
          <input
            type="checkbox"
            checked={selected}
            onClick={(e) => e.stopPropagation()}
            onChange={() => handleEntrySelection(data.uniParcId)}
            data-testid="up-card-checkbox"
          />
        </section>
        <section className="result-card__right">
          <h5>
            <EntryTitle
              mainTitle={data.uniParcId}
              entryType={EntryType.UNIPARC}
            />
          </h5>
          <section>
            <span className="result-card__info-bit">
              Organism{organismCount === 1 ? '' : 's'}:{' '}
              <LongNumber>{organismCount}</LongNumber>
            </span>
            {' · '}
            <span className="result-card__info-bit">
              UniprotKB entries: {uniProtKBCount.reviewed} reviewed and{' '}
              <LongNumber>{uniProtKBCount.unreviewed}</LongNumber> unreviewed
            </span>
          </section>
          <section>
            <span className="result-card__info-bit">
              First seen: {firstSeen?.(data)}
            </span>
            {' · '}
            <span className="result-card__info-bit">
              Last seen: {lastSeen?.(data)}
            </span>
            {' · '}
            <span className="result-card__info-bit">
              Sequence length: <LongNumber>{data.sequence.length}</LongNumber>
            </span>
          </section>
        </section>
      </section>
    </Card>
  );
};

export default UniRefCard;
