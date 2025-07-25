import { Card } from 'franklin-sites';
import { useMemo } from 'react';
import { Link } from 'react-router';

import { getEntryPath } from '../../../../app/config/urls';
import CardCheckboxCell from '../../../../shared/components/CardCheckboxCell';
import { mapToLinks } from '../../../../shared/components/MapTo';
import { Namespace } from '../../../../shared/types/namespaces';
import { getIdKeyForNamespace } from '../../../../shared/utils/getIdKey';
import { UniRuleAPIModel } from '../../adapters/uniRuleConverter';

const getIdKey = getIdKeyForNamespace(Namespace.unirule);

const UniRuleCard = ({ data }: { data: UniRuleAPIModel }) => {
  const id = getIdKey(data);

  const links = useMemo(
    () =>
      mapToLinks(
        Namespace.unirule,
        data.information.oldRuleNum || data.uniRuleId,
        data.statistics
      ),
    [data]
  );

  return (
    <Card
      header={
        <>
          <CardCheckboxCell id={id} />
          <h2 className="small">
            <Link to={getEntryPath(Namespace.unirule, id)}>
              {data.uniRuleId}
            </Link>
          </h2>
        </>
      }
      headerSeparator={false}
      links={links}
    />
  );
};

export default UniRuleCard;
