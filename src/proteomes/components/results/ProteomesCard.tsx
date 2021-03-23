import { FC, useCallback } from 'react';
import { Card } from 'franklin-sites';
import { useHistory } from 'react-router-dom';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import RenderColumnsInCard from '../../../shared/components/results/RenderColumnsInCard';

import { getEntryPath } from '../../../app/config/urls';
import ProteomesColumnConfiguration, {
  ProteomesColumn,
} from '../../config/ProteomesColumnConfiguration';

import { Namespace } from '../../../shared/types/namespaces';
import { ProteomesAPIModel } from '../../adapters/proteomesConverter';

import '../../../shared/components/results/styles/result-card.scss';

const mainInfoColumns = [
  ProteomesColumn.organism,
  ProteomesColumn.proteinCount,
  ProteomesColumn.genomeRepresentation,
  ProteomesColumn.cpd,
].map((column) => ProteomesColumnConfiguration.get(column));
const busco = ProteomesColumnConfiguration.get(ProteomesColumn.busco);

const ProteomesCard: FC<{
  data: ProteomesAPIModel;
  selected?: boolean;
  handleEntrySelection: (rowId: string) => void;
}> = ({ data, selected, handleEntrySelection }): JSX.Element => {
  const history = useHistory();

  const handleCardClick = useCallback(() => {
    history.push(getEntryPath(Namespace.proteomes, data.id));
  }, [history, data.id]);

  return (
    <Card onClick={handleCardClick}>
      <div className="result-card">
        <div className="result-card__left">
          <input
            type="checkbox"
            checked={selected}
            onClick={(e) => e.stopPropagation()}
            onChange={() => handleEntrySelection(data.id)}
            data-testid="up-card-checkbox"
          />
        </div>
        <div className="result-card__right">
          <h5>
            <EntryTitle mainTitle={data.id} entryType={data.proteomeType} />
          </h5>
          <RenderColumnsInCard data={data} renderers={mainInfoColumns} />
          <RenderColumnsInCard data={data} renderers={busco} />
        </div>
      </div>
    </Card>
  );
};

export default ProteomesCard;
