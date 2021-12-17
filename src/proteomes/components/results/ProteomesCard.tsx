import { Card } from 'franklin-sites';
import cn from 'classnames';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import RenderColumnsInCard from '../../../shared/components/results/RenderColumnsInCard';
import CardCheckboxCell from '../../../shared/components/CardCheckboxCell';

import { getEntryPath } from '../../../app/config/urls';
import { getIdKeyFor } from '../../../shared/utils/getIdKeyForNamespace';

import ProteomesColumnConfiguration, {
  ProteomesColumn,
} from '../../config/ProteomesColumnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';
import { ProteomesAPIModel } from '../../adapters/proteomesConverter';

import renderColumnsInCardStyles from '../../../shared/components/results/styles/render-columns-in-card.module.scss';
import styles from './styles/proteomes-card.module.scss';

const mainInfoColumns = [
  ProteomesColumn.organism,
  ProteomesColumn.proteinCount,
  ProteomesColumn.genomeRepresentation,
  ProteomesColumn.cpd,
].map((column) => ProteomesColumnConfiguration.get(column));
const buscoColumnRenderer = ProteomesColumnConfiguration.get(
  ProteomesColumn.busco
);

const getIdKey = getIdKeyFor(Namespace.proteomes);

const ProteomesCard = ({ data }: { data: ProteomesAPIModel }) => {
  const id = getIdKey(data);

  const buscoRendered = buscoColumnRenderer?.render(data);

  return (
    <Card
      header={
        <>
          <CardCheckboxCell id={id} />
          <h2 className="small">
            <EntryTitle mainTitle={id} entryType={data.proteomeType} />
          </h2>
        </>
      }
      headerSeparator={false}
      to={getEntryPath(Namespace.proteomes, id)}
    >
      <RenderColumnsInCard data={data} renderers={mainInfoColumns} />
      {buscoColumnRenderer && buscoRendered && (
        <div
          className={renderColumnsInCardStyles['result-card__info-container']}
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
    </Card>
  );
};

export default ProteomesCard;
