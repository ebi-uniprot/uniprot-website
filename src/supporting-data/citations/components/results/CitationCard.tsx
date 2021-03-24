import { Card } from 'franklin-sites';
import { FC, useCallback, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { SetOptional } from 'type-fest';

import { getEntryPath } from '../../../../app/config/urls';
import { getIdKeyFor } from '../../../../shared/components/results/ResultsView';
import { Namespace } from '../../../../shared/types/namespaces';
import { CitationsAPIModel } from '../../adapters/citationsConverter';
import LiteratureCitation from '../LiteratureCitation';

const BLOCK_CLICK_ON_CARD = new Set(['A', 'INPUT', 'BUTTON']);

const CitationCard: FC<{
  data: SetOptional<CitationsAPIModel, 'statistics'>;
  selected?: boolean;
  handleEntrySelection?: (rowId: string) => void;
}> = ({ data, selected, handleEntrySelection, children }) => {
  const history = useHistory();

  const key = getIdKeyFor(Namespace.citations)(data as CitationsAPIModel);

  const handleCardClick = useCallback(
    (event: MouseEvent) => {
      if (BLOCK_CLICK_ON_CARD.has((event.target as HTMLElement).tagName)) {
        return;
      }
      history.push(getEntryPath(Namespace.citations, key));
    },
    [history, key]
  );

  return (
    <Card onClick={handleCardClick}>
      <section className="result-card">
        {handleEntrySelection && (
          <div className="result-card__left">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => handleEntrySelection(key)}
              data-testid="up-card-checkbox"
            />
          </div>
        )}
        <div className="result-card__right">
          <LiteratureCitation data={data}>{children}</LiteratureCitation>
        </div>
      </section>
    </Card>
  );
};

export default CitationCard;
