import { useMemo } from 'react';
import { Card } from 'franklin-sites';

import CardCheckboxCell from '../../../../shared/components/CardCheckboxCell';

import { getEntryPath } from '../../../../app/config/urls';
import { getIdKeyFor } from '../../../../shared/utils/getIdKeyForNamespace';
import { mapToLinks } from '../../../../shared/components/MapTo';

import { ARBAAPIModel } from '../../adapters/arbaConverter';
import { Namespace } from '../../../../shared/types/namespaces';

const getIdKey = getIdKeyFor(Namespace.arba);

const ARBACard = ({ data }: { data: ARBAAPIModel }) => {
  const id = getIdKey(data);

  const links = useMemo(
    () => mapToLinks(Namespace.arba, data.uniRuleId, data.statistics),
    [data]
  );

  return (
    <Card
      header={
        <>
          <CardCheckboxCell id={id} />
          <h2 className="small">{data.uniRuleId}</h2>
        </>
      }
      headerSeparator={false}
      to={getEntryPath(Namespace.arba, id)}
      links={links}
    />
  );
};

export default ARBACard;
