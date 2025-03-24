import { Card } from 'franklin-sites';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../../app/config/urls';
import CardCheckboxCell from '../../../../shared/components/CardCheckboxCell';
import { mapToLinks } from '../../../../shared/components/MapTo';
import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';
import renderColumnsInCardStyles from '../../../../shared/components/results/styles/render-columns-in-card.module.scss';
import { Namespace } from '../../../../shared/types/namespaces';
import { getIdKeyForNamespace } from '../../../../shared/utils/getIdKey';
import { DatabaseAPIModel } from '../../adapters/databaseConverter';
import DatabaseColumnConfiguration, {
  DatabaseColumn,
} from '../../config/DatabaseColumnConfiguration';

const category = DatabaseColumnConfiguration.get(DatabaseColumn.category);

const getIdKey = getIdKeyForNamespace(Namespace.database);

const DatabaseCard = ({ data }: { data: DatabaseAPIModel }) => {
  const id = getIdKey(data);

  const links = useMemo(
    () => mapToLinks(Namespace.database, data.abbrev, data.statistics),
    [data]
  );

  return (
    <Card
      header={
        <>
          <CardCheckboxCell id={id} />
          <h2 className="small">
            <Link to={getEntryPath(Namespace.database, id)}>{data.abbrev}</Link>
          </h2>
        </>
      }
      headerSeparator={false}
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
