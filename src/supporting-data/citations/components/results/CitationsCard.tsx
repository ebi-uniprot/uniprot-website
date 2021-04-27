import { FC, useCallback, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'franklin-sites';
import { SetOptional } from 'type-fest';

import LiteratureCitation from '../LiteratureCitation';

import { getEntryPath } from '../../../../app/config/urls';
import { getIdKeyFor } from '../../../../shared/utils/getIdKeyForNamespace';

import { Namespace } from '../../../../shared/types/namespaces';
import { CitationsAPIModel } from '../../adapters/citationsConverter';

const getIdKey = getIdKeyFor(Namespace.citations);

const CitationCard: FC<{
  data: SetOptional<CitationsAPIModel, 'statistics'>;
  selected?: boolean;
  handleEntrySelection?: (rowId: string) => void;
}> = ({ data, selected, handleEntrySelection }) => {
  const history = useHistory();

  const id = getIdKey(data as CitationsAPIModel);

  const handleCardClick = useCallback(
    (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest(`a, input, button`)) {
        return;
      }
      history.push(getEntryPath(Namespace.citations, id));
    },
    [history, id]
  );

  return (
    <Card onClick={handleCardClick}>
      <div className="result-card">
        {handleEntrySelection && (
          <div className="result-card__left">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => handleEntrySelection(id)}
              data-testid="up-card-checkbox"
            />
          </div>
        )}
        <LiteratureCitation
          className="result-card__right"
          data={data}
          headingLevel="h2"
        />
      </div>
    </Card>
  );
};

export default CitationCard;
