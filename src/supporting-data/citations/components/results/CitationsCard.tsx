import { Card } from 'franklin-sites';

import CardCheckboxCell from '../../../../shared/components/CardCheckboxCell';
import { Namespace } from '../../../../shared/types/namespaces';
import { getIdKeyForNamespace } from '../../../../shared/utils/getIdKey';
import { CitationsAPIModel } from '../../adapters/citationsConverter';
import LiteratureCitation from '../LiteratureCitation';
import styles from './styles/citations-card.module.scss';

const getIdKey = getIdKeyForNamespace(Namespace.citations);

type Props = {
  data: CitationsAPIModel;
  headingLevel?: `h${1 | 2 | 3 | 4 | 5 | 6}`;
  notSelectable?: boolean;
};

const CitationsCard = ({ data, headingLevel = 'h2', notSelectable }: Props) => {
  const id = getIdKey(data);

  return (
    <Card>
      <div className={styles['card-content']}>
        {notSelectable ? null : <CardCheckboxCell id={id} />}
        <LiteratureCitation
          data={data}
          headingLevel={headingLevel}
          linkToEntry
        />
      </div>
    </Card>
  );
};

export default CitationsCard;
