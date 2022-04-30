import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from 'franklin-sites';

import { ViewMode } from '../../hooks/useViewMode';

import { gtagFn } from '../../utils/logging';

import styles from './styles/first-time-selection.module.scss';

import CardsViewImg from '../../../images/cards-view.jpg';
import TableViewImg from '../../../images/table-view.jpg';

const FirstTimeSelection = ({
  setViewMode,
}: {
  setViewMode: (vm: ViewMode) => void;
}) => {
  const [previewViewMode, setPreviewViewMode] = useState<ViewMode>(null);

  return createPortal(
    <form className={styles['card-table-selector']}>
      <div>
        <p>Select how you would like to view your results</p>
        <span role="radiogroup">
          <label>
            <span>Cards</span>
            <input
              type="radio"
              name="tooltip-view"
              checked={previewViewMode === 'cards'}
              onChange={(e) => {
                if (e.target.checked) {
                  setPreviewViewMode('cards');
                }
              }}
            />
            <img
              draggable={false}
              src={CardsViewImg}
              alt=""
              width="300"
              height="243"
            />
          </label>
          <label>
            <span>Table</span>
            <input
              type="radio"
              name="tooltip-view"
              checked={previewViewMode === 'table'}
              onChange={(e) => {
                if (e.target.checked) {
                  setPreviewViewMode('table');
                }
              }}
            />
            <img
              draggable={false}
              src={TableViewImg}
              alt=""
              width="300"
              height="243"
            />
          </label>
        </span>
        <section className="button-group">
          <Button
            variant="primary"
            type="submit"
            disabled={!previewViewMode}
            onClick={(e: MouseEvent) => {
              e.preventDefault();
              gtagFn('event', 'result_view', {
                result_view: previewViewMode,
                result_view_set: 1,
              });
              setViewMode(previewViewMode);
            }}
          >
            View results
          </Button>
        </section>
      </div>
    </form>,
    document.body
  );
};

export default FirstTimeSelection;
