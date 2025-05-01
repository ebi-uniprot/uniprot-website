import { Card } from 'franklin-sites';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../../app/config/urls';
import CardCheckboxCell from '../../../../shared/components/CardCheckboxCell';
import { mapToLinks } from '../../../../shared/components/MapTo';
import { Namespace } from '../../../../shared/types/namespaces';
import { getIdKeyForNamespace } from '../../../../shared/utils/getIdKey';
import { ARBAAPIModel } from '../../adapters/arbaConverter';

const getIdKey = getIdKeyForNamespace(Namespace.arba);

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
          <h2 className="small">
            <Link to={getEntryPath(Namespace.arba, id)}>{data.uniRuleId}</Link>
          </h2>
        </>
      }
      headerSeparator={false}
      links={links}
    />
  );
};

export default ARBACard;
