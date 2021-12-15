import { useMemo } from 'react';
import { Card } from 'franklin-sites';

import CardCheckboxCell from '../../../../shared/components/CardCheckboxCell';

import { getEntryPath } from '../../../../app/config/urls';
import { getIdKeyFor } from '../../../../shared/utils/getIdKeyForNamespace';
import { mapToLinks } from '../../../../shared/components/MapTo';

import { DiseasesAPIModel } from '../../adapters/diseasesConverter';
import { Namespace } from '../../../../shared/types/namespaces';

import renderColumnsInCardStyles from '../../../../shared/components/results/styles/render-columns-in-card.module.scss';

const getIdKey = getIdKeyFor(Namespace.diseases);

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
          <h2 className="small">{data.name}</h2>
        </>
      }
      headerSeparator={false}
      to={getEntryPath(Namespace.diseases, id)}
      links={links}
    >
      <div className={renderColumnsInCardStyles['result-card__info-container']}>
        {data.definition}
      </div>
    </Card>
  );
};

export default DiseasesCard;
