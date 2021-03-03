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
            <EntryTitle mainTitle={data.id} entryType={data.proteomeType} />
          </h5>
          <section>
            {mainInfoColumns.map((column) => (
              <RenderColumnInCard<ProteomesColumn, ProteomesAPIModel>
                type={column}
                data={data}
                columnConfig={ProteomesColumnConfiguration}
              />
            ))}
          </section>
          <section>
            <RenderColumnInCard<ProteomesColumn, ProteomesAPIModel>
              type={ProteomesColumn.busco}
              data={data}
              columnConfig={ProteomesColumnConfiguration}
            />
          </section>
        </section>
      </section>
    </Card>
  );
};

export default ProteomesCard;
