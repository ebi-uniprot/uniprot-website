import { FC, useCallback, MouseEvent } from 'react';
import { Card } from 'franklin-sites';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import RenderColumnsInCard from '../../../shared/components/results/RenderColumnsInCard';

import { getEntryPath } from '../../../app/config/urls';
import { getIdKeyFor } from '../../../shared/utils/getIdKeyForNamespace';

import ProteomesColumnConfiguration, {
  ProteomesColumn,
} from '../../config/ProteomesColumnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';
import { ProteomesAPIModel } from '../../adapters/proteomesConverter';

import renderColumnsInCardStyles from '../../../shared/components/results/styles/render-columns-in-card.module.scss';
import styles from './styles/proteomes-card.module.scss';
import '../../../shared/components/results/styles/result-card.scss';

const mainInfoColumns = [
  ProteomesColumn.organism,
  ProteomesColumn.proteinCount,
  ProteomesColumn.genomeRepresentation,
  ProteomesColumn.cpd,
].map((column) => ProteomesColumnConfiguration.get(column));
const buscoColumnRenderer = ProteomesColumnConfiguration.get(
  ProteomesColumn.busco
);

const BLOCK_CLICK_ON_CARD = new Set(['A', 'INPUT', 'BUTTON']);

const getIdKey = getIdKeyFor(Namespace.proteomes);

const ProteomesCard: FC<{
  data: ProteomesAPIModel;
  selected?: boolean;
  handleEntrySelection: (rowId: string) => void;
}> = ({ data, selected, handleEntrySelection }): JSX.Element => {
  const history = useHistory();

  const id = getIdKey(data);

  const handleCardClick = useCallback(
    (event: MouseEvent) => {
      if (BLOCK_CLICK_ON_CARD.has((event.target as HTMLElement).tagName)) {
        return;
      }
      history.push(getEntryPath(Namespace.proteomes, id));
    },
    [history, id]
  );

  const buscoRendered = buscoColumnRenderer?.render(data);

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
            <EntryTitle mainTitle={id} entryType={data.proteomeType} />
          </h5>
          <RenderColumnsInCard data={data} renderers={mainInfoColumns} />
          {buscoColumnRenderer && buscoRendered && (
            <div
              className={
                renderColumnsInCardStyles['result-card__info-container']
              }
            >
              <span
                className={cn(
                  renderColumnsInCardStyles['result-card__info-bit'],
                  styles['busco__info-bit']
                )}
              >
                <strong>{buscoColumnRenderer.label}</strong>
                {buscoRendered}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProteomesCard;
