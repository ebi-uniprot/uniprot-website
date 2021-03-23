import { FC, useCallback } from 'react';
import { Card } from 'franklin-sites';
import { useHistory } from 'react-router-dom';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import RenderColumnInCard from '../../../shared/components/results/RenderColumnInCard';

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
];

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
      <section className="result-card">
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
          <div className="result-card__info-container">
            {mainInfoColumns.map((column) => (
              <RenderColumnInCard
                data={data}
                columnRenderer={ProteomesColumnConfiguration.get(column)}
                key={column}
              />
            ))}
          </div>
          <div className="result-card__info-container">
            <RenderColumnInCard
              data={data}
              columnRenderer={ProteomesColumnConfiguration.get(
                ProteomesColumn.busco
              )}
            />
          </div>
        </div>
      </section>
    </Card>
  );
};

export default ProteomesCard;
