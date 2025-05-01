import './styles/card-checkbox-cell.scss';

import { useId } from 'react';

const CardCheckboxCell = ({ id }: { id: string }) => {
  const labelId = useId();

  return (
    <span className="checkbox-cell">
      <input type="checkbox" data-id={id} id={labelId} />
      <label
        htmlFor={labelId}
        aria-label={id}
        title="click to select, shift+click for multiple selection"
      />
    </span>
  );
};

export default CardCheckboxCell;
