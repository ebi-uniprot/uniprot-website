import { Card } from 'franklin-sites';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../../app/config/urls';
import CardCheckboxCell from '../../../../shared/components/CardCheckboxCell';
import { mapToLinks } from '../../../../shared/components/MapTo';
import renderColumnsInCardStyles from '../../../../shared/components/results/styles/render-columns-in-card.module.scss';
import { Namespace } from '../../../../shared/types/namespaces';
import { getIdKeyForNamespace } from '../../../../shared/utils/getIdKey';
import { DiseasesAPIModel } from '../../adapters/diseasesConverter';

const getIdKey = getIdKeyForNamespace(Namespace.diseases);

const DiseasesCard = ({ data }: { data: DiseasesAPIModel }) => {
  const id = getIdKey(data);

  const links = useMemo(
    () => mapToLinks(Namespace.diseases, id, data.statistics),
    [data.statistics, id]
  );

  return (
    <Card
      header={
        <>
          <CardCheckboxCell id={id} />
          <h2 className="small">
            <Link to={getEntryPath(Namespace.diseases, id)}>{data.name}</Link>
          </h2>
        </>
      }
      headerSeparator={false}
      links={links}
    >
      <div className={renderColumnsInCardStyles['result-card__info-container']}>
        {data.definition}
      </div>
    </Card>
  );
};

export default DiseasesCard;
