import { FC, useCallback, useMemo, MouseEvent } from 'react';
import { Card, LongNumber } from 'franklin-sites';
import { useHistory } from 'react-router-dom';

import EntryTitle from '../../../shared/components/entry/EntryTitle';

import {
  UniParcAPIModel,
  XRefsInternalDatabasesEnum,
} from '../../adapters/uniParcConverter';

import { getEntryPath } from '../../../app/config/urls';
import { getIdKeyFor } from '../../../shared/utils/getIdKeyForNamespace';
import xrefGetter from '../../utils/xrefGetter';

import UniParcColumnConfiguration, {
  UniParcColumn,
} from '../../config/UniParcColumnConfiguration';
import RenderColumnsInCard from '../../../shared/components/results/RenderColumnsInCard';

import { Namespace } from '../../../shared/types/namespaces';
import { EntryType } from '../../../shared/components/entry/EntryTypeIcon';

import renderColumnsInCardStyles from '../../../shared/components/results/styles/render-columns-in-card.module.scss';
import '../../../shared/components/results/styles/result-card.scss';

const mainInfoColumns = [
  UniParcColumn.firstSeen,
  UniParcColumn.lastSeen,
  UniParcColumn.length,
].map((column) => UniParcColumnConfiguration.get(column));

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

const getIdKey = getIdKeyFor(Namespace.uniparc);

const UniParcCard: FC<{
  data: UniParcAPIModel;
  selected?: boolean;
  handleEntrySelection: (rowId: string) => void;
}> = ({ data, selected, handleEntrySelection }): JSX.Element => {
  const history = useHistory();

  const id = getIdKey(data);

  const handleCardClick = useCallback(
    (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest(`a, input, button`)) {
        return;
      }
      history.push(getEntryPath(Namespace.uniparc, id));
    },
    [history, id]
  );

  const organismCount = xrefGetter(data, 'organism', 'taxonId')?.length || 0;
  const uniProtKBCount = useMemo(() => uniProtKBCounter(data), [data]);

  return (
    <Card onClick={handleCardClick}>
      <div className="result-card">
        <div className="result-card__left">
          <input
            type="checkbox"
            checked={selected}
            onClick={(e) => e.stopPropagation()}
            onChange={() => handleEntrySelection(id)}
            data-testid="up-card-checkbox"
          />
        </div>
        <div className="result-card__right">
          <h5>
            <EntryTitle mainTitle={id} entryType={EntryType.UNIPARC} />
          </h5>
          <div
            className={renderColumnsInCardStyles['result-card__info-container']}
          >
            <span
              className={renderColumnsInCardStyles['result-card__info-bit']}
            >
              <strong>Organism{organismCount === 1 ? '' : 's'}: </strong>
              <LongNumber>{organismCount}</LongNumber>
            </span>
            <span
              className={renderColumnsInCardStyles['result-card__info-bit']}
            >
              <strong>UniprotKB entries: </strong>
              <LongNumber>{uniProtKBCount.reviewed}</LongNumber> reviewed and{' '}
              <LongNumber>{uniProtKBCount.unreviewed}</LongNumber> unreviewed
            </span>
          </div>
          <RenderColumnsInCard data={data} renderers={mainInfoColumns} />
        </div>
      </div>
    </Card>
  );
};

export default UniParcCard;
