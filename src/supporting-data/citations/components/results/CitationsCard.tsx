import { Card } from 'franklin-sites';

import LiteratureCitation from '../LiteratureCitation';
import CardCheckboxCell from '../../../../shared/components/CardCheckboxCell';

import { getEntryPath } from '../../../../app/config/urls';
import { getIdKeyFor } from '../../../../shared/utils/getIdKeyForNamespace';

import { Namespace } from '../../../../shared/types/namespaces';
import { CitationsAPIModel } from '../../adapters/citationsConverter';

import styles from './styles/citations-card.module.scss';

const getIdKey = getIdKeyFor(Namespace.citations);

type Props = {
  data: CitationsAPIModel;
  headingLevel?: `h${1 | 2 | 3 | 4 | 5 | 6}`;
};

const CitationsCard = ({ data, headingLevel = 'h2' }: Props) => {
  const id = getIdKey(data);

  return (
    <Card to={getEntryPath(Namespace.citations, id)}>
      <div className={styles['card-content']}>
        <CardCheckboxCell id={id} />
        <LiteratureCitation data={data} headingLevel={headingLevel} />
      </div>
    </Card>
  );
};

export default CitationsCard;
