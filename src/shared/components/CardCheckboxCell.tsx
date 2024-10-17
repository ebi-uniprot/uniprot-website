import { useId } from 'react';

import './styles/card-checkbox-cell.scss';

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
