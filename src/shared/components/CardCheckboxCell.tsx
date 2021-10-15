import { useRef } from 'react';
import { v1 } from 'uuid';

import './styles/card-checkbox-cell.scss';

const CardCheckboxCell = ({ id }: { id: string }) => {
  const idRef = useRef(v1());

  return (
    <span className="checkbox-cell">
      <input type="checkbox" data-id={id} id={idRef.current} />
      <label htmlFor={idRef.current} />
    </span>
  );
};

export default CardCheckboxCell;
