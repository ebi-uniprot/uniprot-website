import { useMemo } from 'react';
import { Card } from 'franklin-sites';

import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';

import { getEntryPath } from '../../../../app/config/urls';
import { getIdKeyFor } from '../../../../shared/utils/getIdKeyForNamespace';
import { mapToLinks } from '../../../../shared/components/MapTo';

import { DatabaseAPIModel } from '../../adapters/databaseConverter';
import { Namespace } from '../../../../shared/types/namespaces';
import DatabaseColumnConfiguration, {
  DatabaseColumn,
} from '../../config/DatabaseColumnConfiguration';

import renderColumnsInCardStyles from '../../../../shared/components/results/styles/render-columns-in-card.module.scss';

const category = DatabaseColumnConfiguration.get(DatabaseColumn.category);

const getIdKey = getIdKeyFor(Namespace.database);

type Props = {
  data: DatabaseAPIModel;
  selected?: boolean;
  handleEntrySelection?: (rowId: string) => void;
};

const DatabaseCard = ({ data, selected, handleEntrySelection }: Props) => {
  const id = getIdKey(data);

  const links = useMemo(
    () => mapToLinks(Namespace.database, data.abbrev, data.statistics),
    [data]
  );

  return (
    <Card
      header={
        <>
          {handleEntrySelection && (
            <input
              type="checkbox"
              checked={selected}
              onChange={() => handleEntrySelection(id)}
              data-testid="up-card-checkbox"
            />
          )}
          <h2 className="tiny">{data.abbrev}</h2>
        </>
      }
      headerSeparator={false}
      to={getEntryPath(Namespace.database, id)}
      links={links}
    >
      <div className={renderColumnsInCardStyles['result-card__info-container']}>
        {data.name}
      </div>
      <RenderColumnsInCard renderers={category} data={data} />
    </Card>
  );
};

export default DatabaseCard;
