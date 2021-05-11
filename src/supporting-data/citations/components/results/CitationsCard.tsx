import { Card } from 'franklin-sites';

import LiteratureCitation from '../LiteratureCitation';

import { getEntryPath } from '../../../../app/config/urls';
import { getIdKeyFor } from '../../../../shared/utils/getIdKeyForNamespace';

import { Namespace } from '../../../../shared/types/namespaces';
import { CitationsAPIModel } from '../../adapters/citationsConverter';

import styles from './styles/citations-card.module.scss';

const getIdKey = getIdKeyFor(Namespace.citations);

type Props = {
  data: CitationsAPIModel;
  selected?: boolean;
  handleEntrySelection?: (rowId: string) => void;
  headingLevel?: `h${1 | 2 | 3 | 4 | 5 | 6}`;
};

const CitationsCard = ({
  data,
  selected,
  handleEntrySelection,
  headingLevel = 'h2',
}: Props) => {
  const id = getIdKey(data);

  return (
    <Card to={getEntryPath(Namespace.citations, id)}>
      <div className={styles['card-content']}>
        {handleEntrySelection && (
          <input
            type="checkbox"
            checked={selected}
            onChange={() => handleEntrySelection(id)}
            data-testid="up-card-checkbox"
          />
        )}
        <LiteratureCitation data={data} headingLevel={headingLevel} />
      </div>
    </Card>
  );
};

export default CitationsCard;
