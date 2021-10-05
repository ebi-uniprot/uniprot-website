import { useMemo } from 'react';
import { Card } from 'franklin-sites';

import { getEntryPath } from '../../../../app/config/urls';
import { getIdKeyFor } from '../../../../shared/utils/getIdKeyForNamespace';
import { mapToLinks } from '../../../../shared/components/MapTo';

import { DiseasesAPIModel } from '../../adapters/diseasesConverter';
import { Namespace } from '../../../../shared/types/namespaces';

import renderColumnsInCardStyles from '../../../../shared/components/results/styles/render-columns-in-card.module.scss';

const getIdKey = getIdKeyFor(Namespace.diseases);

type Props = {
  data: DiseasesAPIModel;
  selected?: boolean;
  handleEntrySelection?: (rowId: string) => void;
};

const DiseasesCard = ({ data, selected, handleEntrySelection }: Props) => {
  const id = getIdKey(data);

  const links = useMemo(
    () => mapToLinks(Namespace.diseases, id, data.statistics),
    [data.statistics, id]
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
          <h2 className="tiny">{data.name}</h2>
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
